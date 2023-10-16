import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";



import { StackNavigationOptions } from "@react-navigation/stack";
import { Button, Text, useTheme } from "react-native-paper";
export default () => {
  const navigation = useNavigation();
  const { colors,   fonts} = useTheme();

  const menu: StackNavigationOptions = {
    headerStyle: { elevation: 0 },
    headerTitleAlign: "left",
    headerTitleContainerStyle: { marginLeft: 8},
    headerLeftContainerStyle: { paddingLeft: 8},
    headerRightContainerStyle: { paddingRight: 8},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }) => <Text >{children}</Text>,
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={require('../assets/menu.png') }   />
      </Button>
    ),

  };

  const options = {
    stack: menu,

  };

  return options;
};
