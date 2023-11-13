import React, { useState,  useEffect } from 'react'
import { Dimensions, LayoutAnimation, Platform, Text as ReactText, View, NativeModules, Animated } from "react-native"
import { Divider, Surface, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useFonts } from 'expo-font';

import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootRouteProps, RootStackParamList } from "../navigation/StackNav";

import CoffeeCard from "../components/Card";
import { DbBrand, DbCigar, DbHumidor, DbLibrary, IHomeBrand } from "../constants";
import DetailsComponent from '../components/DetailsComponent';
import { UseDatabase } from '../hooks/UseDatabase';
import { checkIsCigar, checkIsHumidor, checkIsLibrary } from "../services/guards";


const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const LAYOUT = LayoutAnimation.create(300, "easeInEaseOut", "scaleY");

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


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
    const an= new Animated.Value(-1)
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
                    const height=an.interpolate({inputRange:[index-1,index,index+1], outputRange:[0, groupItems[item].length*40 ,0], extrapolate:"clamp"})
                    console.log(height)
                    const height_calculation=()=>{
                        
                            Animated.spring(an, {toValue: index, useNativeDriver:false, }).start()

                        
                    }
                    console.log(an)
                    return (
                        <>
                            <Surface style={{ backgroundColor: theme.colors.elevation.level5, borderRadius: 20, overflow: "hidden" }} elevation={0}>
                                <TouchableRipple style={{ backgroundColor: theme.colors.elevation.level5, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 }} onPress={() => { height_calculation() }}>
                                    <>
                                        <Surface elevation={0} style={{ rowGap: 10 }}>
                                            <View style={{ alignSelf: "center" }}>
                                                <Text variant="headlineSmall">{cigar?.name}</Text>
                                            </View>
                                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                                <Text variant="bodyLarge">Diameter: {cigar?.ring}</Text>
                                                <Text variant="bodyLarge">Somking Time: {cigar?.smoking_time}</Text>
                                            </View>
                                            <Divider bold />
                                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                                <Text variant="bodyLarge">Length: {cigar?.length}</Text>
                                                <Text variant="bodyLarge">{total_number} Cigars</Text>
                                            </View>
                                        </Surface>

                                    </>
                                </TouchableRipple>
                            </Surface>
                            <Animated.View style={{ height: height, backgroundColor:theme.colors.elevation.level5, marginTop:-32, width:"90%", alignSelf:"center" } }>
                                { groupItems[item].map((library, i) => {
                                    return (

                                        <Text>{library.total_number}  {cigarItems.find(cigar => cigar.id == library.cigar_id)?.name}</Text>

                                    )
                                })}
                            </Animated.View>
                        </>

                    )
                })}
            </DetailsComponent>
        )
    }



}


