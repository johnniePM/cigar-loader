import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/core";
import {
    InitialState,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { Alert, Animated, Dimensions, Linking, PixelRatio, Platform, ScrollView, ScrollViewProps, StyleSheet, View, I18nManager } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Avatar, Caption, MD2Colors, MD3Colors, Drawer as PaperDrawer, Paragraph, Title } from 'react-native-paper';
import StackNav, { RootStackParamList } from './StackNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCES_KEY = 'APP_PREFERENCES';

import {
    Provider as PaperProvider,
    MD3DarkTheme,
    MD3LightTheme,
    MD2DarkTheme,
    MD2LightTheme,
    MD2Theme,
    MD3Theme,
    useTheme,
    adaptNavigationTheme,
} from 'react-native-paper';

interface ScreenType {
    name: "Home"|"History"|"Settings";
    to: "Home"|"History"|"Settings";
    icon: keyof typeof Ionicons.glyphMap;
    icon_outline: keyof typeof Ionicons.glyphMap;
}

const Drawer = createDrawerNavigator();
const isAndroid = Platform.OS === "android";
import { useDrawerStatus } from "@react-navigation/drawer";
import { Button, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

/* drawer menu screens navigation */
const ScreensStack = () => {
    const useIsDrawerOpen = () => {
        if (useDrawerStatus() == "open") {
            return true;
        } else {
            return false;
        }
    };
    const isDrawerOpen = useIsDrawerOpen();
    const animation = useRef(new Animated.Value(0)).current;

    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.88],
    });

    const borderRadius = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = {
        borderRadius: borderRadius,
        transform: [{ scale: scale }],
    };

    useEffect(() => {
        Animated.timing(animation, {
            duration: 200,
            useNativeDriver: true,
            toValue: isDrawerOpen ? 1 : 0,
        }).start();
  
    }, [isDrawerOpen, animation]);

    return (
        <Animated.View
            style={StyleSheet.flatten([
                animatedStyle,
                {
                    flex: 1,
                    overflow: "hidden",
                    borderColor: "#555555",
                    borderWidth: isDrawerOpen ? 1 : 0,
                },
            ])}
        >

            {/*  */}
            <StackNav />
        </Animated.View>
    );
};


const DrawerContent = (props:any) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [active, setActive] = useState<"History" | "Home"|"Settings">("Home")

    const handleNavigation = useCallback(
        (to: "History" | "Home"|"Settings") => {
            setActive(to);
            navigation.navigate(to);
        },
        [navigation, setActive]

    );
    const { colors } = useTheme();

 



    // screen list for Drawer menu
    const screens: ScreenType[] = [
        { name: "Home", to: "Home", icon_outline: "home-outline", icon: "home" },
        { name: "History", to: "History", icon_outline: "book-outline", icon: "book" },
        { name: "Settings", to: "Settings", icon_outline: "settings-outline", icon: "settings" },
        // { name: "Produkter", to: 'Produkter', icon: assets.home },

    ];


    return (
        <DrawerContentScrollView
            {...props}
            scrollEnabled
            removeClippedSubviews
            renderToHardwareTextureAndroid
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{
                backgroundColor: colors.surface,
            }}
        // style={{}}
        >

            <View
                style={
                    styles.drawerContent
                }
            >
                <View style={styles.userInfoSection}>
                    <Avatar.Image size={75} source={require("../assets/AppIcon.png")} />

                    <Title style={styles.title}>Cigar Loader</Title>

                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                155
                            </Paragraph>
                            <Caption style={styles.caption}>Total cigar count</Caption>
                        </View>
                        
                    </View>
                </View>

                <PaperDrawer.Section style={styles.drawerSection} title="">
                {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return(

              <PaperDrawer.Item
                  label={screen.name}
                  icon={()=>{return(<Ionicons name={isActive?screen.icon:screen.icon_outline} size={20} />)}}
                  active={isActive}
                  onPress={() => handleNavigation(screen.to)}
              />
          )
          })}

                </PaperDrawer.Section>



            </View>
        </DrawerContentScrollView>
    );
};


export default function Menu() {


    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState<
        InitialState | undefined>();
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [collapsed, setCollapsed] = React.useState(false);

    const themeMode = isDarkMode ? 'dark' : 'light';
    const the_theme=useTheme()
    const theme = {

            light: MD3LightTheme,
            dark: MD3DarkTheme,
    }[themeMode];

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                const state = JSON.parse(savedStateString || '');

                setInitialState(state);
            } catch (e) {
                // ignore error
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    React.useEffect(() => {
        const restorePrefs = async () => {
            try {
                const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
                const preferences = JSON.parse(prefString || '');

                if (preferences) {
                    setIsDarkMode(preferences.theme === 'dark');

                }
            } catch (e) {
                // ignore error
            }
        };

        restorePrefs();
    }, []);

    React.useEffect(() => {
        const savePrefs = async () => {
            try {
                await AsyncStorage.setItem(
                    PREFERENCES_KEY,
                    JSON.stringify({
                        theme: themeMode,
                    })
                );
            } catch (e) {
                // ignore error
            }


        };

        savePrefs();
    }, [themeMode]);

    React.useEffect(() => {
        const restoreState = async () => {
          try {
            const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
            const state = JSON.parse(savedStateString || '');
    
            setInitialState(state);
          } catch (e) {
            // ignore error
          } finally {
            setIsReady(true);
          }
        };
    
        if (!isReady) {
          restoreState();
        }
      }, [isReady]);

    const { LightTheme, DarkTheme } = adaptNavigationTheme({
        reactNavigationLight: NavigationDefaultTheme,
        reactNavigationDark: NavigationDarkTheme,
    });

    const CombinedDefaultTheme = {
        // ...LightTheme,
        ...the_theme as unknown as Theme,
        
    };

    const CombinedDarkTheme = {
        ...DarkTheme,
        ...MD3DarkTheme,
        colors: {
            ...DarkTheme.colors,
            ...the_theme.colors,
        },
    };

    const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
    

    return (
        <NavigationContainer initialState={initialState} onStateChange={(state)=>{
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }} theme={combinedTheme} >
            <Drawer.Navigator initialRouteName="Home"
            
                screenOptions={{
                    drawerType: "slide",
                    overlayColor: "transparent",
                    swipeEnabled: true,

                    // sceneContainerStyle: { backgroundColor: "transparent" },
                    drawerStyle: {
                        flex: 1,
                        width: "60%",
                        borderRightWidth: 0,
                        backgroundColor: "transparent",
                    },
                    headerTransparent: true,
                    headerShown: false,
                }}
                // drawerType="slide"
                // overlayColor="transparent"
                // sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="Screens" component={ScreensStack} />

            </Drawer.Navigator>
            <StatusBar style={!theme.isV3 || theme.dark ? 'light' : 'dark'} />

        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingBottom:20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});