import { View, Text, TouchableOpacity, Image, Dimensions, Platform, Keyboard, ImageSourcePropType } from 'react-native'
import React, { useState, ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from 'react-native-paper';
import Autocomplete from './AutoComplete';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import CounterComponent from './Counter';
import { ICounterComponent, IDetailComponent } from '../constants';
const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';




function DetailComponent({
  backgroundImage,
  foregroundImage,
  short,
  topText,
  children,
  left,
  decrease,
  increase,
  number,
  buttonText,
  onPress
}: IDetailComponent) {
  const [totalNumber, setTotalNumber] = useState<number>(0)
  const [name, setName] = useState<string>("")

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, }}>
      <StatusBar style="light" />
      <Image
        source={backgroundImage}
        style={{ height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, position: "absolute", width: "100%" }}
      />
      <SafeAreaView  style={{ flex: 4,  }}>

        <KeyboardAwareScrollView style={{}} contentContainerStyle={{ minHeight: "100%", overflow:"visible" }}  >
          <View style={{ marginHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", zIndex: 10 }} >
            <TouchableOpacity style={{ borderRadius: 50 }} onPress={() => { navigation.goBack() }}>
              {/* <View style={{ borderRadius: 50, backgroundColor:"#432432"}}> */}
              <Ionicons size={50} name='ios-arrow-back-circle' color="white" />
              {/* </View> */}
            </TouchableOpacity>


          </View>
          <View
            style={{
              shadowColor: "#8c5319",
              shadowRadius: 30,
              shadowOffset: { width: 0, height: 30 },
              shadowOpacity: 0.9,
              flexDirection: "row",
              justifyContent: "center",
              


            }}
          >
            <Image source={foregroundImage} resizeMode='contain' style={{ marginTop: ios ? 0 : 80, height: 240, width: 240, borderWidth: 1, transform: [{ scale: 2 }], }} />
          </View>
          <View
            style={{ backgroundColor: "#d4a574", flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 16, borderRadius: 16, padding: 4, paddingHorizontal: 8, opacity: 0.9, width: 64 }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>{short}</Text>
          </View>
          <View style={{ paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
            <Text style={{ color: "#333", fontWeight: "700", fontSize: 36 }}>
              {topText}
            </Text>


          </View>
          <View style={{ paddingHorizontal: 32, alignContent: "center", justifyContent: "center", rowGap: 32 }} >
            {/* <Autocomplete icon='cigar' data={["Cuba","Cuba","Cuba","Cuba","Cuba","Cuba","Cuba","Cuba","Cuba","Cuba","Cuba","Cuba", "Nicaragua", "Syria"]} label='Select Country of origion' value={country} setValue={(e)=>{setCountry(e)}} /> */}
            {/* <TextInput  value={name} onChangeText={(e) => { setName(e) }} /> */}
            {children}

          </View>


        </KeyboardAwareScrollView>
      </SafeAreaView>
      <View style={{ columnGap: 12, paddingBottom: 12 , backgroundColor:"#fff"}} >

          {typeof left == "string" && increase && decrease &&
            <CounterComponent left={left} number={number} increase={() => increase()} decrease={() => decrease()} />
          }

          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 }}>
            <TouchableOpacity
              onPress={() => { onPress() }}
              style={{ backgroundColor: "#d4a574", padding: 16, borderRadius: 200, flex: 1, marginLeft: 16 }}
            >
              <Text style={{ textAlign: "center", textAlignVertical: "center", color: "white", fontSize: 20, fontWeight: "500" }} >{buttonText}</Text>
            </TouchableOpacity>
          </View>


      </View>
    </View>
  )
}


export default React.memo(DetailComponent);
