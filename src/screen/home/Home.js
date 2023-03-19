import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Image,StyleSheet,Dimensions,ImageBackground, Button, ScrollView} from 'react-native'
import moment from 'moment-timezone';
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native';

const win = Dimensions.get('window');
export default function Home({navigation}) {
    const isFocused = useIsFocused();
    const [checkDate, setCheckDate] = useState('')
    const [dateDay, setDateDay] = useState('');
    const [dateMonth, setDateMonth] = useState('');
    const [listArray, setListArray] = useState([])
    const [showCheck, setShowCheck] = useState(false)
    const [disPlayCheck, setDisPlayCheck] = useState(false)
    let dataArrays = []
    const options = { timeZone: 'Asia/Bangkok', month: 'short', day: 'numeric', year: 'numeric'};
    const readJsonFile = async (fileName) => {
      try {
        const fileUri = `${FileSystem.documentDirectory}${fileName}.json`;
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(fileContents);
        return data;
      } catch (error) {
        console.log('Error reading file:', error);
        return null;
      }
    };
    useEffect(() => {
      if (isFocused) {
        startDisplay()
      }
    }, [isFocused]);
    useEffect(() => {
        const interval = setInterval(() => {
          const date = moment().tz('Asia/Bangkok');
          const shortMonth = date.format('MMM');
          const monthNumber = date.format('M');
          const fullYear = date.format('YYYY');
          setDateDay(date.toString().split(' ')[2]);
          setDateMonth(shortMonth)
          setCheckDate(date.toString().split(' ')[2]+'/'+monthNumber+'/'+fullYear)
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

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
            }else if(check.length == 1 && check[0] != 'null'){
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
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollViewContent} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
          <ImageBackground source={require('../../../assets/images/homeBackground.jpg')} style={styles.backgroundImage}>
            <View style={{paddingTop:60}}>
              <Text style={styles.textDay}>{dateDay}</Text>
              <Text style={styles.textMonth}>{dateMonth}</Text>
            </View>
          </ImageBackground>
          <View style={styles.box}>
            <Text style={styles.textPlan}>What is your plan</Text>
            <View>
              <View style={{paddingTop:15}}>
                {showCheck && (
                    <View style={{display:'flex',flexDirection:'column'}}>
                    <TouchableOpacity activeOpacity={1} style={{marginTop:10,display:'flex',flexDirection:'row',height:125,backgroundColor:'#FEEA7E',borderRadius: 20}}>
                      <View style={styles.boxShowDetail}>
                          <View>
                            <Text style={{fontSize:20}}>{listArray[0].todoList.time.split(' ')[0]}</Text>
                            <Text style={{fontSize:20}} >{listArray[0].todoList.time.split(' ')[1]}</Text>
                          </View>
                      </View>
                      <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:254,justifyContent:'space-between',height:90,alignSelf:'center'}}>
                        <View style={{display:'flex',width:245,alignSelf:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                          <Text style={{fontSize:20, fontWeight:'bold'}}>{listArray[0].todoList.section}</Text>
                        </View>
                        <Text style={{fontSize:13, fontWeight: 'bold',}}>{listArray[0].todoList.location}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <>
                {disPlayCheck ? (
                     listArray.map((item,index) => {
                      try {
                        const data = JSON.parse(item.replace(/\\"/g, '"'));
                        if (data.date === checkDate) {
                          const dataDate = []
                          dataDate.push(data.todoList.time)
                          const sortedData = dataDate.sort((a, b) => {
                            const aTime = new Date(`1970-01-01T${a.time}`);
                            const bTime = new Date(`1970-01-01T${b.time}`);
                            return aTime - bTime;
                          });
                          if(data.date === checkDate){
                            if(sortedData[0] === data.todoList.time){
                              return (
                                  <View style={{display:'flex',flexDirection:'column'}}>
                                    <TouchableOpacity key={index} activeOpacity={1} style={{marginTop:10,display:'flex',flexDirection:'row',height:125,backgroundColor:'#FEEA7E',borderRadius: 20}}>
                                      <View style={styles.boxShowDetail}>
                                          <View>
                                            <Text style={{fontSize:20}} >{data.todoList.time.split(' ')[0]}</Text>
                                            <Text style={{fontSize:20}} >{data.todoList.time.split(' ')[1]}</Text>
                                          </View>
                                      </View>
                                      <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:254,justifyContent:'space-between',height:90,alignSelf:'center'}}>
                                        <View style={{display:'flex',width:245,alignSelf:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                                          <Text style={{fontSize:20, fontWeight:'bold'}} >{data.todoList.section}</Text>
                                        </View>
                                        <Text style={{fontSize:13, fontWeight: 'bold',}} >{data.todoList.location}</Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                );
                            } 
                            }
                          }
                      } catch (error) {
                        console.log("Invalid JSON string: ", item, error);
                      }
                    })
                ):null}
                </>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 15,
    },
    backgroundImage: {
        height:'100%',
        flex: 1,
        resizeMode: 'cover',
        minHeight:300
      },
    textDay:{
        fontSize:128,
        color:'#F2CC00',
        fontWeight: 'bold',
        alignSelf:'center',
    },
    textMonth:{
      fontSize:32,
      alignSelf:'center',
      color:'#000000',
      fontWeight: 'bold',
      transform:[{translateY: -35}]

    },
    textPlan:{
      fontSize:20,
      color:'#000000',
      fontWeight: 'bold',
    },
    box:{
      paddingTop:25,
      paddingBottom:60,
      width:'100%',
      maxWidth: '87.5%',
      alignSelf:'center'
    },
    boxShowDetail:{
      marginTop:5,
      marginLeft:5,
      width:100,
      backgroundColor:'#FFFFFF',
      height:115,
      display:'flex',
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center',
      borderRadius: 20,
    },
    scrollViewContent: {
      flexGrow: 1,
    }
  })