import { View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "@expo/vector-icons/Ionicons";

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';


export default function ToEdit(props:any) {
  const item =  {
    id: 1,
    name: 'Esspresso',
    price: '25.50',
    volume: '116 ml',
    stars: '4.6',
    image: require('../assets/images/Cigar_Humidor3.png'),
    desc: 'The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.'
  }
  const [size, setSize] = useState('small');
  const navigation = useNavigation();
  return (
    <View style={{flex:1}}>
      <StatusBar style="light" />
      <Image 
        source={require('../assets/images/Background.png')} 
        style={{height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, position:"absolute", width:"100%"}} 
         />
      <SafeAreaView style={{flex:4}}>
        <View style={{marginHorizontal:16, flexDirection:"row", justifyContent:"space-between",alignItems:"center"}} >
          <TouchableOpacity style={{borderRadius:50}} onPress={()=> navigation.goBack()}>
            <Ionicons size={50} name='md-arrow-back' strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={{borderRadius:24, borderWidth:2, borderColor:"white", padding:8}} >
            
          </TouchableOpacity>
        </View>
        <View 
          style={{
            shadowColor: "#8c5319",
            shadowRadius: 30,
            shadowOffset: {width: 0, height: 30},
            shadowOpacity: 0.9,
            flexDirection:"row",
            justifyContent:"center",

            
          }}
          >
          <Image source={item.image}  style={{marginTop: ios? 0:80, height:240, width:240, borderWidth:4,transform:[{scale:2}] }} />
        </View>
        <View 
          style={{backgroundColor: "#d4a574", flexDirection:"row", justifyContent:"center", alignItems:"center", marginHorizontal:16, borderRadius:16, padding:4, paddingHorizontal:8, opacity:0.9, width:64}} 
          >
          <Text style={{color:"white", fontWeight:"700"}}>{item.stars}</Text>
        </View>
        <View style={{paddingHorizontal:16, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}} >
            <Text style={{color: "#333", fontWeight:"700", fontSize:36}}>
              {item.name}
            </Text>
            <Text style={{color: "#333", fontSize:24, fontWeight:"500"}} >
              $ {item.price}
            </Text>
            
        </View>
        <View  style={{paddingHorizontal:16,  gap:12}} >
          <Text style={{color: "#333", fontSize:24, fontWeight:"700", }} >Coffee size</Text>
          <View style={{flexDirection:"row", justifyContent:"space-between"}} >
            <TouchableOpacity 
             onPress={()=> setSize('small')}
             style={{backgroundColor: size=='small'? "#d4a574": 'rgba(0,0,0,0.07)', padding:16, paddingHorizontal:32, borderRadius:20}} 
             >
              <Text style={size=='small'? {color:"white"}: {color:"gray"}} >Small</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=> setSize('medium')}
             style={{backgroundColor: size=='medium'? "#d4a574": 'rgba(0,0,0,0.07)', padding:12, paddingHorizontal:32, borderRadius:20}}
              >
              <Text style={size=='medium'? {color:"white"}: {color:"gray"}} >Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=> setSize('large')}
             style={{backgroundColor: size=='large'? "#d4a574": 'rgba(0,0,0,0.07)', padding:12, paddingHorizontal:32, borderRadius:20}} 
             >
              <Text style={size=='large'? {color:"white"}: {color:"gray"}} >Large</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingHorizontal:16, rowGap:4}} >
          <Text style={{color: "#333", fontSize:24, fontWeight:"700"}} >About</Text>
          <Text style={{color:"#666"}} >
            {item.desc}
          </Text>
        </View>
        
        

        
      </SafeAreaView>
      <View style={{columnGap:12, marginBottom:12}} >
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:16, marginBottom:12}}>
              <View style={{flexDirection:"row", alignItems:"center", rowGap:4}} >
                <Text style={{color:"#666", fontWeight:"700",opacity:0.6, fontSize:20 }}>
                  Volume 
                </Text>
                <Text style={{color:"#000", fontWeight:"700", fontSize:20}} > {item.volume}</Text>
              </View>
              <View 
                style={{flexDirection:"row", alignItems:"center", columnGap:16, borderWidth:1, borderColor:"#555", borderRadius:200, padding:4, paddingHorizontal:16}}
                >
                <TouchableOpacity>
                  <Ionicons name='remove' size={30}   color={"#333"} />
                </TouchableOpacity>
                <Text style={{color: "#333", fontWeight:"bold", fontSize:24}} >2</Text>
                <TouchableOpacity>
                  <Ionicons size={30} name='add' color={"#333"} />
                </TouchableOpacity>
              </View>
          </View>
          <View style={{flexDirection:"row", justifyContent:"space-between", paddingHorizontal:16}}>
            <TouchableOpacity style={{padding:16, borderRadius:200, borderWidth:1, borderColor:"#444"}} >
            </TouchableOpacity>
            <TouchableOpacity 
              style={{backgroundColor: "#d4a574", padding:16, borderRadius:200, flex:1, marginLeft:16}} 
              >
              <Text style={{textAlign:"center", textAlignVertical:"center", color:"white", fontSize:20, fontWeight:"500" }} >Add Humidor</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      
    </View>
  )
}