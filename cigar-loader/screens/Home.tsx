import { GestureResponderEvent, LayoutAnimation, StyleSheet, View, ScrollView, Dimensions, Image,Animated } from "react-native";
import { Avatar, Button, Card, Chip, Divider, Drawer, FAB, List, Menu, Portal, Searchbar, Surface, Text, useTheme } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import { useCallback, useEffect, useState } from "react";
import { useSettings } from "../hooks/UseSettings";
import Ionicons from "@expo/vector-icons/Ionicons";
import CoffeeCard from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackNav";
import { UseDatabase } from "../hooks/UseDatabase";
import { DbBrand, DbHumidor, DbLibrary, IBrand, IHumidor } from "../constants";
import { SelectFromTable } from "../Mocks/databases_mocks";
import { checkIsBrand, checkIsCigar, checkIsHumidor, checkIsLibrary } from "../services/guards";
// import Animated, { useSharedValue } from "react-native-reanimated";
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
    const [humidorList, setHumidorList] = useState<Array<DbHumidor>>([])
    const [selectedHumidorId, setSelectedHumidorId] = useState<number>()
    const [brandList, setBrandList] = useState<Array<DbBrand>>([])
    const [library, setLibrary] = useState<Array<DbLibrary>>([])
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const database = UseDatabase()
    const settings = useSettings()

    const handleExpanded = () => {
        const LAYOUT = LayoutAnimation.create(300, "easeInEaseOut", "opacity");
        LayoutAnimation.configureNext(LAYOUT)
        setExpanded(!expanded)
    }
    const _handleLongPress = (event: GestureResponderEvent) => {
        const { nativeEvent } = event;

        setVisible(true);
    };
    const theme = useTheme()
    async function hello() {
        console.log("StartStartStartStartStartStartStartStart")
        await database.async_select_from_table("Humidor").then(async (list_h) => {
            console.log("humidor")
            if (checkIsHumidor(list_h)) {
                setHumidorList(list_h)
                if (typeof list_h[0].id != "undefined") {
                    setSelectedHumidorId(list_h[0].id)
                }
                return await database.async_select_from_table("Library", list_h[0].id, "humidor_id")
            }
            console.log("humidor")
        }).then(async (e) => {
            if (typeof e != "undefined") {
                if (checkIsLibrary(e)) {
                    var cigar_ids: Array<number> = []
                    e.map((v) => {
                        if (!cigar_ids.includes(v.cigar_id)) {
                            if (typeof v.cigar_id == "number" && !Number.isNaN(v.cigar_id)) {
                                cigar_ids.push(v.cigar_id)

                            }
                        }
                    })
                    return await database.async_select_from_table("Cigar", cigar_ids, "id")
                }
            }

        }).then(async (list_c) => {
            if (typeof list_c != "undefined") {
                if (checkIsCigar(list_c)) {
                    var brand_ids: Array<number> = []
                    list_c.map((v) => {
                        if (!brand_ids.includes(v.brand_id)) {
                            if (typeof v.brand_id == "number" && !Number.isNaN(v.brand_id)) {
                                brand_ids.push(v.brand_id)

                            }
                        }
                    })
                    return await database.async_select_from_table("Brand", brand_ids, "id")
                }
            }
        }).then((list_b) => {
            // console.log(h)
            if (typeof list_b != "undefined") {
                if (checkIsBrand(list_b)) {
                    setBrandList(list_b)
                }
            }
            // return await database.async_select_from_table("Library", list_h[0].id, "humidor_id")

        })
    }
    useEffect(() => {
        // database.select_from_table("Brand", setBrand)
        // database.select_from_table("Library", database.handleLibraryList)
        // database.select_from_table("Cigar", database.handleCigarList)
        // database.select_from_table("Humidor", database.handleHumidorList)

        console.log(hello())


    }, [])

    const animated_card = () => {
        // const Scale=useSharedValue(1)

        return (
            <Animated.View style={{ width: SCREENWIDTH * 0.65 + 20, alignItems: "center", overflow: "visible" }}>
                <CoffeeCard />
            </Animated.View>
        )
    }

    return (
        <View style={{ height: "100%", width: "100%", overflow: "visible" }}>
            <ScreenWrapper >
                <Searchbar
                    placeholder="Search"
                    onChangeText={(query: string) => setFirstQuery(query)}
                    value={firstQuery}
                    style={{ marginVertical: 10, marginHorizontal: 25, marginBottom: 20 }}
                />
                <ScrollView horizontal style={{ paddingHorizontal: 25, marginBottom: 20 }} showsHorizontalScrollIndicator={false}>
                    <Surface elevation={0} style={{ flexDirection: "row", columnGap: 20, rowGap: 20, marginBottom: 10 }} >
                        {humidorList.map((v) => {
                            return (
                                <Chip style={{ borderRadius: 25 }} showSelectedOverlay onPress={() => { setSelectedHumidorId(v.id) }} selected={selectedHumidorId == v.id} ><Text style={{ paddingVertical: 7, paddingHorizontal: 5 }}> {v.name}</Text></Chip>
                            )
                        })}



                    </Surface>
                </ScrollView>

                <ScrollView
                    pagingEnabled
                    horizontal
                    style={{ width: SCREENWIDTH, overflow: "visible", flex: 1, }}
                    contentContainerStyle={{ overflow: "visible", paddingTop: 50, paddingLeft: (SCREENWIDTH - 20 - (SCREENWIDTH * 0.65)) / 2, paddingRight: (SCREENWIDTH - 20 - (SCREENWIDTH * 0.65)), paddingBottom: 25 }}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={SCREENWIDTH - 150}

                >

                    {brandList?.map((value, index) => {
                        return (
                            <>

                               {animated_card()}
                               {animated_card()}
                               {animated_card()}
                               {animated_card()}
                               {animated_card()}
                               {animated_card()}


                            </>
                        )
                    })}


                </ScrollView>

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
                    { icon: 'dresser-outline', label: 'Add New Humidor', onPress: () => { navigation.navigate("AddHumidor"); console.log("hahahahahah") } },
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
                        // console.log(item)
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