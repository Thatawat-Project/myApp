import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Image,StyleSheet,Dimensions,ImageBackground, Button} from 'react-native'
import moment from 'moment';
import * as FileSystem from 'expo-file-system';

const win = Dimensions.get('window');
export default function Home() {
    const [checkDate, setCheckDate] = useState('')
    const [dateDay, setDateDay] = useState('');
    const [dateMonth, setDateMonth] = useState('');
    const [listArray, setListArray] = useState([])
    const [dateNow, setDateNow] = useState([])
    const [showCheck, setShowCheck] = useState(false)
    const [disPlayCheck, setDisPlayCheck] = useState(false)
    let newDataArrays = []
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
      startDisplay()
        const interval = setInterval(() => {
          const date = new Date();
          setDateDay(date.getDate().toString());
          setDateMonth(String(date).split(' ')[1])
          setCheckDate(String(date).split(' ')[2]+"/"+String(date.getMonth()+1)+"/"+String(date).split(' ')[3])
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    const aa = () =>{
      console.log(22);
    }
    const startDisplay = ()=>{
      dataArrays = []
      readJsonFile('data').then((data)=>{
        const jsonStringData = JSON.stringify(data)
        const check = jsonStringData.split('|')
        try
          {
            if(check.length != 1){
              const listData = JSON.parse(jsonStringData)
              const newData = String(listData).split('|')
              newData.forEach(val => {
                dataArrays.push(val)
              });
       
              setListArray(dataArrays)
              setShowCheck(false)
              setDisPlayCheck(true)
            }else{
              const arrayData = JSON.parse(jsonStringData)
              dataArrays.push(arrayData)
              setListArray(dataArrays)
              setDisPlayCheck(false)
              setShowCheck(true)
            }
          }
        catch (error){
          console.log(error);
        }
      })
    }
    const sortData = ()=>{
      console.log(checkDate);
      listArray.forEach(val => {
        if(JSON.parse(val).date == checkDate){
          // console.log(JSON.parse(val));
          newDataArrays.push(JSON.parse(val))
        }
      });
      setDateNow(newDataArrays)
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/homeBackground.jpg')} style={styles.backgroundImage}>
        <Text style={styles.textDay}>{dateDay}</Text>
        <Text style={styles.textTime}>{dateMonth}</Text>
        {showCheck && (
          <View>
            <Text>{listArray[0].date}</Text>
          </View>
        )}
        {disPlayCheck && (
          <View>
            <Text>{JSON.parse(listArray[1]).date}</Text>
          </View>
        )
        }
        <Button title='click Me Me mE' onPress={sortData}></Button>
        <Button title='Click Me'/>
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
    },
    textTime:{
      fontSize:24,
      alignSelf:'center'
    }
  })