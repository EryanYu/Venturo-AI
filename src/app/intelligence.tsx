import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import IntelligenceCard from "@/components/ai/IntelligenceCard";
import InsightCard from "@/components/ai/InsightCard";
import RecommendationCard from "@/components/ai/RecommendationCard";
import {
  aiTrends,
  aiDirections,
  aiInvestments,
} from "@/data/aiMockData";
export default function IntelligenceScreen(){

const trends = [
{
 title:"AI Agent 智能代理",
 description:"OpenAI 最新模型推动 AI Agent 生态发展"
},

{
 title:"企业AI应用",
 description:"企业正在加速部署智能助手，提高生产效率"
},

{
 title:"垂直行业AI创业",
 description:"AI创业机会集中在垂直行业应用"
}

];

const recommendations = [

{
role:"创业者",
title:"机器人 Robotics",
description:"AI与机器人结合成为未来创业方向"
},

{
role:"投资人",
title:"AI基础设施",
description:"模型训练、算力和基础设施持续增长"
},

{
role:"企业/产业方",
title:"智能制造 Industry AI",
description:"传统产业数字化升级机会"
}

];

return (

<View style={styles.container}>


<View style={styles.header}>


<Text style={styles.title}>
AI情报中心
</Text>


<Text style={styles.subtitle}>
AI Innovation Intelligence
</Text>


</View>





<View style={styles.card}>


<Text style={styles.sectionTitle}>
🔥 今日AI趋势
</Text>


{
aiTrends.map((item,index)=>(

<IntelligenceCard
key={index}
title={item.title}
description={item.description}
/>

))
}


</View>








<View style={styles.card}>


<Text style={styles.sectionTitle}>
🤖 热门创业方向
</Text>


{
aiDirections.map((item,index)=>(

<InsightCard
key={index}
category={item.category}
title={item.title}
/>

))
}


<InsightCard
category="机器人"
title="Robotics"
/>


<InsightCard
category="新能源"
title="Energy"
/>


</View>








<View style={styles.card}>


{
aiInvestments.map((item,index)=>(

<RecommendationCard

key={index}

role={item.role}

title={item.title}

description={item.description}

/>

))
}


<RecommendationCard
role="投资人"
title="AI基础设施"
description="算力、模型和数据基础设施"
/>


<RecommendationCard
role="投资人"
title="企业AI应用"
description="AI商业落地机会"
/>


</View>









<View style={styles.adCard}>


<Text style={styles.adTitle}>
企业推广
</Text>


<Text style={styles.adDesc}>
发布企业动态、融资新闻，
触达创业者和投资人。
</Text>



<Pressable style={styles.button}>


<Text style={styles.buttonText}>
发布商业信息
</Text>


</Pressable>


</View>








<View style={styles.points}>


<Text style={styles.pointsText}>
AI情报 · 每日更新
</Text>


</View>





</View>


);


}








const styles = StyleSheet.create({


container:{
flex:1,
backgroundColor:"#050816",
padding:24,
},



header:{
alignItems:"center",
marginBottom:20,
},



title:{
fontSize:28,
fontWeight:"700",
color:"#fff",
},



subtitle:{
marginTop:8,
color:"#8fa3ff",
},




card:{
backgroundColor:"#111936",
padding:18,
borderRadius:18,
marginBottom:14,
},



cardTitle:{
color:"#fff",
fontSize:18,
fontWeight:"600",
marginBottom:12,
},



news:{
color:"#b8c4ff",
marginBottom:10,
lineHeight:20,
},



item:{
color:"#b8c4ff",
marginBottom:10,
},




adCard:{
backgroundColor:"#182348",
padding:18,
borderRadius:18,
marginTop:5,
},



adTitle:{
color:"#fff",
fontSize:20,
fontWeight:"700",
},



adDesc:{
color:"#9aa4c7",
marginTop:8,
lineHeight:20,
},




button:{
marginTop:16,
height:48,
backgroundColor:"#3b82f6",
borderRadius:24,
justifyContent:"center",
alignItems:"center",
},



buttonText:{
color:"#fff",
fontWeight:"600",
},




points:{
marginTop:18,
alignItems:"center",
},



pointsText:{
color:"#C89B2A",
},



});