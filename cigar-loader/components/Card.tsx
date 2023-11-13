import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { Shadow } from 'react-native-shadow-2';
import { ICoffeeCard } from '../constants';
import Animated from 'react-native-reanimated';



const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
 function CoffeeCard({info, brand, onPress=()=>{}}: ICoffeeCard) {
    
    return (
        <Shadow
            style={{zIndex:20}}
            distance={30}
            startColor={"#8c531970"}
            endColor={"#00000000"}
             // To test paintInside default
            
            
            // TopEnd to check if it's supporting the Start/End combinations. When uncommenting this, also comment radius prop above.
            // viewStyle={[doUseSizeProp && { backgroundColor: childColor }, { borderTopLeftRadius: 100, borderTopEndRadius: 10 }]}
            >
            <View
                style={{
                    borderRadius: 40,
                    backgroundColor: "#8c5319",
                    width: width * 0.65,
                    overflow: "visible",
                    zIndex:20
                    
                }}
            >
                <View
                    style={{

                        marginTop: -(height * 0.08),
                        flexDirection: "row",
                        justifyContent: "center",
                        overflow: "visible",
                        zIndex:20



                    }}
                >
                    <Image
                        source={require('../assets/images/CigarHumidor2.png')}
                        resizeMode='contain'
                        style={{
                            height: 200, width: 200, overflow: "visible", zIndex:20
                        }}

                    />
                </View>
                <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: "space-between", marginTop: 5, zIndex:20 }} >
                    <View style={{ rowGap: 12, marginTop: 3 }} >
                        <Text style={{ fontSize: 30, fontWeight: "800", zIndex: 20, color: "white",  }}>
                            {brand.name}
                        </Text>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', flexDirection: "row", alignItems: "center", borderRadius: 20, padding: 4, paddingHorizontal: 8, alignSelf: "flex-start" }}
                        >
                            <Ionicons name='star' size={15} color="white" />
                            <Text style={{ fontWeight: "700", color: "white" }} >{"  "+brand.origin}</Text>
                        </View>
                        <View style={{ flexDirection: "row", rowGap: 4, zIndex: 20, marginBottom: 24 }} >
                            <Text style={{ color: "white", opacity: 0.6 }} >
                                {"Total number in humider:  "}
                            </Text>
                            <Text style={{ fontWeight: "700", color: "white", }} > {info?.brand_cigars}</Text>
                        </View>
                    </View>


                    <View style={{
                        backgroundColor: ios ? "#8c5319" : 'transparent',
                        shadowColor: "#8c5319",
                        shadowRadius: 25,
                        shadowOffset: { width: 0, height: 40 },
                        shadowOpacity: 0.8,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }} >Price:  {info?.brand_valuation+".00"}</Text>
                        <TouchableOpacity
                            onPress={() => {onPress() }}
                            style={{
                                shadowColor: 'black',
                                shadowRadius: 40,
                                shadowOffset: { width: -20, height: -10 },
                                shadowOpacity: 1,

                                backgroundColor: "white",
                                borderRadius: 50
                            }} >
                            <Ionicons size={50} name='add' strokeWidth={2} color="#8c5319" />
                        </TouchableOpacity>
                    </View>


                </View>

            </View>
        </Shadow>
        // </View>

    )
}

export default React.memo(CoffeeCard)