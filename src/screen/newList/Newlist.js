import React, { useState, useEffectม, useRef } from 'react';
import { KeyboardAvoidingView, TextInput, StyleSheet, View, Text, Button ,TouchableOpacity, ScrollView} from 'react-native';
import { useRoute, useNavigation,useIsFocused ,useNavigationState } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Alert } from 'react-native';

export default function NewList({navigation}) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [section, setSection] = useState('');
    const [detail, setDetail] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const inputRefDate = useRef(null);
    const inputRefTime = useRef(null);
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
        await FileSystem.writeAsStringAsync(fileUri,JSON.stringify(content));
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
      deleteFile('data')
      const fileUri = `${FileSystem.documentDirectory}${fileName}.json`;
      FileSystem.getInfoAsync(fileUri).then(info => {
        if (info.exists) {
          const readData = readJsonFile(fileName)
          readData.then((data)=>{
            // console.log(data);
            if(String(data).split("|").length == 1){
              const newDataList = JSON.stringify(data)+ "|" +JSON.stringify(newData)
              const stringData = String(newDataList)
              writeToFile(fileName,stringData)
            }else{
              const newDataJson = JSON.parse(JSON.stringify(data).replace('\\"', ''))+"|"+ JSON.stringify(newData)
              const stringData = String(newDataJson)
              // console.log(stringData);
              writeToFile(fileName,stringData)
            }
          })
          console.log('File exists');
        } else {
          // writeToFile(fileName,newData)
          console.log('File does not exist');
        }
      }).catch(error => {
        console.error(error);
      });
    }
    const handleSubmit = () => {
      // deleteFile('data')
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
      setSection("")
      setDetail("")
      setLocation("")
      setStatus("")
    }
    const cancel = ()=>{
      setSection("")
      setDetail("")
      setLocation("")
      setStatus("")
      navigation.navigate('home')
    }
    return(
      <View style={{paddingTop:45,marginBottom:60, width:'100%',maxWidth: '87.5%',alignSelf:'center'}}>
        <ScrollView 
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View>
              <Text style={{fontSize:24,lineHeight:22,color:'#000000',fontWeight:'bold'}}>New List</Text>
            </View>
            <View style={styles.continer}>
              <View>
                <Text style={styles.text}>Section</Text>
                <TextInput style={styles.input} value={section} onChangeText={(value)=>{handleChange(value,setSection)}} placeholder='section'/>
              </View>
              <View>
                <Text style={styles.text}>Detail</Text>
                <TextInput style={styles.input2} value={detail} onChangeText={(value)=>{handleChange(value,setDetail)}} placeholder='detail'/>
              </View>
              <TouchableOpacity activeOpacity = {1} onPress={showDatepicker} >
                <View>
                  <Text style={styles.text}>Date</Text>
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
                  <Text style={styles.text}>Time</Text>
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
                <Text style={styles.text}>Location</Text>
                <TextInput style={styles.input} value={location} onChangeText={(value)=>{handleChange(value,setLocation)}} placeholder='location'/>
              </View>
              <View>
                <Text style={styles.text}>Status</Text>
                <TextInput style={styles.input} value={status} onChangeText={(value)=>{handleChange(value,setStatus)}} placeholder='status'/>
              </View>
              <View style={styles.BoxButton}>
                <TouchableOpacity style={styles.button} activeOpacity={1} onPress={handleSubmit}>
                  <Text style={{fontSize:16,color:"#010101",fontWeight:'bold'}}>confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} activeOpacity={1} onPress={cancel}>
                  <Text style={{fontSize:16,color:"#010101",fontWeight:'bold'}}>cancel</Text>
                </TouchableOpacity>
              </View>
              {/* <Button title='Click Me !!' onPress={()=>{console.log(myValue);}}></Button> */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  continer:{
    paddingTop: 25
  },
  input:{
    width:300,
    alignSelf:'center',
    height:54,
    paddingLeft:24,
    paddingRight:24,
    borderWidth:1,
    borderColor:'#C2C2C2',
    borderRadius: 10,
    color:'#000000',
    marginTop:5

  },
  input2:{
    width:300,
    alignSelf:'center',
    height: 120,
    paddingLeft:24,
    paddingRight:24,
    borderWidth:1,
    borderColor:'#C2C2C2',
    borderRadius: 10,
    marginTop:5
  },
  text:{
    fontSize:16,
    fontWeight:'bold',
    lineHeight:24,
    color:'#000000',
    marginTop:10
  },
  button:{
    backgroundColor: '#BCD7E6',
    padding:10,
    borderRadius: 5,
    fontSize:20,
    color:'#010101',
    marginRight:10
  },
  BoxButton:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:20,
  },
});
