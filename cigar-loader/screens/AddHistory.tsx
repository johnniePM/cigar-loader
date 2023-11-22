import react, { useState, useEffect, useRef, Ref } from "react"
import { Appbar, Chip, Surface, Text, TouchableRipple, TouchableRippleProps, useTheme } from "react-native-paper";
import { SafeAreaView, View, LayoutAnimation, Pressable, ScrollView } from "react-native";

import ScreenWrapper from "../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackNav";
import { Camera } from "expo-camera";
export default function AddHistory() {
    const [isCameraPressed, setIsCameraPressed] = useState<boolean>(false)
    const [isStartScreen, setIsStartScreen] = useState<boolean>(true)
    const [screen, setScreen] = useState<number>(0)
    const [availableScreens, setAvailableScreens] = useState<number>(0)
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const theme = useTheme()

    useEffect(() => {
        LayoutAnimation.easeInEaseOut()


    }, [isCameraPressed])

    if (availableScreens == 0) {

        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header elevated>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={"Register a Smoked Cigar"} />
                </Appbar.Header>

                <ScreenWrapper withScrollView={false}>

                    <View style={{ flex: 1, borderRadius: 40, margin: 20, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", alignContent: "center" }}>
                        <View style={{ alignSelf: "center", overflow: "hidden", }}>
                            <Text style={{ color: theme.colors.onPrimary }} variant="displaySmall">Manual Addition</Text>
                            <Text style={{ color: theme.colors.onPrimary, alignSelf: "center" }} variant="headlineSmall">(Choose the cigar)</Text>
                        </View>
                        <View style={{ position: "absolute", height: "auto", backgroundColor: theme.colors.onSurfaceVariant, bottom: 10, alignSelf: "center", borderRadius: 40, overflow: "hidden", }}>
                            <TouchableRipple onPress={() => { setScreen(1), setAvailableScreens(1) }} style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 40 }}>
                                <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge">Add Manually</Text>
                            </TouchableRipple>
                        </View>
                    </View>
                    <View style={{ flex: 1, borderRadius: 40, margin: 20, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center" }}>
                        <react.Fragment>
                            {isCameraPressed ?

                                <Camera style={{ flex: 1 }}></Camera>

                                :

                                <View style={{ alignSelf: "center", overflow: "hidden", }}>
                                    <Text style={{ color: theme.colors.onPrimary }} variant="displaySmall">Automatic Addition</Text>
                                    <Text style={{ color: theme.colors.onPrimary, alignSelf: "center" }} variant="headlineSmall">(Scan Qr Code)</Text>
                                </View>
                            }
                            <View style={{ position: "absolute", height: "auto", backgroundColor: theme.colors.onSurfaceVariant, bottom: 10, alignSelf: "center", borderRadius: 40, overflow: "hidden", }}>
                                <TouchableRipple onPressIn={() => { setIsCameraPressed(true) }} onPressOut={() => { setIsCameraPressed(false) }} onPress={() => { }} style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 40 }}>
                                    <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge"> Hold To Scan</Text>
                                </TouchableRipple>
                            </View>
                        </react.Fragment>
                    </View>
                </ScreenWrapper>
            </View>
        )
    } else {
        return (
            <View style={{ height: "100%", width: "100%", overflow: "visible" }}>
                <Appbar.Header elevated>
                    <Appbar.BackAction onPress={() => { setScreen(0); setAvailableScreens(0) }} />
                    <Appbar.Content title={"Register a Smoked Cigar"} />
                </Appbar.Header>
                {/* <ReactAnimated.View style={{backgroundColor:"#8c5319", width:1, height:1, position:"absolute", top:"45%", left:"50%", transform:[{scale:animatedView}] , overflow:"visible", zIndex:1, borderRadius:0.1} }/> */}

                <ScreenWrapper >

                    <ScrollView horizontal style={{ marginBottom: 20, marginTop: 20 }} showsHorizontalScrollIndicator={false}>
                        <Surface elevation={0} style={{ flexDirection: "row", columnGap: 10, rowGap: 20, marginBottom: 10, paddingRight: 25 }} >
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { setScreen(1) }} disabled={availableScreens < 1 ? true : false} selected={screen == 1 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>1.Humidor</Text></Chip>
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => {setScreen(2) }} disabled={availableScreens < 2 ? true : false} selected={screen == 2 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>2.Brand</Text></Chip>
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => {setScreen(3) }} disabled={availableScreens < 3 ? true : false} selected={screen == 3 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>3.Cigar</Text></Chip>
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { setScreen(4)}} disabled={availableScreens < 4 ? true : false} selected={screen == 4 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>4.Group</Text></Chip>
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => {setScreen(5) }} disabled={availableScreens < 5 ? true : false} selected={screen == 5 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>5.Finalizing</Text></Chip>
                        </Surface>
                    </ScrollView>
                    {screen == 1 &&
                        <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between", rowGap: 20, paddingHorizontal: 10, }}>

                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: 200, height: 150 }}>
                                <TouchableRipple onPress={() => { setScreen(2); setAvailableScreens(2) }} style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                        <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>Living Room</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: 200, height: 150 }}>
                                <TouchableRipple onPress={() => { setScreen(2); setAvailableScreens(2) }} style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                        <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>Storage</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </Surface>
                    }
                    {screen == 2 &&
                        <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between", rowGap: 20, paddingHorizontal: 10, }}>

                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: 200, height: 150 }}>
                                <TouchableRipple onPress={() => { setScreen(3); setAvailableScreens(3) }} style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                        <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>Cohiba</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: 200, height: 150 }}>
                                <TouchableRipple onPress={() => { setScreen(3); setAvailableScreens(3) }} style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                        <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>Romeo & Juliette</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </Surface>
                    }
                    {screen == 3 &&
                        <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between", rowGap: 20, paddingHorizontal: 10, }}>

                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: 200, height: 150 }}>
                                <TouchableRipple onPress={() => { setScreen(4); setAvailableScreens(4) }} style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                        <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>Ciglo 1</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: 200, height: 150 }}>
                                <TouchableRipple onPress={() => { setScreen(4); setAvailableScreens(4) }} style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                        <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>Ciglo 2</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </Surface>
                    }
                    {screen == 4 &&
                        <Surface elevation={0} style={{  flex: 1, rowGap: 20, paddingHorizontal: 10, }}>

                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width:"100%", height: 100 }}>
                                <TouchableRipple onPress={() => { setScreen(4); setAvailableScreens(4) }} style={{ flex: 1, paddingVertical: 20, paddingHorizontal:20 }}>
                                    <View style={{flexDirection:"row",  justifyContent: "space-between", flex: 1 , alignItems:"center"}}>
                                        <View style={{justifyContent:"space-between", height:"100%"}}>
                                        <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge" numberOfLines={1}>Name: Ciglo 1</Text>
                                        <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge" numberOfLines={1}>Date added: 21/11/2023</Text>
                                        </View>
                                        <Text style={{ color: theme.colors.onPrimary }} variant="headlineSmall" numberOfLines={1}>Total 15</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: 200, height: 150 }}>
                                <TouchableRipple onPress={() => { setScreen(4); setAvailableScreens(4) }} style={{ flex: 1, paddingVertical: 20 }}>
                                    <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                        <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>Ciglo 2</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </Surface>
                    }



                </ScreenWrapper>




            </View>


        )
    }
}    