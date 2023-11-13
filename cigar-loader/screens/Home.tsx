import { GestureResponderEvent, LayoutAnimation, StyleSheet, View, ScrollView, Dimensions, Image, Animated as ReactAnimated } from "react-native";
import { Avatar, Button, Card, Chip, Divider, Drawer, FAB, List, Menu, Portal, Searchbar, Surface, Text, useTheme } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "../hooks/UseSettings";
import Ionicons from "@expo/vector-icons/Ionicons";
import CoffeeCard from "../components/Card";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackNav";
import { UseDatabase } from "../hooks/UseDatabase";
import { DbBrand, DbHumidor, DbLibrary, IBrand, IHomeInfo, IHumidor } from "../constants";
import { SelectFromTable } from "../Mocks/databases_mocks";
import { checkIsBrand, checkIsCigar, checkIsHumidor, checkIsLibrary } from "../services/guards";


type ContextualMenuCoord = { x: number; y: number };

const SCREENWIDTH = Dimensions.get("window").width;
const SCREENHEIGHT = Dimensions.get("window").height;
const ELEMENTWIDTH = SCREENWIDTH - 32 - 32;
const SPACING = (SCREENWIDTH - ELEMENTWIDTH) / 2;
export default function Home() {
    const [visible, setVisible] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [firstQuery, setFirstQuery] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [brand, setBrand] = useState<Array<DbBrand>>([])
    const [homeInfo, setHomeInfo] = useState<IHomeInfo>()
    const [humidorList, setHumidorList] = useState<Array<DbHumidor>>([])
    const [selectedHumidorId, setSelectedHumidorId] = useState<number>()
    const [brandList, setBrandList] = useState<Array<DbBrand>>([])
    const [library, setLibrary] = useState<Array<DbLibrary>>([])
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const database = UseDatabase()
    const settings = useSettings()
    const scrollRef = useRef<ScrollView>(null)
    const animatedScrollYValue = useRef(new ReactAnimated.Value(0)).current;
    // const animatedView = useRef(new ReactAnimated.Value(1)).current;
    // const handle_pressed=()=>{
    //     // ReactAnimated.timing(animatedView,{toValue:SCREENHEIGHT/2, useNativeDriver:true, duration:500}).start(

    //     //     ()=>ReactAnimated.timing(animatedView,{toValue:1, useNativeDriver:true, duration:500}).start()
    //     // )
    // }

    const LAYOUT = LayoutAnimation.create(300, "easeInEaseOut", "opacity");
    const isFocused = useIsFocused()
    const handleExpanded = () => {
        LayoutAnimation.configureNext(LAYOUT)
        setExpanded(!expanded)
    }
    const _handleLongPress = (event: GestureResponderEvent) => {
        const { nativeEvent } = event;

        setVisible(true);
    };
    const theme = useTheme()
    async function set_cigar(selected_humidor?: number) {
        var home: IHomeInfo = { "humidor_id":NaN,"humidor_name": "", "humidor_capacity": 0, "brands": {} }
        var lib: Array<{ cigar_id: number, price: number, total: number, brand_id: number }> = []
        await database.async_select_from_table("Humidor").then(async (list_h) => {
            if (checkIsHumidor(list_h)) {
                setHumidorList(list_h)
                list_h.map((v) => {
                    home = { "humidor_name": v.name, "humidor_capacity": parseInt(v.total_capacity), "brands": {}, "humidor_id":NaN }

                })
                if (typeof list_h[0].id != "undefined") {
                    typeof selected_humidor == "undefined" ? setSelectedHumidorId(undefined) : setSelectedHumidorId(selected_humidor)


                }
                if (list_h.length > 0) {

                    if (typeof selected_humidor == "undefined") { return (database.async_select_from_table("Library")) }
                    else {
                        home.humidor_id=selected_humidor
                        return (
                            database.async_select_from_table("Library", selected_humidor, "humidor_id")
                        )
                    }

                } else {
                    return []
                }
            }
        }).then(async (e) => {
            if (typeof e != "undefined") {


                if (checkIsLibrary(e)) {
                    var cigar_ids: Array<number> = []
                    
                    e.map((v) => {
                        const lib_index = lib.findIndex(obj => obj.cigar_id === v.cigar_id)
                        if (!cigar_ids.includes(v.cigar_id)) {
                            if (typeof v.cigar_id == "number" && !Number.isNaN(v.cigar_id)) {
                                cigar_ids.push(v.cigar_id)


                            }
                        }
                        if (lib_index == -1) {
                            if (typeof v.cigar_id == "number" && !Number.isNaN(v.cigar_id)) {
                                lib.push({ cigar_id: v.cigar_id, brand_id: NaN, price: v.price, total: v.total_number })
                            }
                        } else {
                            if (typeof v.cigar_id == "number" && !Number.isNaN(v.cigar_id)) {
                                lib[lib_index].price += v.price
                                lib[lib_index].total += v.total_number
                            }

                        }
                    })
                    if (cigar_ids.length > 0) {

                        return await database.async_select_from_table("Cigar", cigar_ids, "id")
                    } else {
                        return []
                    }
                }
            }

        }).then(async (list_c) => {
            if (typeof list_c != "undefined") {
                if (checkIsCigar(list_c)) {
                    var brand_ids: Array<number> = []
                    list_c.map((v) => {
                        const lib_index = lib.findIndex(obj => obj.cigar_id === v.id)

                        if (!brand_ids.includes(v.brand_id)) {
                            if (typeof v.brand_id == "number" && !Number.isNaN(v.brand_id)) {
                                brand_ids.push(v.brand_id)
                            }
                        }
                        if (lib_index != -1) {
                            lib[lib_index].brand_id = v.brand_id
                        }
                    })
                    if (brand_ids.length > 0) {
                        return await database.async_select_from_table("Brand", brand_ids, "id")
                    } else {
                        return []
                    }
                }
            }
        }).then((list_b) => {
            if (typeof list_b != "undefined") {
                if (checkIsBrand(list_b)) {
                    setBrandList(list_b)

                }
            }

            // return await database.async_select_from_table("Library", list_h[0].id, "humidor_id")

        }).finally(() => {
            lib.map((v) => {
                if (String(v.brand_id) in home.brands == false) {
                    home.brands[String(v.brand_id)] = { brand_cigars: v.total, brand_name: "", brand_valuation: v.price * v.total }
                } else {
                    home.brands[String(v.brand_id)].brand_cigars += v.total
                    home.brands[String(v.brand_id)].brand_valuation += v.price * v.total
                    // home.brands[v.brand_id]={brand_cigars:v.total, brand_name:"", brand_valuation:v.price}

                }
            })
            setHomeInfo(home)
        })
    }
    useEffect(() => {
        database.select_from_table("Brand", setBrand)
        database.select_from_table("Library", database.handleLibraryList)
        database.select_from_table("Cigar", database.handleCigarList)
        database.select_from_table("Humidor", database.handleHumidorList)

        set_cigar()






    }, [])

    useEffect(() => {
        // database.select_from_table("Brand", setBrand)
        // database.select_from_table("Library", database.handleLibraryList)
        // database.select_from_table("Cigar", database.handleCigarList)
        // database.select_from_table("Humidor", database.handleHumidorList)

        if (isFocused) {
            set_cigar()
        }



    }, [isFocused])

    const animated_card = (index: number, item: DbBrand) => {
        // const Scale=useSharedValue(1)

        const scale = animatedScrollYValue.interpolate({
            inputRange: [
                (SCREENWIDTH * 0.65 + 20) * (index - 1),
                (SCREENWIDTH * 0.65 + 20) * index,
                (SCREENWIDTH * 0.65 + 20) * (index + 1),
            ],
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
        });
        const translate = animatedScrollYValue.interpolate({
            inputRange: [
                (SCREENWIDTH * 0.65 + 20) * (index - 1),
                (SCREENWIDTH * 0.65 + 20) * index,
                (SCREENWIDTH * 0.65 + 20) * (index + 1),
            ],
            outputRange: [-((SCREENWIDTH - 20 - (SCREENWIDTH * 0.65)) / 2) / 2, 0, ((SCREENWIDTH - 20 - (SCREENWIDTH * 0.65)) / 2) / 2],
            extrapolate: "clamp",
        });

        const rotatea = animatedScrollYValue.interpolate({
            inputRange: [
                (SCREENWIDTH * 0.65) * (index - 1),
                (SCREENWIDTH * 0.65) * index,
                (SCREENWIDTH * 0.65) * (index + 1),
            ],
            outputRange: ["3deg", "0deg", "-3deg"],
            extrapolate: "clamp",
        });
        if (homeInfo?.brands[item.id] == undefined) {
        }
        if (homeInfo?.brands[item.id]!=undefined){

            return (
                <ReactAnimated.View
                style={{
                    width: SCREENWIDTH * 0.65,
                    alignItems: "center",
                    overflow: "visible",
                    transform: [
                        { scale: scale },
                        { translateX: translate }
                    ],
                    marginRight: 20
                }} >
                
                    <CoffeeCard onPress={() => {
                        // handle_pressed() ;
                        navigation.navigate("Library", {"info":homeInfo.brands[item.id], "brand": item, "index":homeInfo.humidor_id})
                        }} brand={item} info={homeInfo?.brands[item.id]} />
                
            </ReactAnimated.View>
        )
    }
    }

    return (
        <View style={{ height: "100%", width: "100%", overflow: "visible" }}>

            {/* <ReactAnimated.View style={{backgroundColor:"#8c5319", width:1, height:1, position:"absolute", top:"45%", left:"50%", transform:[{scale:animatedView}] , overflow:"visible", zIndex:1, borderRadius:0.1} }/> */}

            <ScreenWrapper >
                <Searchbar
                    placeholder="Search"
                    onChangeText={(query: string) => setFirstQuery(query)}
                    value={firstQuery}
                    style={{ marginVertical: 10, marginHorizontal: 25, marginBottom: 20 }}
                />
                <ScrollView horizontal style={{ paddingHorizontal: 25, marginBottom: 20 }} showsHorizontalScrollIndicator={false}>
                    <Surface elevation={0} style={{ flexDirection: "row", columnGap: 20, rowGap: 20, marginBottom: 10, paddingRight: 25 }} >
                        <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { set_cigar(undefined).then(() => { LayoutAnimation.configureNext(LAYOUT) }) }} selected={selectedHumidorId == undefined} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}> All</Text></Chip>
                        {humidorList.map((v) => {
                            return (
                                <>
                                    <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { set_cigar(v.id).then(() => { LayoutAnimation.configureNext(LAYOUT) }) }} selected={selectedHumidorId == v.id} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}> {v.name}</Text></Chip>
                                </>
                            )
                        })}



                    </Surface>
                </ScrollView>

                <ReactAnimated.ScrollView
                    removeClippedSubviews={false}
                    pagingEnabled
                    horizontal
                    style={{ width: SCREENWIDTH, overflow: "visible", flex: 1 }}
                    contentContainerStyle={{ overflow: "visible", paddingTop: 50, paddingLeft: (SCREENWIDTH - 20 - (SCREENWIDTH * 0.65)) / 2, paddingRight: (SCREENWIDTH - 20 - (SCREENWIDTH * 0.65)) / 2, paddingBottom: 25 }}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={SCREENWIDTH * 0.65 + 20}
                    onScroll={ReactAnimated.event(
                        [
                            {
                                nativeEvent: { contentOffset: { x: animatedScrollYValue } },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    ref={scrollRef}
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}

                >

                    {brandList?.map((value, index) => {
                        return (
                            <>

                                {animated_card(index, value)}



                            </>
                        )
                    })}


                </ReactAnimated.ScrollView>
                {brandList.length == 0 &&
                    <Text variant="headlineLarge" style={{ color: theme.colors.backdrop, paddingHorizontal: 25, alignSelf: "center", textAlign: "center", paddingBottom: 25 }} >No Cigars in the Following Humidor</Text>
                }

                {settings.ShowQuickStats &&
                    <Card mode="contained" style={{ marginBottom: 20, marginHorizontal: 20 }} onPress={() => handleExpanded()}>
                        <Card.Title
                            title="Quick Statistics"
                            left={(props) => <Avatar.Icon {...props} icon="chart-bubble" />

                            }
                            right={(props) => <Ionicons size={50} color={theme.colors.backdrop} name={!expanded ? "ios-arrow-down-circle-outline" : "ios-arrow-up-circle-outline"} />}
                        />
                        {expanded &&
                            <Card.Content>
                                {settings.SmokedW &&
                                    <List.Item

                                        title="Cigars smoked This week"
                                        description={`3 Cigar!`}
                                        left={(props) => <List.Icon {...props} icon="calendar-blank-outline" />}
                                    />
                                }
                                {settings.SmokedM &&
                                    <List.Item

                                        title="Cigars smoked This month"
                                        description={`3 Cigar!`}
                                        left={(props) => <List.Icon {...props} icon="calendar-blank-outline" />}
                                    />
                                }
                                {settings.SmokedY &&
                                    <List.Item

                                        title="Cigars smoked This year"
                                        description={`3 Cigar!`}
                                        left={(props) => <List.Icon {...props} icon="calendar-blank-outline" />}
                                    />
                                }
                                {settings.LastSmoked &&
                                    <List.Item

                                        title="Last Smoked Cigar"
                                        description={`Cohiba Ciglo\nOn!`}
                                        left={(props) => <List.Icon {...props} icon="cigar" />}
                                    />
                                }
                                {settings.LastAdded &&
                                    <List.Item

                                        title="Last Added cigar"
                                        description={`Habanos Chichaho\nOn 2010/01/01!`}
                                        left={(props) => <List.Icon {...props} icon="cigar" />}
                                    />
                                }
                                {settings.MostCigarBrand &&
                                    <List.Item

                                        title="Most cigar brand"
                                        description={`Habanos Chichaho\nOn 2010/01/01!`}
                                        left={(props) => <List.Icon {...props} icon="cigar" />}
                                    />
                                }
                                {settings.MostCigarName &&
                                    <List.Item

                                        title="most cigar name"
                                        description={`Habanos Chichaho\nOn 2010/01/01!`}
                                        left={(props) => <List.Icon {...props} icon="cigar" />}
                                    />
                                }

                            </Card.Content>
                        }
                    </Card>


                }

            </ScreenWrapper>

            <FAB.Group
                backdropColor={theme.colors.elevation.level2.replace(")", ", 11)")}
                open={open}
                label={!open ? settings.QuickAdd : "ScaleDown"}
                icon={open ? 'minus' : 'plus'}
                actions={[

                    { icon: 'cigar', label: 'Add new cigar', onPress: () => { } },
                    { icon: 'dresser-outline', label: 'Add New Humidor', onPress: () => { navigation.navigate("AddHumidor") } },
                    {
                        icon: 'content-save-edit',
                        label: 'Report Smoking a Cigar',
                        onPress: () => { },
                        size: theme.isV3 ? 'small' : 'medium',
                    },
                ]}
                onStateChange={({ open }: { open: boolean }) => { !open ? setOpen(false) : null }}
                onLongPress={() => setOpen(!open)}
                onPress={() => {
                    if (!open) {
                        var item = theme.colors.elevation.level2
                        if (typeof item == "string") {
                            navigation.navigate("AddCigar")
                        }
                    }
                }}
                visible={!visible}
            />

            {/* <FAB icon="plus" size="medium" onPress={() => { }} onLongPress={_handleLongPress} visible style={styles.fab} /> */}

        </View>


    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    winner: {
        fontWeight: '700',
    },
    listRow: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    teamResultRow: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    score: {
        marginRight: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    card: {
        marginHorizontal: 8,
        marginBottom: 8,
    },
    cardContainer: {
        marginBottom: 80,
    },
    chipsContainer: {
        flexDirection: 'row',
    },
    chipsContent: {
        paddingLeft: 8,
        paddingVertical: 8,
    },
    chip: {
        marginRight: 8,
    },
});