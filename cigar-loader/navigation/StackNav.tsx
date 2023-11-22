import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StackHeaderOptions from '../hooks/useScreenOptions';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Home from '../screens/Home';
import Cigar from '../screens/Cigar';
import History from '../screens/History';
import Library from '../screens/Library';
import AddCigar from '../screens/AddCigar';
import Settings from '../screens/Settings';
import AddHumidor from '../screens/AddHumidor';
import { DbBrand, IHomeBrand } from '../constants';
import Animated from 'react-native-reanimated';
import AddHistory from '../screens/AddHistory';

export type RootStackParamList = {
  Home: any;
  Cigar: any;
  AddCigar: any;
  History: any;
  Library: { "info": IHomeBrand, "brand": DbBrand, index: number };
  Settings: any;
  AddHumidor: any;
  AddHistory: any;
};
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;
const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();
  const screenOptions = StackHeaderOptions();


  return (
    <Stack.Navigator screenOptions={screenOptions.stack} >
      <Stack.Screen
        name="Home"
        component={Home}
      // options={{title: 'Hem',}}
      />
      <Stack.Screen
        name="Cigar"
        component={Cigar}
      // options={{title: 'Hem',}}
      />
      <Stack.Screen
        name="AddCigar"
        component={AddCigar}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Library"
        component={Library}
        options={{
          headerShown: false
        }}

      // options={{title: 'Hem',}}
      />

      <Stack.Screen
        name="History"
        component={History}
        options={{}}
      // options={{title: 'Hem',}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{}}
      // options={{title: 'Hem',}}
      />
      <Stack.Screen
        name="AddHumidor"
        component={AddHumidor}
        options={{ headerShown: false }}
      // options={{title: 'Hem',}}
      />
      <Stack.Screen
        name="AddHistory"
        component={AddHistory}
        options={{ headerShown: false }}
      // options={{title: 'Hem',}}
      />

    </Stack.Navigator>
  );
};
