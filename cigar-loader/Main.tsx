import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider, useTheme  } from 'react-native-paper';
import Item from './Item';
import Menu from './navigation/Menu';


export default function Main() {
    const theme=useTheme()
    // console.log(theme.mode="exact")
    console.log(theme.dark)
    return (
        <PaperProvider>


            <Menu/>
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
