import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, useTheme ,  MD3LightTheme as DefaultTheme } from 'react-native-paper';
import Item from './Item';
import Menu from './navigation/Menu';
import { SettingsProvider } from './hooks/UseSettings';
import { MD3Colors, ThemeProp } from 'react-native-paper/lib/typescript/types';


export default function Main() {
    const theme={
        ...DefaultTheme,
        
            "colors": {
              "primary": "rgb(137, 82, 0)",
              "onPrimary": "rgb(255, 255, 255)",
              "primaryContainer": "rgb(255, 220, 188)",
              "onPrimaryContainer": "rgb(44, 23, 0)",
              "secondary": "rgb(114, 90, 66)",
              "onSecondary": "rgb(255, 255, 255)",
              "secondaryContainer": "rgb(254, 221, 190)",
              "onSecondaryContainer": "rgb(41, 24, 5)",
              "tertiary": "rgb(86, 99, 59)",
              "onTertiary": "rgb(255, 255, 255)",
              "tertiaryContainer": "rgb(218, 233, 182)",
              "onTertiaryContainer": "rgb(21, 31, 1)",
              "error": "rgb(186, 26, 26)",
              "onError": "rgb(255, 255, 255)",
              "errorContainer": "rgb(255, 218, 214)",
              "onErrorContainer": "rgb(65, 0, 2)",
              "background": "rgb(255, 251, 255)",
              "onBackground": "rgb(31, 27, 22)",
              "surface": "rgb(255, 251, 255)",
              "onSurface": "rgb(31, 27, 22)",
              "surfaceVariant": "rgb(241, 223, 208)",
              "onSurfaceVariant": "rgb(80, 69, 58)",
              "outline": "rgb(130, 117, 104)",
              "outlineVariant": "rgb(213, 196, 181)",
              "shadow": "rgb(0, 0, 0)",
              "scrim": "rgb(0, 0, 0)",
              "inverseSurface": "rgb(53, 47, 43)",
              "inverseOnSurface": "rgb(250, 239, 231)",
              "inversePrimary": "rgb(255, 184, 106)",
              "elevation": {
                "level0": "transparent",
                "level1": "rgb(249, 243, 242)",
                "level2": "rgb(246, 238, 235)",
                "level3": "rgb(242, 232, 227)",
                "level4": "rgb(241, 231, 224)",
                "level5": "rgb(239, 227, 219)"
              },
              "surfaceDisabled": "rgba(31, 27, 22, 0.12)",
              "onSurfaceDisabled": "rgba(31, 27, 22, 0.38)",
              "backdrop": "rgba(57, 47, 36, 0.4)"
            }
          
    }
    return (
        <PaperProvider theme={theme}>
            <SettingsProvider>


            <Menu/>
            </SettingsProvider>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
