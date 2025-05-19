import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";


import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { StackNavigationOptions } from "@react-navigation/stack";
import { Button, Text, useTheme } from "react-native-paper";
export default () => {
  const navigation = useNavigation();
  const { colors,   fonts} = useTheme();

  const menu: NativeStackNavigationOptions = {
    // headerStyle: { elevation: 0 },
    headerTitleAlign: "left",
    // headerBackTitle:"dsa",
    headerBackButtonMenuEnabled:false,
    navigationBarColor:"#ffffff",
    // headerTitleContainerStyle: { marginLeft: 8},
    // headerLeftContainerStyle: { paddingLeft: 8},
    // headerRightContainerStyle: { paddingRight: 8},
    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }) => <Text >{children}</Text>,
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={require('../assets/menu.png') }   />
      </Button>
    ),
    headerBackVisible:false,
    headerTintColor:"#ffffff",
    
    headerBackground() {
      return(<View style={{backgroundColor:colors.surface, width:"100%", height:"100%"}}></View>)
    },


  };

  const options = {
    stack: menu,

  };

  return options;
};
