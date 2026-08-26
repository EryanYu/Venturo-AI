import {
  View,
  Text
} from "react-native";


interface Props{

items:any[];

}


export default function IntelligenceFeed({
items
}:Props){


return (

<View>


{
items.map(
(item,index)=>(

<View
key={index}
style={{
backgroundColor:"#111827",
padding:16,
borderRadius:12,
marginBottom:12
}}
>


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


</View>

)

)
}


</View>

);


}