import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './src/screen/navbar/navigations/BottomTabNavigator';
import Loading from './src/screen/loading/Loading';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="landing" component={Loading}/>
      <Stack.Screen name="home" component={BottomTabNavigator}/>
      <Stack.Screen name="newlist" component={BottomTabNavigator}/>
      <Stack.Screen name="organizer" component={BottomTabNavigator}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}