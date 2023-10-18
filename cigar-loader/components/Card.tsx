import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
export default function CoffeeCard(props) {
    const navigation = useNavigation();
    return (

        <View
            style={{
                borderRadius: 40,
                backgroundColor: "#8c5319",
                height: ios ? height * 0.4 : height * 0.50,
                width: width * 0.65,
            }}
        >
            
            <View
                style={{
                    shadowColor: 'black',
                    shadowRadius: 30,
                    shadowOffset: { width: 0, height: 40 },
                    shadowOpacity: 0.8,
                    marginTop:  -(height * 0.08) ,
                    flexDirection: "row",
                    justifyContent: "center",
 


                }}
            >
                <Image
                    source={require('../assets/images/Cigar_Humidor2.png')}
                    resizeMode='contain'
                    style={{ height: 200, width: 200} }
                
                />
            </View>
            <View style={{ paddingHorizontal: 5, flex: 1, justifyContent: "space-between", marginTop: 5 }} >
                <View style={{ gap: 3, marginTop: 3 }} >
                    <Text style={{ fontSize: 24, fontWeight: "800", zIndex: 10 }}>
                        "dsadsadsa"
                    </Text>
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', flexDirection: "row", alignItems: "center", borderRadius: 20, padding: 1, paddingHorizontal: 2, width: 16 }}
                    >
                        {/* <StarIcon size="15" color="white" />
                <Text className="text-base font-semibold text-white">{item.stars}</Text>
              </View>
              <View className="flex-row space-x-1 z-10 mb-6">
                <Text className="text-base text-white font-semibold opacity-60">
                  Volume 
                </Text>
                <Text className="text-base text-white font-semibold"> {item.volume}</Text>
              </View>
            </View>
            

            <View style={{
              backgroundColor: ios? "#8c5319": 'transparent',
              shadowColor: "#8c5319",
              shadowRadius: 25,
              shadowOffset: {width: 0, height: 40},
              shadowOpacity: 0.8,
            }} className="flex-row justify-between items-center mb-5">
              <Text className="text-white font-bold text-lg">$ {item.price}</Text>
              <TouchableOpacity 
              onPress={()=> navigation.navigate('Product', {...item})}
              style={{
                shadowColor: 'black',
                shadowRadius: 40,
                shadowOffset: {width: -20, height: -10},
                shadowOpacity: 1,
              }} className="p-4 bg-white rounded-full">
              </TouchableOpacity> */}
                    </View>


                </View>

            </View>
        </View>

    )
}