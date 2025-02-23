import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image,StyleSheet, ScrollView, Switch, ActivityIndicator, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [attendanceData, setAttendanceData] = useState({ present: 0, absent: 0, late: 0 });

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setDarkMode(JSON.parse(savedTheme));
      }
    };

    loadTheme();

    setTimeout(() => {
      setAttendanceData({ present: 20, absent: 5, late: 3 });
      setLoading(false);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 2000);
  }, []);

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const renderProgressBar = (value:any, total:any) => {
    const width = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${(value / total) * 100}%`],
    });

    return (
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width }]} />
      </View>
    );
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.header}>
        <Image source={require('../img/krenai_logo.jpg')} style={styles.logo} />  
        <Text style={[styles.title, darkMode && styles.darkText]}>Dashboard</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#1D56A5" />
      ) : (
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          <ScrollView>
          
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTitle}>Employee Attendance Summary</Text>
                <Text>Present: {attendanceData.present}</Text>
                {renderProgressBar(attendanceData.present, 30)}
                <Text>Absent: {attendanceData.absent}</Text>
                {renderProgressBar(attendanceData.absent, 30)}
                <Text>Late: {attendanceData.late}</Text>
                {renderProgressBar(attendanceData.late, 30)}
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTitle}>Upcoming Shift Details</Text>
                <Text>Morning: 5 Employees</Text>
                <Text>Evening: 3 Employees</Text>
                <Text>Night: 2 Employees</Text>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTitle}>Pending Requests</Text>
                <Text>Leave: 2 Requests</Text>
                <Text>Shift Change: 1 Request</Text>
              </Card.Content>
            </Card>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16,  paddingTop:30 },
  darkContainer: { backgroundColor: '#121212' },
  lightContainer: { backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1D56A5' },
  darkText: { color: '#ffffff' },
  
  card: {
    marginBottom: 16,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#1D56A5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1D56A5', marginBottom: 8 },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1D56A5',
    borderRadius: 5,
  },
  logo: {
    width: 40,  
    height: 40, 
    resizeMode: 'contain',
  },
  lottie: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default DashboardScreen;