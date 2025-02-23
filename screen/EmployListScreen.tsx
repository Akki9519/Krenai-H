import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Employee {
  id: number;
  name: string;
  department: string;
  status: 'Present' | 'Absent' | 'Late';
}

const employeesData: Employee[] = [
  {id: 1, name: 'Akash', department: 'HR', status: 'Present'},
  {id: 2, name: 'Atul', department: 'IT', status: 'Absent'},
  {id: 3, name: 'Prashnat', department: 'Finance', status: 'Late'},
  {id: 4, name: 'Krishna', department: 'Sales', status: 'Present'},
];

const profileImages = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
];

const EmployeeListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employeesData);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredData = employeesData.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredEmployees(filteredData);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filterByStatus = (status: 'Present' | 'Absent' | 'Late') => {
    setFilteredEmployees(employeesData.filter(emp => emp.status === status));
  };

  const viewProfile = () => {
    const randomImage =
      profileImages[Math.floor(Math.random() * profileImages.length)];
    setSelectedImage(randomImage);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#1D56A5']} style={styles.header}>
        <Text style={styles.tagline}>
          Smart Attendance for Smarter Workplaces
        </Text>
      </LinearGradient>

      <TextInput
        style={styles.searchBar}
        placeholder="Search Employees..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        {['Present', 'Absent', 'Late'].map(status => (
          <TouchableOpacity
            key={status}
            style={styles.filterChip}
            onPress={() =>
              filterByStatus(status as 'Present' | 'Absent' | 'Late')
            }>
            <Text style={styles.filterText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}: any) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.department}>{item.department}</Text>
              <Text style={[styles.status]}>{item.status}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={viewProfile}>
                <Text style={styles.viewProfile}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.approveShift}>Approve Shift</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal for profile image */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{uri: selectedImage || ''}}
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4ff',
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#1D56A5',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  searchBar: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: '#1D56A5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 6,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  department: {
    fontSize: 14,
    color: 'gray',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewProfile: {
    color: '#1D56A5',
    fontWeight: 'bold',
  },
  approveShift: {
    color: 'green',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  closeModal: {
    color: '#1D56A5',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default EmployeeListScreen;
