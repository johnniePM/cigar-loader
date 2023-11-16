import React, { useState, useEffect, useRef } from 'react'
import { Dimensions, LayoutAnimation, Platform, Text as ReactText, View, NativeModules, Animated as ReactAnimated , Vibration} from "react-native"
import { Divider, Portal, Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useFonts } from 'expo-font';
import Ionicons from "@expo/vector-icons/Ionicons";

import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootRouteProps, RootStackParamList } from "../navigation/StackNav";

import CoffeeCard from "../components/Card";
import { DbBrand, DbCigar, DbHumidor, DbLibrary, IHomeBrand } from "../constants";
import DetailsComponent from '../components/DetailsComponent';
import { UseDatabase } from '../hooks/UseDatabase';
import { checkIsCigar, checkIsHumidor, checkIsLibrary } from "../services/guards";
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const LAYOUT = LayoutAnimation.create(300, "easeInEaseOut", "scaleY");

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

interface animatedListInterface {
    index: number;
    items: DbLibrary[];
    openedId: number,
}
interface animatedItem {
    library: DbLibrary
}
const AnimatedItem = ({ library }: animatedItem) => {
    const theme = useTheme()
    const scale = new ReactAnimated.Value(1)
    const [visible,setVisible]=useState<boolean>(false)

    const handle_scale = () => {
        setVisible(false)
        ReactAnimated.spring(scale, { mass: 1, stiffness: 100, damping: 40, useNativeDriver: true, toValue: 0.8 }).start((e) => {



        })
    }
    const handle_onPress_Out = () => {
        ReactAnimated.spring(scale, { mass: 1, stiffness: 100, damping: 40, useNativeDriver: true, toValue: 1 }).start()


    }
    const handle_long_press = () => {
        ReactAnimated.spring(scale, { mass: 1, stiffness: 100, damping: 40, useNativeDriver: true, toValue: 1.2 }).start((e) => {
            // ReactAnimated.timing(animated_height,{"duration":200, toValue:200, useNativeDriver:false})
            ReactAnimated.spring(scale, { mass: 1, stiffness: 100, damping: 40, useNativeDriver: true, toValue: 1 }).start(()=>{
                !visible?LayoutAnimation.easeInEaseOut():null
                
                setVisible(true)
                Vibration.vibrate()
            })
        })
    }
    return (
        <View>
   
            <ReactAnimated.View style={{ height: 70, marginTop: 10, backgroundColor: theme.colors.outlineVariant, borderRadius: 30, overflow: 'hidden', transform: [{ scale: scale }] }}>
                <TouchableRipple style={{ height: 70, backgroundColor: theme.colors.outlineVariant, borderRadius: 30, paddingHorizontal: 30, }} onLongPress={() => { handle_long_press() }} onPressOut={() => { handle_onPress_Out() }} onPressIn={() => { handle_scale() }}>


                    <React.Fragment>
                        <View style={{ justifyContent: "space-between", flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, alignContent: "center", alignItems: "center", flexDirection: "row", columnGap: 15 }}>
                                <Ionicons size={25} name='calendar-outline' color={theme.colors.onSurface} />
                                <Text variant='bodyLarge' style={{ color: theme.colors.onSurface }}>{new Date(library.date_added).getDate() + "/" + (new Date(library.date_added).getMonth() + 1) + "/" + new Date(library.date_added).getFullYear()}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "flex-end" }}>
                                <Text>Total Number {library.total_number}</Text>
                                <Text variant='bodyMedium'>{library.price}.00 sek/st</Text>
                            </View>
                        </View>
                    </React.Fragment>
                </TouchableRipple >

            </ReactAnimated.View >
            {visible&&
            <BlurView intensity={60} style={{  width: "auto",height:40, position: "absolute", zIndex: 50, paddingHorizontal:20, flexDirection: "row" ,  alignItems:"center",right:30, bottom:-40}}>
                <Text>Edit | </Text>
                <Text>Delete</Text>
            </BlurView>
            }
        </View >
    )
}

const AnimatedList = ({ index, items, openedId }: animatedListInterface) => {
    const height = new ReactAnimated.Value(items.reduce((acc, curr) => acc + 80, 0))
    if (index == openedId) {
        // var height_array:Array<SharedValue<number>>=items.map((val, index)=>(80))

        return (
            <ReactAnimated.View style={{ height: index == openedId ? height : 0, marginTop: -32, width: "90%", alignSelf: "center", overflow: "visible" }}>
                {items.map((library, i) => {
                    // const animated_height=height_array[index].value-10

                    return (
                        <AnimatedItem library={library} />

                    )
                })}
            </ReactAnimated.View>
        )
    }
}



