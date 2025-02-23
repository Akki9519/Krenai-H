import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screen/DashboardScreen';
import EmployListScreen from '../screen/EmployListScreen'; 
import LeaveRequestScreen from '../screen/LeaveRequestScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={30}
              color="black"
            />
          ),
        }}
        component={DashboardScreen}
      />
      <Tab.Screen
        name="EmployList"
        component={EmployListScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="list-sharp"
              size={30}
              color="black"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Leave Request"
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="dingding" size={30} color="black" />
          ),
        }}
        component={LeaveRequestScreen}
      />
    </Tab.Navigator>
  );
}
