import {
 View,
 Text
} from "react-native";


import {
 ProfileRecommendation
} from "@/models/profileRecommendation";


interface Props{

 items:ProfileRecommendation[];

}


export default function ProfileRecommendationSection({
items
}:Props){


return (

<View
style={{
marginTop:20
}}
>


<Text
style={{
color:"#fff",
fontSize:18,
fontWeight:"600",
marginBottom:12
}}
>
🎯 AI匹配机会
</Text>


{
items.map(item=>(

<View
key={item.id}
style={{
backgroundColor:"#1E293B",
padding:12,
borderRadius:10,
marginBottom:10
}}
>


<Text
style={{
color:"#fff",
fontSize:16
}}
>
{item.title}
</Text>


<Text
style={{
color:"#CBD5E1",
marginTop:6
}}
>
匹配度:
{item.score}%
</Text>


<Text
style={{
color:"#94A3B8",
marginTop:6
}}
>
{item.reason}
</Text>


</View>

))
}


</View>

);

}