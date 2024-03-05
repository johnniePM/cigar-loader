
import { Camera, CameraType } from "expo-camera";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
} from "react-native";




// import moment from "moment";
// import Button from "./Button";
import { Surface, Text, useTheme } from "react-native-paper";

const LAYOUT = LayoutAnimation.create(200, "easeInEaseOut", "opacity");
const LAYOUT2 = LayoutAnimation.create(300, "easeInEaseOut", "scaleY");


// const Custom: React.FC = () => {
//   const [items, setItems] = useState({});
//   const { notifications, setNotifications } = useData();
//   const { icons, colors, gradients, sizes } = useTheme();
//   const [selected, setSelected] = useState<{ key: number; i: number }>();
//   const {api, link_list, website}=useAxios()
//   const theme = useTheme()



//   const onDismiss = (notis:IOneNotis, date) => {
//     api.post(website+ link_list.delete_notifications, {"notis":notis}).then((e)=>{
//       console.log(e.status)

//       const wholeSet={...notifications}
//       const missingSet={...notifications}
//       const the_set=missingSet[date].filter((item) => {
//         return(
//         item !== notis
//         )
//       })
//       wholeSet[date]=the_set
//       LayoutAnimation.configureNext(LAYOUT2)
//       setSelected(null)
//       setNotifications(wholeSet);
//     }).catch((e)=>{
//       console.log(e)
//     })
//   };



  
  
//   const handlePress = (key, i) => {
//     if (selected != null) {
//       if (selected.i == i && selected.key == key) {
//         setSelected({ key: -1, i: -1 });
//       } else {
//         setSelected({ key: key, i: i });
//       }
//     } else {
//       setSelected({ key: key, i: i });
//     }
//     LayoutAnimation.configureNext(LAYOUT);
//   };
//   return (
//     <ScrollView scrollEnabled>
//       <Surface style={{margin:8}} onStartShouldSetResponder={() => true} >
//         <Text variant="bodyLarge" style={{marginBottom:20}} >
//           Notiser
//         </Text>
//         {Object.keys(notifications).map((date, key) => {
//           return (
//             <Surface style={{flexDirection:"row", flex:1}}>
//               <Surface  style={{flexDirection:"row", flex:1}} >
//                 <Surface  style={{alignContent:"center", justifyContent:"flex-start"}}>
//                   <Text style={{margin:0, padding:0, color:}}  margin={0} padding={0} primary>
//                     {moment(date).format("D")}
//                   </Text>
//                   <Text gray>{moment(date).format("MMM")}</Text>
//                 </Block>
//                 <Block>
//                   <Block width={16} height={16} flex={0} primary radius={8} />
//                   <Block
//                     flex={0}
//                     height={"100%"}
//                     marginLeft={7}
//                     style={{
//                       borderStyle: "dashed",
//                       borderWidth: 1,
//                       borderRadius: 0.5,
//                       borderColor: colors.gray,
//                       width: 2,
//                     }}
//                     radius={5}
//                   />
//                 </Block>
//               </Block>
//               <Block flex={3}>
//                 {notifications[date].map((e, i) => {
//                   const val: { key: number; i: number } = { key: key, i: i };
//                   return (
//                     <Block
//                       marginBottom={
//                         notifications[date].length - 1 == i ? sizes.md : 0
//                       }
//                     >
//                       <Button
//                         onPress={() => {
//                           handlePress(key, i);
//                         }}
//                         padding={sizes.padding}
//                         radius={20}
//                         shadow
//                         white
//                       >
//                         <Block width={"100%"} flex={1}>
//                           <Text>
//                             {notifications[date][i].title}:{" "}
//                             {notifications[date][i].product}
//                           </Text>
//                           <Text>{notifications[date][i].user}</Text>
//                           <Text color={colors.darkgray} size={12}>
//                             {notifications[date][i].amount}{" "}
//                             {notifications[date][i].product} för{" "}
//                             {notifications[date][i].Total}kr
//                           </Text>
//                         </Block>
//                         {selected != null &&
//                           selected.i == val.i &&
//                           selected.key == val.key && (
//                             <Block width={"100%"}>
//                               {notifications[date][i].extra ? (
//                                 <Text
//                                   paddingTop={sizes.padding}
//                                   color={colors.darkgray}
//                                   size={12}
//                                 >
//                                   Bordsnummer: {e?.extra[1] + "\n"}
//                                   {e?.extra[2]} i bord {e?.extra[1]}
//                                 </Text>
//                               ) : null}
//                               <Block row paddingTop={sizes.padding}>
//                                 <Block flex={3} />
//                                 <Button flex={1} secondary shadow={false} onPress={()=>{onDismiss(e, date)}}>
//                                   <Text white>Ta bort</Text>
//                                 </Button>
//                               </Block>
//                             </Block>
//                           )}
//                       </Button>
//                       <Text
//                         marginLeft={20}
//                         marginBottom={sizes.sm}
//                         size={12}
//                         gray
//                       >
//                         {notifications[date][i].date}{" "}
//                         {notifications[date][i].time}
//                       </Text>
//                     </Block>
//                   );
//                 })}
//               </Block>
//             </Block>
//           );
//         })}
//       </Block>
//     </ScrollView>
//   );
// };


export default function  History(){

    return(
        <></>
        // <Camera type={CameraType.back} useCamera2Api={false}  style={{height:"100%", width:"100%"}}/>
    )
    
}