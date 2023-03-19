import React from 'react'
import {Button, Text, View,ImageBackground,style,Dimensions,StyleSheet, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window');
export default function Loading({navigation}){
    return(
        <View style={{flex:1,width,height}}>
            <ImageBackground style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}} source={require('../../../assets/images/LoaddingBg.jpg')}>
                <View style={{alignSelf:'center'}}>
                    <Text style={{color:'#FFFFFF',fontSize:36,fontWeight:"bold",alignSelf:"center"}}>Let's go!</Text>
                    <Text style={{color:'#E8E7E7',fontSize:20,paddingTop:16,alignSelf:'center'}}>Let's plan your life schedule.</Text>
                    <TouchableOpacity style={styles.startButton} onPress={()=>{navigation.navigate('home')}}>
                        <Text style={{fontSize:20,color:'#FFFFFF',alignSelf:'center'}}>Start</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    font:{
        fontSize:20,
        color:"red"
    },
    startButton:{
        marginBottom:50,
        marginTop:30,
        width:350,
        height:48,
        backgroundColor:'#71C6F4',
        borderRadius: 10,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    }
})