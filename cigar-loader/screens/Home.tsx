import { GestureResponderEvent, LayoutAnimation, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, Drawer, FAB, List, Menu, Portal, Text, useTheme } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import { useCallback, useState } from "react";
import { useSettings } from "../hooks/UseSettings";
import Ionicons from "@expo/vector-icons/Ionicons";

type ContextualMenuCoord = { x: number; y: number };


export default function Home() {
    const [visible, setVisible] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [contextualMenuCoord, setContextualMenuCoor] = useState<ContextualMenuCoord>({ x: 0, y: 0 })
    const [open, setOpen] = useState<boolean>(false);

    const settings = useSettings()
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    const handleExpanded=()=>{
        const LAYOUT = LayoutAnimation.create(300, "easeInEaseOut", "opacity");
        LayoutAnimation.configureNext(LAYOUT)
        setExpanded(!expanded)
    }
    const _handleLongPress = (event: GestureResponderEvent) => {
        const { nativeEvent } = event;
        setContextualMenuCoor({
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        });
        setVisible(true);
    };
    console.log(open)
    const theme = useTheme()
    return (
        <View style={{ height: "100%" }}>
            <ScreenWrapper >
                <Card onPress={() => { }} style={{ marginBottom: 10 }} mode="contained">
                    <Card.Cover resizeMode="contain" style={{ backgroundColor: theme.colors.outlineVariant }} source={require('../assets/images/Cigar_Humidor1.png')} />
                    <Card.Title
                        title="Living Room Humidor"
                        titleVariant="headlineSmall"
                    />
                    <Card.Content>
                        <List.Item

                            title="Cigars in humider"
                            description={"22/100"}
                            left={(props) => <List.Icon {...props} icon="cigar" />}
                        />
                    </Card.Content>

                </Card>

                <Card onPress={() => { }} style={{ marginBottom: 10 }} mode="contained">
                    <Card.Cover resizeMode="contain" style={{ backgroundColor: theme.colors.outlineVariant }} source={require('../assets/images/Cigar_Humidor1.png')} />
                    <Card.Title
                        title="Living Room Humidor"
                        titleVariant="headlineSmall"
                    />
                    <Card.Content>
                        <List.Item

                            title="Cigars in humider"
                            description={"22/100"}
                            left={(props) => <List.Icon {...props} icon="cigar" />}
                        />
                    </Card.Content>

                </Card>
                {settings.ShowQuickStats &&
                    <Card mode="contained" style={{ marginBottom: 20 }} onPress={()=>handleExpanded()}>
                        <Card.Title
                            title="Quick Statistics"
                            left={(props) => <Avatar.Icon {...props} icon="chart-bubble" />

                            }
                            right={(props) => <Ionicons size={50} color={theme.colors.backdrop} name={!expanded?"ios-arrow-down-circle-outline":"ios-arrow-up-circle-outline"} />}
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
              open={open}
              label={!open?settings.QuickAdd:""}
              icon={open ? 'minus' : 'plus'}
              actions={[
                
                { icon: 'cigar', label: 'Add new cigar', onPress: () => {} },
                { icon: 'dresser-outline', label: 'Add New Humidor', onPress: () => {} },
                {
                  icon: 'content-save-edit',
                  label: 'Report Smoking a Cigar',
                  onPress: () => {},
                  size: theme.isV3 ? 'small' : 'medium',
                },
              ]}
              onStateChange={({ open }: { open: boolean }) => {!open?setOpen(false):null}}
              onLongPress={()=>setOpen(!open)}
              onPress={() => {
                if (!open) {
                    console.log("dsadsadas")
                }
              }}
              visible={!visible}
            />

            {/* <FAB icon="plus" size="medium" onPress={() => { }} onLongPress={_handleLongPress} visible style={styles.fab} /> */}
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={contextualMenuCoord}
            >
                <Menu.Item onPress={() => { }} title="Add Cigar" />
                <Menu.Item onPress={() => { }} title="Add Humidor" />
                <Menu.Item onPress={() => { }} title="Smoked Cigar" />
            </Menu>
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