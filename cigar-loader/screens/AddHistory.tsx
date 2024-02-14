import react, { useState, useEffect, useRef, Ref, createRef } from "react"
import { Appbar, Chip, Surface, Text, TouchableRipple, TouchableRippleProps, useTheme, TextInput, Button, RadioButton, Switch } from "react-native-paper";
import { SafeAreaView, View, LayoutAnimation, Pressable, ScrollView, VibrationStatic, Vibration } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';
import ScreenWrapper from "../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackNav";
import { Camera } from "expo-camera";
import CounterComponent from '../components/Counter';
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Slider } from "react-native-awesome-slider";
import * as Haptics from 'expo-haptics';
import { DbBrand, DbCigar, DbHistory, DbHumidor, DbLibrary } from "../constants";
import { UseDatabase } from "../hooks/UseDatabase";
import { checkIsBrand, checkIsCigar } from "../services/guards";

const END_POSITION = 200;

export default function AddHistory() {
    const [isCameraPressed, setIsCameraPressed] = useState<boolean>(false)
    const [isStartScreen, setIsStartScreen] = useState<boolean>(true)
    const [screen, setScreen] = useState<number>(0)
    const [availableScreens, setAvailableScreens] = useState<number>(0)
    const [number, setNumber] = useState<number>(0)
    const [date, setDate] = useState<Date>(new Date())
    const [checker, setchecker] = useState<boolean>(true)
    const [selectedHumidor, setSelectedHumidor] = useState<DbHumidor>({ id: NaN, name: "", total_capacity: "0" })
    const [selectedBrand, setSelectedBrand] = useState<DbBrand>()
    const [availableBrands, setAvailableBrands] = useState<Array<DbBrand>>()
    const [availableCigars, setAvailableCigars] = useState<Array<DbCigar>>()
    const [selectedCigar, setSelectedCigar] = useState<DbCigar>()
    const [selectedGroup, setSelectedGroup] = useState<DbLibrary>()
    const [availableLibrary, setAvailableLibrary] = useState<Array<DbLibrary>>()
    const [History, setHistory] = useState<DbHistory>({
        cigar_id: NaN,
        comment: "",
        date_used: "",
        library_id: NaN,
        rate: "5",
        self_used: 1,
        id: NaN,
        total: 0
    })
    const progress = useSharedValue(5);
    const min = useSharedValue(0);
    const max = useSharedValue(10);


    const database = UseDatabase()

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const theme = useTheme()
    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (selectedDate != undefined) {
            setDate(selectedDate)
        }
    };

    const select_humidor = (v: DbHumidor) => {
        setSelectedHumidor(v)
        const library_items: DbLibrary[] = database.LibraryList
        library_items.filter((e) => { return (e.humidor_id == v.id && e.total_number > 0) })
        setAvailableLibrary(library_items)
        const cigar_ids: Array<number> = library_items.reduce((accumulator: Array<number>, currentItem) => {
            // Assuming currentItem has a property called cigar_id
            const cigarId: number = currentItem.cigar_id;

            // Check if the cigar_id is not already in the accumulator array
            const  checkCigarInHumidor:boolean=library_items.some((v)=>cigarId==v.cigar_id) 
            if (!accumulator.includes(cigarId) &&  checkCigarInHumidor) {
                // If not, add it to the accumulator array
                accumulator.push(cigarId);
            }

            return accumulator;
        }, []);
        database.async_select_from_table("Cigar", cigar_ids, "id").then((cigar_list) => {
            if (checkIsCigar(cigar_list)) {
                setAvailableCigars(cigar_list)
                return cigar_list
            }
        }).then((cigar_list) => {
            if (cigar_list != undefined) {
                const brand_id: Array<number> = cigar_list.reduce((accumulator: Array<number>, currentItem) => {
                    // Assuming currentItem has a property called cigar_id
                    const cigarId: number = currentItem.brand_id;

                    // Check if the cigar_id is not already in the accumulator array
                    if (!accumulator.includes(cigarId)) {
                        // If not, add it to the accumulator array
                        accumulator.push(cigarId);
                    }

                    return accumulator;
                }, []);
                return database.async_select_from_table("Brand", brand_id, "id")
            }
        }).then((brand_list) => {
            if (brand_list != undefined && checkIsBrand(brand_list)) {
                setAvailableBrands(brand_list)
                // setAvailableBrands(brand_list)
            }
        }).finally(() => {
            setScreen(2); setAvailableScreens(2);
        })



    }
    const select_brand = (v: DbBrand) => {
        setSelectedBrand(v)
        const library_items: DbLibrary[] = database.LibraryList
        library_items.filter((e) => { return (e.humidor_id == selectedHumidor.id && e.total_number > 0) })
        setAvailableLibrary(library_items)
        const cigar_ids: Array<number> = library_items.reduce((accumulator: Array<number>, currentItem) => {
            const cigarId: number = currentItem.cigar_id;
            if (!accumulator.includes(cigarId)) {
                accumulator.push(cigarId);
            }
            return accumulator;
        }, []);

        database.async_select_from_table("Cigar", cigar_ids, "id").then((cigar_list) => {
            if (checkIsCigar(cigar_list)) {
                cigar_list = cigar_list.filter((i) => i.brand_id == v.id)
                setAvailableCigars(cigar_list)
                return cigar_list
            }
        }).finally(() => {
            setScreen(3);
            setAvailableScreens(3)
        })



    }
    const select_cigar = (v: DbCigar) => {

        const library_items: DbLibrary[] = database.LibraryList
        setAvailableLibrary(library_items.filter((e) => { return e.humidor_id == selectedHumidor.id && e.total_number > 0 && e.cigar_id == v.id }))
        // console.log(library_items)
        // (library_items)
        setSelectedCigar(v)
        setScreen(4);
        setAvailableScreens(4)




    }
    const select_group = (v: DbLibrary) => {


        // setAvailableLibrary(library_items.filter((e)=>{return e.humidor_id==selectedHumidor.id && e.total_number>0&&e.cigar_id==v.id }))
        // console.log(library_items)
        // (library_items)
        // setSelectedCigar(v)
        setSelectedGroup(v)
        setHistory(prevstate => ({ ...prevstate, cigar_id: v.cigar_id, library_id:v.id }))
        setScreen(5);
        setAvailableScreens(5)




    }

    const showDate = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };
    useEffect(() => {
        LayoutAnimation.easeInEaseOut()


    }, [isCameraPressed])
    useEffect(() => {
        console.log(database.CigarList)
        console.log(database.HumidorList)
        console.log(database.LibraryList)


    }, [])
    useEffect(() => {
        console.log(History)
    }, [History])

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
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { setScreen(2) }} disabled={availableScreens < 2 ? true : false} selected={screen == 2 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>2.Brand</Text></Chip>
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { setScreen(3) }} disabled={availableScreens < 3 ? true : false} selected={screen == 3 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>3.Cigar</Text></Chip>
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { setScreen(4) }} disabled={availableScreens < 4 ? true : false} selected={screen == 4 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>4.Group</Text></Chip>
                            <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { setScreen(5) }} disabled={availableScreens < 5 ? true : false} selected={screen == 5 ? true : false} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}>5.Finalizing</Text></Chip>
                        </Surface>
                    </ScrollView>
                    {screen == 1 &&
                        <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between", rowGap: 20, paddingHorizontal: 10, }}>
                            {database.HumidorList.map((v) => {
                                return (
                                    <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: "100%", paddingVertical: 20 }}>
                                        <TouchableRipple onPress={() => { select_humidor(v) }} style={{ flex: 1, paddingVertical: 20 }}>
                                            <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                                <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>{v.name} | {v.total_capacity}</Text>
                                            </View>
                                        </TouchableRipple>
                                    </View>

                                )
                            })}

                        </Surface>
                    }
                    {screen == 2 &&
                        <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between", rowGap: 20, paddingHorizontal: 10, }}>
                            {availableBrands?.map((v) => {
                                return (
                                    <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: "100%", paddingVertical: 20 }}>
                                        <TouchableRipple onPress={() => { select_brand(v) }} style={{ flex: 1, paddingVertical: 20 }}>
                                            <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                                <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>{v.name}</Text>
                                            </View>
                                        </TouchableRipple>
                                    </View>

                                )
                            })}

                        </Surface>
                    }
                    {screen == 3 &&
                        <Surface elevation={0} style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, justifyContent: "space-between", rowGap: 20, paddingHorizontal: 10, }}>
                            {availableCigars?.map((v) => {
                                return (
                                    <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: "100%", paddingVertical: 20 }}>
                                        <TouchableRipple onPress={() => { select_cigar(v) }} style={{ flex: 1, paddingVertical: 20 }}>
                                            <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", flex: 1 }}>
                                                <Text style={{ color: theme.colors.onPrimary, textAlign: "center" }} variant="titleLarge" numberOfLines={1}>{v.name}</Text>
                                            </View>
                                        </TouchableRipple>
                                    </View>

                                )
                            })}

                        </Surface>
                    }
                    {screen == 4 &&
                        <Surface elevation={0} style={{ flex: 1, rowGap: 20, paddingHorizontal: 10, }}>
                            {availableLibrary?.map((v, e) => {
                                return (

                                    <View key={e} style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", width: "100%", height: 100 }}>
                                        <TouchableRipple onPress={() => { select_group(v) }} style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, alignItems: "center" }}>
                                                <View style={{ justifyContent: "space-between", height: "100%" }}>
                                                    <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge" numberOfLines={1}>Name: {selectedCigar?.name}</Text>
                                                    <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge" numberOfLines={1}>Date added: {new Date(v.date_added).getDay() + "/" + (new Date(v.date_added).getMonth() + 1) + "/" + new Date(v.date_added).getFullYear()}</Text>
                                                </View>
                                                <Text style={{ color: theme.colors.onPrimary }} variant="headlineSmall" numberOfLines={1}>Total {v.total_number}</Text>
                                            </View>
                                        </TouchableRipple>
                                    </View>
                                )
                            })}


                        </Surface>
                    }
                    {screen == 5 &&
                        <Surface elevation={0} style={{ flex: 1, rowGap: 20, paddingHorizontal: 10, }}>
                            <CounterComponent left={"Smoked Cigar Number"} number={History.total} increase={() => { selectedGroup?.total_number != undefined ? selectedGroup?.total_number > History.total ? setHistory(prev => ({ ...prev, total: History.total + 1 })) : null : null }} decrease={() => { History.total > 0 ? setHistory(prev => ({ ...prev, total: History.total - 1 })) : null }} />
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 12 }}>

                                <View style={{ flexDirection: "row", rowGap: 4, alignItems: "center" }} >
                                    <Text style={{ color: "#666", fontWeight: "700", opacity: 0.6, fontSize: 18 }}>
                                        Select Date
                                    </Text>
                                </View>
                                <Button textColor={theme.colors.secondary} mode="contained-tonal" icon="calendar" style={{ paddingVertical: 4 }} onPress={() => { showDate() }} theme={{
                                    roundness: 25,
                                }} >
                                    {/* 3213/43/432</Button> */}
                                    {String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear()} </Button>
                            </View>
                            <TouchableRipple onPress={() => { setHistory((prev) => ({ ...prev, self_used: History.self_used == 0 ? 1 : 0 })); Vibration.vibrate([0, 2, 0, 5, 0, 10]) }} style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 12 }}>
                                <react.Fragment>
                                    <View style={{ flexDirection: "row", rowGap: 4, alignItems: "center" }} >
                                        <Text style={{ color: "#666", fontWeight: "700", opacity: 0.6, fontSize: 18 }}>
                                            Is it Smoked By You
                                        </Text>
                                    </View>
                                    <View pointerEvents="none">
                                        <Switch value={History.self_used == 1} />
                                    </View>
                                </react.Fragment>
                            </TouchableRipple>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 12 }}>
                                <View style={{ flexDirection: "row", rowGap: 4 }} >
                                    <Text style={{ color: "#666", fontWeight: "700", opacity: 0.6, fontSize: 18 }}>
                                        Comment
                                    </Text>
                                </View>
                                <View
                                    style={{ borderRadius: 200, flex: 1, marginLeft: 20 }}
                                >
                                    <TextInput onChangeText={(e) => { setHistory((prev => ({ ...prev, comment: e }))) }} placeholder="Write Your Comment Here..." multiline mode="outlined" outlineStyle={{ backgroundColor: "#00000000", borderRadius: 40, padding: 20, flex: 1, minHeight: 250 }} contentStyle={{ minHeight: 250 }} style={{ minHeight: 250, paddingVertical: 20 }} outlineColor="#555" />


                                </View>
                            </View>

                            <View style={{ width: "100%", paddingHorizontal: 16, marginBottom: 12 }}>
                                <View style={{ flexDirection: "row", rowGap: 4, paddingBottom: 16 }} >
                                    <Text style={{ color: "#666", fontWeight: "700", opacity: 0.6, fontSize: 18 }}>
                                        Rate out of 10
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>

                                    <View
                                        style={{ flex: 1, marginTop: 20 }}
                                    >
                                        <Slider
                                            // style={styles.container}
                                            thumbWidth={40}
                                            sliderHeight={20}
                                            style={{ borderRadius: 25 }}
                                            // markStyle={{backgroundColor:"#456123"}}
                                            containerStyle={{ borderRadius: 25, margin: 20 }}
                                            bubbleContainerStyle={{ marginTop: -25 }}
                                            theme={{ bubbleBackgroundColor: theme.colors.secondary, maximumTrackTintColor: theme.colors.outlineVariant, minimumTrackTintColor: theme.colors.secondary, }}
                                            step={10}
                                            progress={progress}
                                            minimumValue={min}
                                            maximumValue={max}
                                            onSlidingComplete={(r: number) => { setHistory((prev => ({ ...prev, rate: String(r) }))) }}
                                            // onSlidingComplete={()}
                                            hapticMode="step"
                                            onHapticFeedback={() => {
                                                Vibration.vibrate([50, 5, 50, 5])
                                            }
                                            }
                                        />

                                    </View>
                                </View>

                            </View>
                            <View style={{flex:1, flexDirection:"row-reverse", marginBottom:20}}>
                                <View style={{ borderRadius: 40, backgroundColor: theme.colors.secondary, overflow: "hidden", justifyContent: "center", }}>
                                    <TouchableRipple onPress={() => { }} style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 50 }}>
                                        <View>
                                            <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge" numberOfLines={1}>Report </Text>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            </View>
                        </Surface>
                    }


                </ScreenWrapper>




            </View>


        )
    }
}    