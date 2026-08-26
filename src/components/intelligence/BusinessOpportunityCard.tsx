import {
 View,
 Text,
 Pressable
} from "react-native";

import {
 AIUserRecommendation
} from "@/models/aiRecommendation";


interface Props{

item:AIUserRecommendation;

}


export default function BusinessOpportunityCard({
item
}:Props){


return (

<View
style={{
backgroundColor:"#151515",
borderRadius:16,
padding:16,
marginBottom:12
}}
>


<Text
style={{
color:"#fff",
fontSize:18,
fontWeight:"600"
}}
>
🤝 生态合作机会
</Text>


<Text
style={{
color:"#8fa3ff",
fontSize:12,
marginTop:6
}}
>
Ecosystem Opportunity
</Text>



<Text
style={{
color:"#fff",
fontSize:16,
marginTop:10
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



{
item.industry &&
<Text
style={{
color:"#8fa3ff",
marginTop:8
}}
>
行业：
{item.industry}
</Text>
}



{
item.relatedCompanies &&
<Text
style={{
color:"#aaa",
marginTop:8
}}
>
合作方：
{item.relatedCompanies.join(",")}
</Text>
}


{
item.reason &&
<Text
style={{
color:"#bbb",
marginTop:8
}}
>
推荐原因：
{item.reason}
</Text>
}


{
item.createdAt &&
<Text
style={{
color:"#666",
fontSize:12,
marginTop:8
}}
>
发布时间：
{item.createdAt}
</Text>
}


<Pressable
style={{
marginTop:12,
paddingVertical:8,
borderRadius:8,
backgroundColor:"#2563eb"
}}
>

<Text
style={{
color:"#fff",
textAlign:"center"
}}
>
{item.actionType==="contact"
?
"联系合作"
:
"查看机会"
}
</Text>


</Pressable>


</View>

);


}