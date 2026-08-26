import {
View,
Text
} from "react-native";


interface Props{

items:any[];

}


export default function TrendSection({
items
}:Props){


return (

<View>


<Text
style={{
color:"#fff",
fontSize:18,
fontWeight:"600",
marginBottom:12
}}
>
🔥 AI趋势洞察
</Text>



{
items.map(
(item,index)=>(

<View
key={index}
style={{
backgroundColor:"#172554",
padding:14,
borderRadius:12,
marginBottom:10
}}
>

<Text
style={{
color:"#fff"
}}
>
{item.title}
</Text>


<Text
style={{
color:"#aaa",
marginTop:6
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