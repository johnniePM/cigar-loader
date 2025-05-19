import { useState } from "react";
import { View } from "react-native";
import AnimatedSearchbar from "../components/CustomSearch"
import ScreenWrapper from "../components/ScreenWrapper";



const SearchDetail = () => {
    const [firstQuery, setFirstQuery] = useState<string>("");
    return (
        <View style={{ height: "100%", width: "100%", overflow: "visible" }}>
            <ScreenWrapper >
                <View style={{height:400}}></View>
                <AnimatedSearchbar
                    setFirstQuery={setFirstQuery}
                    firstQuery={firstQuery}
                    style={{ marginVertical: 10, marginHorizontal: 25, marginBottom: 20 }}
                    sharedTransitionTag="tag"
                />
            </ScreenWrapper>
        </View>

    )
}

export default SearchDetail