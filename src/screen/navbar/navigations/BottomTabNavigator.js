import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../../login/Login';
import NewList from '../../newList/Newlist';
import { View,Text ,Dimensions,StyleSheet} from 'react-native';
import HeaderProfile from '../header/HeaderProfile';
import Home from '../../home/Home';

const { width, height } = Dimensions.get('window');

export default function BottomTabNavigator() {

    const Tab = createBottomTabNavigator();
    return(
        <View style={styles.container}>
            <HeaderProfile/>
            <Tab.Navigator screenOptions={{ tabBarStyle:{position:'absolute',bottom:0},headerShown: false }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="NewList" component={NewList} />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: 'white',
    },
  });
