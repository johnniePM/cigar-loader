import { View, Text, TouchableOpacity, Image, Dimensions, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { ICounterComponent } from '../constants';



function CounterComponent({
    left,
    decrease,
    increase,
    number
}: ICounterComponent) {

  return (


          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", rowGap: 4 }} >
              <Text style={{ color: "#666", fontWeight: "700", opacity: 0.6, fontSize: 20 }}>
                {left}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", columnGap: 16, borderWidth: 1, borderColor: "#555", borderRadius: 200, padding: 4, paddingHorizontal: 16 }}
            >
              <TouchableOpacity onPress={()=>{decrease?decrease():null}}>
                <Ionicons name='remove' size={30} color={"#333"} />
              </TouchableOpacity>
              <Text style={{ color: "#333", fontWeight: "bold", fontSize: 24 }} >{number}</Text>
              <TouchableOpacity onPress={()=>{increase?increase():null}}>
                <Ionicons size={30} name='add' color={"#333"} />
              </TouchableOpacity>
            </View>
          </View>
        
  )
}


export default React.memo(CounterComponent);
