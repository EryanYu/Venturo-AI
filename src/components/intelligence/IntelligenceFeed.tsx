import {
  View,
  Text,
  Pressable
} from "react-native";


interface Props {
  items: any[];
  onPress?: (item: any) => void;
}


export default function IntelligenceFeed({
  items,
  onPress,
}: Props) {


return (

<View>


{
items.map(
(item,index)=>(

<Pressable
  key={index}
  onPress={() => onPress?.(item)}
  style={{
    backgroundColor:"#111827",
    padding:16,
    borderRadius:12,
    marginBottom:12
  }}
>

{item.type === "collaboration" && (
  <Text
    style={{
      color:"#8fa3ff",
      fontSize:12,
      marginBottom:6
    }}
  >
    ◇ 品牌合作
  </Text>
)}


<Text
style={{
color:"#fff",
fontSize:16,
fontWeight:"600"
}}
>
{item.title}
</Text>


<Text
style={{
color:"#aaa",
marginTop:8
}}
>
{item.description}
</Text>


</Pressable>

)

)
}


</View>

);


}