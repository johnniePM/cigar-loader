import React from "react"
import { Searchbar } from "react-native-paper"
import Animated from "react-native-reanimated"


interface ICustomView {
    firstQuery: string,
    setFirstQuery: React.Dispatch<React.SetStateAction<string>>,
    onPress?():any
}

const CustomView = React.forwardRef((props: ICustomView, ref) => {
    return (
        <Searchbar
            placeholder="Search"
            onChangeText={(query: string) => props.setFirstQuery(query)}
            value={props.firstQuery}
            style={{ marginVertical: 10, marginHorizontal: 25, marginBottom: 20 , }+ typeof props.onPress==undefined?{height:400}:{}}
            onPressOut={()=>{typeof props.onPress!="undefined"?props.onPress():null}}
        />
    )
})


const AnimatedSearchbar = Animated.createAnimatedComponent(CustomView)


export default AnimatedSearchbar