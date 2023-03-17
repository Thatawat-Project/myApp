import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Image,StyleSheet,Dimensions,ImageBackground} from 'react-native'
import moment from 'moment';

const win = Dimensions.get('window');
export default function Home() {
    const [dateDay, setDateDay] = useState('');
    const [dateMonth, setDateMonth] = useState('');
    //const thaiTime = moment().tz('Asia/Bangkok').format('DD MMM YYYY, hh:mm A');
    useEffect(() => {
        const interval = setInterval(() => {
          const date = new Date();
          setDateDay(date.getDate().toString());
          setDateMonth(String(date).split(' ')[1])
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/homeBackground.jpg')} style={styles.backgroundImage}>
        <Text style={styles.textDay}>{dateDay}</Text>
        <Text>{dateMonth}</Text>
        </ImageBackground>
      </View>
    )
  }
const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 50,
    },
    backgroundImage: {
        height:300,
        flex: 1,
        resizeMode: 'cover', // or 'stretch' to stretch the image to fill the container
      },
    imageBG: {
      position: 'relative',
      resizeMode: 'cover',
      width: win.width,
      height: 355,
    },
    textDay:{
        fontSize:128,
        color:'#F2CC00',
        fontWeight: 'bold',
        paddingTop:50,
    }
  })