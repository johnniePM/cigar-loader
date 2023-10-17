import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StackHeaderOptions from '../hooks/useScreenOptions';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Home from '../screens/Home';
import Cigar from '../screens/Cigar';
import History from '../screens/History';
import Library from '../screens/Library';
import AddCigar from '../screens/AddCigar';
import Settings from '../screens/Settings';

export type RootStackParamList = {
  Home:any;
  Cigar:any;
  AddCigar:any;
  History:any;
  Library:any;
  Settings:any
};
const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  const navigation = useNavigation();
  const { colors,   fonts} = useTheme();
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
        // options={{title: 'Hem',}}
      />
      
      <Stack.Screen
        name="Library"
        component={Library}
        options={{ headerShown: false }}
        // options={{title: 'Hem',}}
      />
    
      <Stack.Screen
        name="History"
        component={History}
        options={{  }}
        // options={{title: 'Hem',}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{  }}
        // options={{title: 'Hem',}}
      />
    
    </Stack.Navigator>
  );
};
