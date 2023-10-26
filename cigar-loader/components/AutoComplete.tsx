import { View, ViewProps, ViewStyle, StyleProp , TextStyle, Keyboard, NativeSyntheticEvent, TextInputFocusEventData , LayoutChangeEvent, TouchableWithoutFeedback} from "react-native";
import { Avatar, Button, Menu, TextInput } from "react-native-paper";
import React, { useState, ReactNode, useRef,createRef  } from "react";
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
  Callback,
  accessor=false
}: IAutoComplete) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Array<any>>([]);
  const blurRef=useRef<{x1:number, x2:number, y1:number, y2:number}>()
  const filterData = (text:string):Array<string> => {
    if (typeof accessor =="string"){
      return data.filter(
        (val) => val[accessor]?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
      );
    
    }
    return data.filter(
      (val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
    );
  };
  React.useEffect(()=>{
    console.log("data")
    console.log(data)
    console.log("data")
    },[])
  return (
    <View style={[containerStyle]}>
      <TextInput
      mode="outlined"
      theme={{
        roundness: 25,
      }}
        onFocus={()=>{value.length>0?setMenuVisible(true):null}}
        // onBlur={()=>{}}
        //   console.log(e.currentTarget)
        //   !Keyboard.isVisible()&& setMenuVisible(false)
        
        // }}
        // onEndEditing={()=>{setMenuVisible(false)}}
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
            setMenuVisible(!menuVisible)
          }
          setValue(text);
        }}
        value={value}
      />
      {menuVisible  && filteredData.length>0&& (
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
          <Button  compact  onPress={()=>{setMenuVisible(false)}} style={{alignSelf:"flex-end", marginTop:5}} icon={"close"}>
          <></>
          </Button>
          {filteredData.map((datum, i) => {
            if (i<3){

                return(
                    
                    <Menu.Item
                    key={i}
                    style={[{ width: '100%' },  menuStyle]}
                    leadingIcon={icon}
                    onPress={() => {
                        typeof accessor=="string"?setValue(datum[accessor]):setValue(datum)
                        setMenuVisible(false);
                        Callback?Callback(datum):null
                    }}
                    title={accessor==false? datum: accessor!=true&& datum[accessor]}
                    />
                    )}
                })}

        </BlurView>
      )}

    </View>
  );
};

export default Autocomplete