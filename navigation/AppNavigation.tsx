import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import SplashHomeScreen from '../screen/SplashScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Dashboard" component={BottomTabNavigation} />
        <Stack.Screen name="Splash" component={SplashHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
