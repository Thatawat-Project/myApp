import React, { useState, useEffectม, useRef } from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet, View, Text, Button } from 'react-native';
import { useRoute, useNavigation,useIsFocused ,useNavigationState } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

export default function NewList(props) {
    const [section, setSection] = useState('');
    const [detail, setDetail] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [dataArray, setDataArray] = useState([])
    const [dataList, setDataList] = useState({})
    const [d, setd] = useState('')
    let arrayDataList = []
    let jsonData = {}
    const listData = {
      user:'',
      date:'',
      todoList:{
        section:''
      }
    };
    const filenameText = 'data'
    const writeToFile = async (fileName, content) => {
      const fileUri = `${FileSystem.documentDirectory}${fileName}.json`;
      try {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(content));
        console.log(`File ${fileName}.json saved to ${FileSystem.documentDirectory}`);
      } catch (error) {
        console.log('Error writing file:', error);
      }
    };

    const deleteFile = async (fileName) => {
      const uri = `${FileSystem.documentDirectory}${fileName}.json`;
      await FileSystem.deleteAsync(uri);
      console.log('File deleted successfully.');
    }

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
    
    const handleChange = (value,setValue) =>{
      setValue(value);
    }
    const checkExistsFile = (fileName,newData)=>{
      const fileUri = `${FileSystem.documentDirectory}${fileName}.json`;
      FileSystem.getInfoAsync(fileUri).then(info => {
        if (info.exists) {
          const readData = readJsonFile(fileName)
          readData.then((data)=>{
            const newDataList = JSON.stringify(data)+"|"+ JSON.stringify(newData)
            const stringData = String(newDataList)
            //console.log(newDataList);
            writeToFile(fileName,stringData)
          })
          console.log('File exists');
        } else {
          writeToFile(fileName,newData)
          console.log('File does not exist');
        }
      }).catch(error => {
        console.error(error);
      });
    }
    const handleSubmit = () => {
      console.log(dataList[0].todoList);
      // const dataList = { ...listData, user:'',todoList:{section:section} };
      // checkExistsFile(filenameText,dataList)
      // add new data to object
      // //writeToFile(filename,List)
      // //console.log(newList);
      // const readData = readJsonFile(filename,dataList)
      // readData.then((data)=>{
      //   if(data.data != ''){
      //     const newList = JSON.stringify(data)+"\n"+JSON.stringify(List)
      //     writeToFile(filename,newList)
      //   }
      // })
    }
    const doeee = ()=>{
      arrayDataList = []
      const readData = readJsonFile(filenameText)
          readData.then((data)=>{
            const jsonData = JSON.stringify(data)
            const NewJsonData = JSON.parse(jsonData)
            const newData = String(NewJsonData).split('|')
            newData.forEach(value => {
              arrayDataList.push(JSON.parse(value))
            });
            const dataJsonArray = JSON.parse(JSON.stringify(arrayDataList))
            setDataList(dataJsonArray)
          })
      //checkExistsFile(filename)
      //writeToFile(filename)
      //const dd = readJsonFile(filename)
      // dd.then((data)=>{
      //   const newData = data
      //   console.log(data);
      //   // const d = String(newData).split("\n")
      //   // console.log(d);
      // })
      //deleteFile(filenameText)
    }
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.continer}>
          <View>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setSection)}} placeholder='section'/>
          </View>
          <View>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setDetail)}} placeholder='detail'/>
          </View>
          <View>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setTime)}} placeholder='time'/>
          </View>
          <View>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setLocation)}} placeholder='location'/>
          </View>
          <View>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setStatus)}} placeholder='status'/>
          </View>
          <Button title='Submit' onPress={handleSubmit}/>
          <Button title='do' onPress={doeee}/>
        </View>
        
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  continer:{
    paddingTop: 100
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
