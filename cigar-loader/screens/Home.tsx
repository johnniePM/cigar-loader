import { GestureResponderEvent, LayoutAnimation, StyleSheet, View, ScrollView, Dimensions } from "react-native";
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
    const [humidor, setHumidor] = useState<Array<DbHumidor>>([])
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
        await database.select_from_table("Humidor", setHumidor).then(()=>{
            console.log("humidor")
            console.log(humidor)
            console.log("humidor")
        })
    }
    useEffect(() => {
        // database.select_from_table("Brand", setBrand)
        // database.select_from_table("Library", database.handleLibraryList)
        // database.select_from_table("Cigar", database.handleCigarList)
        // database.select_from_table("Humidor", database.handleHumidorList)
        console.log(SelectFromTable("Library", "id", ["dfs", "rewrew",31321, 432, "432432dsa"]))

        console.log(SelectFromTable("Library", "id", "3232"))
        console.log(hello())
        

    }, [])


    return (
        <View style={{ height: "100%", width: "100%", overflow: "visible" }}>
            <ScreenWrapper >
                <Searchbar
                    placeholder="Search"
                    onChangeText={(query: string) => setFirstQuery(query)}
                    value={firstQuery}
                    style={{marginVertical:10,marginHorizontal:25, marginBottom:20 }}
                />
                <ScrollView horizontal style={{paddingHorizontal:25, marginBottom:20}} showsHorizontalScrollIndicator={false}>
                    <Surface elevation={0} style={{ flexDirection: "row", columnGap: 20, rowGap: 20, marginBottom: 10 }} >
                        <Chip style={{  borderRadius: 25 }} showSelectedOverlay onPress={()=>{}} selected ><Text style={{ paddingVertical: 7, paddingHorizontal: 5}}> Living Room</Text></Chip>
                        <Chip style={{  borderRadius: 25 }} showSelectedOverlay onPress={()=>{}}  ><Text style={{ paddingVertical: 7, paddingHorizontal: 5}}> Living Room</Text></Chip>
                        <Chip style={{  borderRadius: 25 }} showSelectedOverlay onPress={()=>{}}  ><Text style={{ paddingVertical: 7, paddingHorizontal: 5}}> Living Room</Text></Chip>
                        <Chip style={{  borderRadius: 25 }} showSelectedOverlay onPress={()=>{}}  ><Text style={{ paddingVertical: 7, paddingHorizontal: 5}}> Living Room</Text></Chip>
                        <Chip style={{  borderRadius: 25 }} showSelectedOverlay onPress={()=>{}}  ><Text style={{ paddingVertical: 7, paddingHorizontal: 5}}> Living Room</Text></Chip>
                        <Chip style={{  borderRadius: 25 }} showSelectedOverlay onPress={()=>{}}  ><Text style={{ paddingVertical: 7, paddingHorizontal: 5}}> Living Room</Text></Chip>
                        
                        
                        
                        
                    </Surface>
                </ScrollView>
                
                <ScrollView
                    pagingEnabled
                    horizontal
                    style={{ width: SCREENWIDTH, overflow: "visible" }}
                    contentContainerStyle={{ overflow: "visible" }}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ELEMENTWIDTH + SPACING / 3}

                >

                    {database.HumidorList?.map((value, index) => {
                        return (
                            <>
                            <Card onPress={() => { }} style={{ marginBottom: 10, overflow: "visible", width: ELEMENTWIDTH, borderRadius: 60, marginLeft: index != 0 ? SPACING / 3 : SPACING - 16 }} mode="contained">
                                <Card.Cover resizeMode="contain" style={{ backgroundColor: theme.colors.outlineVariant, overflow: "visible", }} source={require('../assets/images/Cigar_Humidor2.png')} />
                                <Card.Title

                                    title={value.name}
                                    titleVariant="headlineSmall"
                                />
                                <Card.Content>
                                    <List.Item

                                        title="Cigars in humider"
                                        description={"22/" + value.total_capacity}
                                        left={(props) => <List.Icon {...props} icon="cigar" />}
                                    />
                                </Card.Content>

                            </Card>
                            <Card onPress={() => { }} style={{ marginBottom: 10, overflow: "visible", width: ELEMENTWIDTH, borderRadius: 60, marginLeft: index != 0 ? SPACING / 3 : SPACING - 16 }} mode="contained">
                                <Card.Cover resizeMode="contain" style={{ backgroundColor: theme.colors.outlineVariant, overflow: "visible", }} source={require('../assets/images/Cigar_Humidor2.png')} />
                                <Card.Title

                                    title={value.name}
                                    titleVariant="headlineSmall"
                                />
                                <Card.Content>
                                    <List.Item

                                        title="Cigars in humider"
                                        description={"22/" + value.total_capacity}
                                        left={(props) => <List.Icon {...props} icon="cigar" />}
                                    />
                                </Card.Content>

                            </Card>
                            <Card onPress={() => { }} style={{ marginBottom: 10, overflow: "visible", width: ELEMENTWIDTH, borderRadius: 60, marginLeft: index != 0 ? SPACING / 3 : SPACING - 16 }} mode="contained">
                                <Card.Cover resizeMode="contain" style={{ backgroundColor: theme.colors.outlineVariant, overflow: "visible", }} source={require('../assets/images/Cigar_Humidor2.png')} />
                                <Card.Title

                                    title={value.name}
                                    titleVariant="headlineSmall"
                                />
                                <Card.Content>
                                    <List.Item

                                        title="Cigars in humider"
                                        description={"22/" + value.total_capacity}
                                        left={(props) => <List.Icon {...props} icon="cigar" />}
                                    />
                                </Card.Content>

                            </Card>
                            </>
                        )
                    })}

                    <View style={{ width: SPACING }} />

                </ScrollView>

                {settings.ShowQuickStats &&
                    <Card mode="contained" style={{ marginBottom: 20 }} onPress={() => handleExpanded()}>
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