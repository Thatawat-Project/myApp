import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'


export default function Login() {
    return(
    <TouchableOpacity onPress={(event) => {
        navigation.navigate('Login')
        console.log(event);
    }}>
        <View>
            <Text>Hello World</Text>
        </View>
    </TouchableOpacity>
    )
}