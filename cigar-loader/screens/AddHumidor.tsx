import { View, Text, TouchableOpacity, Image, Dimensions, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from 'react-native-paper';
import Autocomplete from '../components/AutoComplete';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import DetailsComponent from '../components/DetailsComponent';
import { UseDatabase } from '../hooks/UseDatabase';
const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function AddHumidor(props: any) {
  const [totalNumber, setTotalNumber] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const database=UseDatabase()
  const navigation = useNavigation();

  const handle_add=()=>{
    console.log("dsadsadsadsasad")
    database.add_to_humidor({"name":name,total_capacity:String(totalNumber)})
    console.log("dsadsadsadsasad2")
    setTimeout(() => {
      database.select_from_table("Humidor", database.handleHumidorList)
      database.select_from_table("Library", database.handleLibraryList)

      navigation.goBack()
    }, 500);

  }
  return (

      <DetailsComponent
        backgroundImage={require('../assets/images/Background.png')}
        foregroundImage={require('../assets/images/Cigar_Humidor3.png')}
        buttonText='Add Humidor'
        onPress={() => {handle_add() }}
        short='new'
        topText={name == "" ? "Adding A Humidor" : name}
        increase={() => {setTotalNumber(totalNumber + 1)}}
        decrease={() => {setTotalNumber(totalNumber - 1)}}
        left='Total Number:'
        number={totalNumber}

      >
        <TextInput inputMode='numeric' value={totalNumber != 0 ? String(totalNumber) : ""} label='Select Total Cigar Capacity ' onChangeText={(e) => { setTotalNumber(e != "" ? parseInt(e) : 0) }} mode="outlined"
          theme={{
            roundness: 25,
          }} />
        <TextInput value={name} label='Select Humidors Name ' onChangeText={(e) => { setName(e) }} mode="outlined"
          theme={{
            roundness: 25,
          }} />
      </DetailsComponent>

  )
}