import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { DatabaseProvider } from './hooks/UseDatabase';
import { Appearance, useColorScheme } from 'react-native';
import Main from './Main';

export default function App() {
  const theme = useColorScheme()
  const appe = Appearance
  return (
    <DatabaseProvider>
      <StatusBar style="auto" backgroundColor='#00000000' translucent={false}  />
      {/* <SafeAreaView> */}
        <Main />
      {/* </SafeAreaView> */}
    </DatabaseProvider>
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
