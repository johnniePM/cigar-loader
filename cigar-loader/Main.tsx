import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, useTheme  } from 'react-native-paper';
import Item from './Item';
import Menu from './navigation/Menu';
import { SettingsProvider } from './hooks/UseSettings';


export default function Main() {
    const theme=useTheme()
    // console.log(theme.mode="exact")
    console.log(theme.dark)
    return (
        <PaperProvider>
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
