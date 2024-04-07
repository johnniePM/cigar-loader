import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useTheme, Surface, Text, TouchableRipple } from "react-native-paper"

export default function  HistoryCigar(){
    const theme = useTheme()

    return(
        <ScrollView>
            <TouchableRipple   >
<Text>Hello</Text>
            </TouchableRipple>
        </ScrollView>
    )
}