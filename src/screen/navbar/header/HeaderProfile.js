import React, { useEffect, useState } from 'react'
import { View,Text } from 'react-native'
import { useRoute, useNavigation,useIsFocused ,useNavigationState } from '@react-navigation/native';

const HeaderProfile = ()=>{
    // const rout = useRoute()
    // const [currentRouteName, setCurrentRouteName] = useState('');

    useEffect(() => {
        // setCurrentRouteName(rout.name)
        // global.name.currentRouteName = currentRouteName
    });

    return(
        <View>
            <Text></Text>
        </View>
    )
}

export default HeaderProfile;