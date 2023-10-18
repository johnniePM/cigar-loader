import { View, ViewProps, ViewStyle, StyleProp , TextStyle,  } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import React, { useState, ReactNode } from "react";
import { BlurView } from "expo-blur";
import { IAutoComplete } from "../constants";



const Autocomplete = ({
  value,
  setValue,
  label,
  data,
  containerStyle,
  icon = 'bike',
  style = {},
  menuStyle = {},
  right ,
  left ,
}: IAutoComplete) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<string>>([]);

  const filterData = (text:string):Array<string> => {
    return data.filter(
      (val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
    );
  };
  React.useEffect(()=>{
      console.log(menuVisible)

  },[value])
  return (
    <View style={[containerStyle]}>
      <TextInput
      mode="outlined"
      theme={{
        roundness: 25,
      }}
        onFocus={()=>{value.length>0?setMenuVisible(true):null}}
        onBlur={() => setMenuVisible(false)}
        label={label}
        right={right}
        left={left}
        style={style}
        onChangeText={(text:string) => {
          setValue(text);

          if (text && text.length > 0) {
            setFilteredData(filterData(text));
            setMenuVisible(true);
          } else if (text.length == 0) {
            setFilteredData([]);
            console.log("hahahahahaha")
            setMenuVisible(!menuVisible)
          }
          setValue(text);
        }}
        value={value}
      />
      {menuVisible  && (
        <BlurView
          style={{
            position:"absolute",
            borderWidth: 1,
            flexDirection: 'column',
            borderColor: 'grey',
            bottom:56,
            width:"90%",
            zIndex:10,
            backgroundColor:"#d4a57433",
            alignSelf:"center"
            
          }}
          intensity={50}
        >
          {filteredData.map((datum, i) => {
            if (i<3){

                return(
                    
                    <Menu.Item
                    key={i}
                    style={[{ width: '100%' },  menuStyle]}
                    leadingIcon={icon}
                    onPress={() => {
                        setValue(datum);
                        setMenuVisible(false);
                    }}
                    title={datum}
                    />
                    )}
                })}
        </BlurView>
      )}
    </View>
  );
};

export default Autocomplete