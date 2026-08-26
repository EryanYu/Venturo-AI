import {
 View,
 Text
} from "react-native";

import {
 AIUserRecommendation
} from "@/models/aiRecommendation";


interface Props{

recommendations:
AIUserRecommendation[];

}


export default function RecommendationSection({
recommendations
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
🤖 AI机会洞察
</Text>


{
recommendations.map(
(item,index)=>(

<View
key={item.id || index}
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
color:"#aaa"
}}
>
{item.description}
</Text>


<Text
style={{
color:"#8fa3ff"
}}
>
推荐原因：
{item.reason}
</Text>


{
item.relatedProjects &&
<Text>
🚀
{item.relatedProjects.join(",")}
</Text>
}


{
item.relatedInvestors &&
<Text>
💰
{item.relatedInvestors.join(",")}
</Text>
}


{
item.relatedExperts &&
<Text>
🧠
{item.relatedExperts.join(",")}
</Text>
}


</View>


)

)

}


</View>


);

}