export interface BrandDetails {
    [cigar: string]: DbLibrary[]
}
export default function Library() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { brand, info, index } = useRoute<RootRouteProps<"Library">>().params;
    const [totalNumber, setTotalNumber] = useState<number>(0)
    const [name, setName] = useState<string>("")
    const [cigarItems, setCigaritems] = useState<Array<DbCigar>>([])
    const [libraryItems, setLibraryitems] = useState<Array<DbLibrary>>([])
    const [groupItems, setGroupitems] = useState<{ [key: string]: DbLibrary[] }>()
    const [openedId, setOpenedId] = useState<number>(NaN)
    const [humidor, setHumidor] = useState<DbHumidor>()
    const database = UseDatabase()
    const theme = useTheme()
    const an = useRef(new ReactAnimated.Value(-1)).current as ReactAnimated.Value
    const set_items = async () => {
        var cigars: DbCigar[] = []
        var library: DbLibrary[] = []
        await database.async_select_from_table("Cigar", brand.id, "brand_id").then((e) => {
            //Cigar section
            if (checkIsCigar(e)) {
                cigars = e
                return (e)
            }
        }).then(async (b) => {
            //Library section
            if (!Number.isNaN(index)) {
                console.log("number is not nan")
                console.log(index)
                var j = await database.async_select_from_table("Library", index, "humidor_id")
            } else {
                console.log("number is  nan")
                console.log(index)
                var j = await database.async_select_from_table("Library")

            }
            if (checkIsLibrary(j)) {
                j = j.filter((e) => {
                    return cigars.some(cigar => cigar.id === e.cigar_id)
                })
                library = j
            }

            const groupedByCigarId: { [key: string]: DbLibrary[] } = library.reduce((acc, item) => {
                const cigarId = item.cigar_id;

                if (!acc[String(cigarId)]) {
                    acc[String(cigarId)] = [];
                }

                acc[String(cigarId)].push(item);

                return acc;
            }, {} as { [key: string]: DbLibrary[] });
            setGroupitems(groupedByCigarId)
            setCigaritems(cigars)
            setLibraryitems(library)

        }).then(async () => {
            console.log("index")
            console.log(index)
            console.log("index")
            const h = await database.async_select_from_table("Humidor", index, "id")
            if (checkIsHumidor(h)) {
                setHumidor(h[0])
            }
        })
    }

    useEffect(() => {


        set_items()
        console.log("groupItems")
        console.log(groupItems)
        console.log("groupItems")

    }, [])
    const [fontsLoaded] = useFonts({
        'stylistic': require('../assets/fonts/Bidenatrial.ttf')


    });


    if (fontsLoaded) {
        return (
            <View style={{ flex: 1 }}>

                <DetailsComponent
                    backgroundImage={require('../assets/images/Background.png')}
                    buttonText='Add Humidor'
                    onPress={() => { }}
                    short={humidor?.name != undefined ? humidor.name : ""}
                    topText={name == "" ? "Brand Details" : name}
                    Component={() => (
                        <View style={{ height: 250, width: width, justifyContent: "center", alignItems: "center" }}>

                            <ReactText style={{ fontFamily: "stylistic", fontSize: 120, color: "#ffffff" }} adjustsFontSizeToFit numberOfLines={1} >{brand.name}</ReactText>
                        </View>
                    )}
                    number={totalNumber}

                >

                    {groupItems != undefined && Object.keys(groupItems).map((item, index) => {
                        const total_number = groupItems[item].reduce((sum, item) => sum + item.total_number, 0)
                        const cigar = cigarItems.find(cigar => cigar.id == parseInt(item))

                        const height_calculation = () => {
                            openedId == index ? setOpenedId(NaN) : setOpenedId(index)
                            LayoutAnimation.easeInEaseOut()
                            // ReactAnimated.spring(an, {toValue: index==openedId?-1: index, useNativeDriver:false, }).start((e)=>{
                            // })


                        }
                        return (
                            <React.Fragment>

                                <Surface style={{ backgroundColor: theme.colors.elevation.level5, borderRadius: 20, overflow: "hidden" }} elevation={0}>
                                    <TouchableRipple style={{ backgroundColor: theme.colors.primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 }} onPress={() => { height_calculation() }}>
                                        <>
                                            <Surface elevation={0} style={{ rowGap: 10 }}>
                                                <View style={{ alignSelf: "center" }}>
                                                    <Text variant="headlineSmall" style={{ color: theme.colors.onPrimary }}>{cigar?.name}</Text>
                                                </View>
                                                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                                    <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge">Diameter: {cigar?.ring}</Text>
                                                    <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge">Somking Time: {cigar?.smoking_time}</Text>
                                                </View>
                                                <Divider bold />
                                                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                                    <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge">Length: {cigar?.length}</Text>
                                                    <Text style={{ color: theme.colors.onPrimary }} variant="bodyLarge">{total_number} Cigars</Text>
                                                </View>
                                            </Surface>

                                        </>
                                    </TouchableRipple>
                                </Surface>
                                <AnimatedList openedId={openedId} items={groupItems[item]} index={index} />
                                {/* {animated_list(index, groupItems[item], openedId)} */}
                            </React.Fragment>

                        )
                    })}

                </DetailsComponent>

            </View>
        )
    }



}


