import React from 'react'
import {Button,ImageBackground, Text, View,Dimensions} from 'react-native'

const { width, height } = Dimensions.get('window');

export default function Organizer({navigation}){
    return(
        <View style={{width,height}}>
             <ImageBackground style={{width:'100%',height:'100%',display:'flex',resizeMode: 'cover'}} source={require('../../../assets/images/OrganizerBg.jpg')}>
                <View style={{paddingTop:185}}>
                    <Text style={{color:'#000000',fontSize:48,fontWeight:"bold",paddingLeft:20}}>Organizer</Text>
                    <Text style={{paddingTop:30,color:'#000000',fontSize:24,paddingLeft:60}}>mr.abc</Text>
                    <Text style={{paddingTop:10,color:'#000000',fontSize:24,paddingLeft:60}}>mr.abc</Text>
                    <Text style={{paddingTop:10,color:'#000000',fontSize:24,paddingLeft:60}}>mr.abc</Text>
                </View>
             </ImageBackground>
        </View>
    )
}