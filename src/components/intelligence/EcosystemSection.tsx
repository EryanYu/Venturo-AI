import {
View,
Text,
Pressable
} from "react-native";


interface EcosystemItem{

id:string;

title:string;

description:string;

industry?:string;

relatedCompanies?:string[];

createdAt?:string;

}


interface Props{

items:EcosystemItem[];

}


export default function EcosystemSection({
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
🤝 生态合作机会
</Text>


{
items.map(item=>(


<View
key={item.id}
style={{
backgroundColor:"#151515",
padding:14,
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
marginTop:6
}}
>
{item.description}
</Text>


{
item.industry &&
<Text
style={{
color:"#4da3ff",
marginTop:6
}}
>
行业：{item.industry}
</Text>
}


{
item.relatedCompanies &&
<Text
style={{
color:"#ccc",
marginTop:6
}}
>
合作方：
{item.relatedCompanies.join("、")}
</Text>
}


</View>


))

}


</View>

);


}