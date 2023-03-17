import React, { useState, useEffectม, useRef } from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet, View, Text, Button ,TouchableOpacity} from 'react-native';
import { useRoute, useNavigation,useIsFocused ,useNavigationState } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Alert } from 'react-native';

export default function NewList(props) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [section, setSection] = useState('');
    const [detail, setDetail] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [dataArray, setDataArray] = useState([])
    const [dataList, setDataList] = useState({})
    const inputRefDate = useRef(null);
    const inputRefTime = useRef(null);
    let arrayDataList = []
    let jsonData = {}
    const listData = {
      user:'',
      date:'',
      todoList:{
        section:'',
        detail:'',
        time:'',
        location:'',
        status:''
      }
    };
    const filenameText = 'data'

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

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
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };  

    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
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
      //deleteFile('data')
      const dateValue = inputRefDate.current._internalFiberInstanceHandleDEV.memoizedProps.value
      const timeValue = inputRefTime.current._internalFiberInstanceHandleDEV.memoizedProps.value
      if(section != "" && detail != "" && location != "" && status != ""){
        const dataList = { ...listData, date:dateValue, user:'',todoList:{section:section,detail:detail,time:timeValue,location:location,status:status} };
        // readJsonFile(filenameText)
        checkExistsFile(filenameText,dataList)
      }else{
        Alert.alert(
          'Message',
          'Please enter all information.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
        );
      }
    }
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.continer}>
          <View>
            <Text>Section</Text>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setSection)}} placeholder='section'/>
          </View>
          <View>
            <Text>Detail</Text>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setDetail)}} placeholder='detail'/>
          </View>
          <TouchableOpacity activeOpacity = {1} onPress={showDatepicker} >
            <View>
              <Text >Date</Text>
              <TextInput
                style={styles.input}
                placeholder='Date'
                multiline={true}
                value={`${date.getDate().toLocaleString()}/${date.getMonth().toLocaleString()}/${date.getFullYear().toLocaleString().replace(/,/g, '')}`}
                editable={false}
                //onChangeText={(text)=>handleInputChange('date',text)}
                ref={inputRefDate}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity = {1} onPress={showTimepicker} >
            <View>
              <Text>Time</Text>
              <TextInput
                style={styles.input}
                placeholder='Time'
                multiline={true}
                value={`${date.getHours()}.${date.getMinutes()} ${moment(date).format('a')}`.toUpperCase()}
                editable={false}
                //onChangeText={(text)=>handleInputChange('time',text)}
                ref={inputRefTime}
              />
            </View>
          </TouchableOpacity>
          {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
          <View>
            <Text>Location</Text>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setLocation)}} placeholder='location'/>
          </View>
          <View>
            <Text>Status</Text>
            <TextInput style={styles.input} onChangeText={(value)=>{handleChange(value,setStatus)}} placeholder='status'/>
          </View>
          <Button title='Submit' onPress={handleSubmit}/>
        </View>
        
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  continer:{
    paddingTop: 25
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
