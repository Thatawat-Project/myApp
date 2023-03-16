import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screen/login/Login';
import NewList from './src/screen/newList/Newlist';
import BottomTabNavigator from './src/screen/navbar/navigations/BottomTabNavigator';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={BottomTabNavigator}/>
      <Stack.Screen name="NewList" component={BottomTabNavigator}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}