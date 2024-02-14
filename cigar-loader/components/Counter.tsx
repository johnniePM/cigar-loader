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


          <View style={{ flexDirection: "row", justifyContent: "space-between",  alignItems: "center", paddingHorizontal: 16, marginBottom: 12, flexWrap:"wrap" }}>
            <View style={{ flexDirection: "row", alignItems: "center", rowGap: 4, justifyContent:"flex-start", alignSelf:"center" }} >
              <Text style={{ color: "#666", fontWeight: "700", opacity: 0.6, fontSize: 18 }}>
                {left}
              </Text>
            </View>
            <View style={{flexGrow:2,  alignItems:"flex-end"}}>
            <View
              style={{ flexDirection: "row", alignItems: "center", columnGap: 16, borderWidth: 1, borderColor: "#555", borderRadius: 200, padding: 4, paddingHorizontal: 16, justifyContent:"flex-end" }}
            >
              <TouchableOpacity onPress={()=>{decrease?decrease():null}}>
                <Ionicons name='remove' size={16} color={"#333"} />
              </TouchableOpacity>
              <Text style={{ color: "#333", fontWeight: "bold", fontSize: 16 }} >{number}</Text>
              <TouchableOpacity onPress={()=>{increase?increase():null}}>
                <Ionicons size={16} name='add' color={"#333"} />
              </TouchableOpacity>
            </View>
          </View>
          </View>
        
  )
}


export default React.memo(CounterComponent);
