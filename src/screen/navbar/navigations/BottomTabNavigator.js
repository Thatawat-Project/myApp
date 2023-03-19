import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewList from '../../newList/Newlist';
import { View,Text ,Dimensions,StyleSheet} from 'react-native';
import Home from '../../home/Home';
import IoniconsAdd from 'react-native-vector-icons/Ionicons';
import IoniconsHome from 'react-native-vector-icons/Ionicons';
import IoniconsPerson from 'react-native-vector-icons/Fontisto';
import Organizer from '../../organizer/Organizer';

const { width, height } = Dimensions.get('window');

export default function BottomTabNavigator() {

    const Tab = createBottomTabNavigator();
    return(
        <View style={styles.container}>
            <Tab.Navigator screenOptions={{tabBarStyle:{position:'absolute',bottom:0},headerShown: false }}>
                <Tab.Screen name="home" component={Home} options={{tabBarIcon:({color,size})=>(
                    <IoniconsHome name="home-outline" size={size} color={color}/>
                )}}/>
                <Tab.Screen name="newlist" component={NewList} options={{tabBarIcon:({color,size})=>(
                    <IoniconsAdd name="add-circle-outline" size={size} color={color}/>
                )}}/>
                <Tab.Screen name="organizer" component={Organizer} options={{tabBarIcon:({color,size})=>(
                    <IoniconsPerson name="persons" size={size} color={color}/>
                )}}/>
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
