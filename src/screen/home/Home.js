import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Image,StyleSheet,Dimensions,ImageBackground, Button} from 'react-native'
import moment from 'moment';
import * as FileSystem from 'expo-file-system';

const win = Dimensions.get('window');
export default function Home() {
    const [dateDay, setDateDay] = useState('');
    const [dateMonth, setDateMonth] = useState('');
    const [listArray, setListArray] = useState([])
    const [showCheck, setShowCheck] = useState(false)
    let dataArrays = []

    const readJsonFile = async (fileName) => {
      try {
        const fileUri = `${FileSystem.documentDirectory}${fileName}.json`;
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(fileContents);
        //console.log('Data from file:', data);
        return data;
      } catch (error) {
        console.log('Error reading file:', error);
        return null;
      }
    };
    useEffect(() => {
        const interval = setInterval(() => {
          const date = new Date();
          setDateDay(date.getDate().toString());

          setDateMonth(String(date).split(' ')[1])
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    const handleSubmit = ()=>{
      readJsonFile('data').then((data)=>{
        const jsonStringData = JSON.stringify(data)
        try
          {
            const listData = JSON.parse(jsonStringData)
            const newData = String(listData).split('|')
            newData.forEach(val => {
              console.log(JSON.parse(JSON.stringify(val)));
            });
            // console.log(String(JSON.parse(listData)));
            
            // listData.forEach(value => {
            //   console.log(JSON.parse(value));
            // });
            //setShowCheck(true)
          }
        catch (error){
          console.log(error);
        }
      })
      setListArray(dataArrays)
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/homeBackground.jpg')} style={styles.backgroundImage}>
        <Text style={styles.textDay}>{dateDay}</Text>
        <Text>{dateMonth}</Text>
        {showCheck && (
          <View>
            <Text></Text>
          </View>
        )}
        <Button title='Click Me' onPress={handleSubmit}/>
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
        alignSelf:'center'
    }
  })