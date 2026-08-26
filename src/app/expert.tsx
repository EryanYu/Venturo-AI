import {
StyleSheet,
Text,
View,
} from "react-native";


import ExpertRecommendationCard
from "@/components/expert/ExpertRecommendationCard";


import {
expertRecommendationMockData
}
from "@/data/expertRecommendationMockData";



export default function ExpertScreen(){


return (

<View style={styles.container}>


<View style={styles.header}>


<Text style={styles.title}>
专家中心
</Text>


<Text style={styles.subtitle}>
Expert Network
</Text>


</View>




<View style={styles.card}>


<Text style={styles.cardTitle}>
🧠 我的专家身份
</Text>


<Text>
AI技术专家
</Text>


<Text>
领域：
人工智能 / 大模型
</Text>


<Text>
技能：
AI Architecture
</Text>


</View>





<Text style={styles.section}>
AI推荐项目
</Text>



{
expertRecommendationMockData.map(
(item,index)=>(


<ExpertRecommendationCard

key={index}

projectName="Venturo AI"

matchScore={item.matchScore}

matchReason={item.matchReason}

recommendType={item.recommendType}

/>


)

)

}



</View>


);


}



const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#050816",
padding:20,
},


header:{
alignItems:"center",
marginBottom:20,
},


title:{
fontSize:26,
fontWeight:"bold",
color:"#fff",
},


subtitle:{
color:"#60a5fa",
},


card:{
backgroundColor:"#111827",
padding:16,
borderRadius:12,
marginBottom:20,
},


cardTitle:{
color:"#fff",
fontSize:18,
fontWeight:"bold",
marginBottom:10,
},


section:{
color:"#fff",
fontSize:20,
marginBottom:10,
}

});