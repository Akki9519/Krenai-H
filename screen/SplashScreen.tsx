import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const SplashHomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    const initializeApp = async () => {
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 2000); 
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/krenai_logo.jpg')} 
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome to Krenai</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop:40
  },
  text: {
    fontSize: 24,
    color: 'black', 
    fontWeight: 'bold',
  },
});

export default SplashHomeScreen;