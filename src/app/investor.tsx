import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MatchCard from "@/components/matching/MatchCard";
import {
 matchingMockData
} from "@/data/matchingMockData";

export default function InvestorScreen(){

const matches = matchingMockData;

return (

<View style={styles.container}>


<View style={styles.header}>


<Text style={styles.title}>
资本中心
</Text>


<Text style={styles.subtitle}>
AI Investment Hub
</Text>


</View>





<View style={styles.card}>


<Text style={styles.cardTitle}>
💰 我的投资身份
</Text>


<Text style={styles.mainText}>
产业投资人 Investor
</Text>


<Text style={styles.desc}>
寻找优秀创业项目，连接未来科技机会。
</Text>


</View>







<View style={styles.card}>


<Text style={styles.cardTitle}>
🎯 投资方向
</Text>



<View style={styles.tagRow}>


<Text style={styles.tag}>
AI
</Text>


<Text style={styles.tag}>
机器人
</Text>


<Text style={styles.tag}>
新能源
</Text>


<Text style={styles.tag}>
Web3
</Text>


</View>


</View>







<View style={styles.card}>


<Text style={styles.cardTitle}>
📊 投资阶段
</Text>


<Text style={styles.item}>
✅ Pre-Seed
</Text>


<Text style={styles.item}>
✅ Seed
</Text>


<Text style={styles.item}>
⬜ Series A
</Text>


</View>








<View style={styles.card}>


<Text style={styles.cardTitle}>
🤖 AI推荐项目
</Text>




<View style={styles.project}>


<Text style={styles.projectName}>
Venturo AI
</Text>


<Text style={styles.match}>
匹配度：92%
</Text>


<Text style={styles.desc}>
AI创业生态平台，
连接创业者、资本和产业资源。
</Text>



</View>



</View>







<Pressable style={styles.button}>


<Text style={styles.buttonText}>
查看更多项目
</Text>


</Pressable>


<View style={styles.section}>


<Text style={styles.sectionTitle}>
🤖 AI推荐投资机会
</Text>


{
matches.map((item,index)=>(


<MatchCard

key={index}

score={item.score}

category={item.category}

reason={item.reason}


/>


))
}


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




mainText:{
color:"#C89B2A",
fontSize:20,
fontWeight:"700",
},



desc:{
marginTop:8,
color:"#9aa4c7",
lineHeight:20,
},



tagRow:{
flexDirection:"row",
flexWrap:"wrap",
gap:10,
},



tag:{
backgroundColor:"#1c2850",
color:"#b8c4ff",
paddingHorizontal:14,
paddingVertical:8,
borderRadius:20,
},



item:{
color:"#b8c4ff",
marginBottom:8,
},



project:{
backgroundColor:"#182348",
padding:16,
borderRadius:14,
},



projectName:{
color:"#fff",
fontSize:20,
fontWeight:"700",
},



match:{
marginTop:8,
color:"#C89B2A",
fontWeight:"700",
},



button:{
height:52,
backgroundColor:"#3b82f6",
borderRadius:26,
alignItems:"center",
justifyContent:"center",
},



buttonText:{
color:"#fff",
fontSize:17,
fontWeight:"600",
},



section:{
marginTop:20,
},


sectionTitle:{
fontSize:20,
fontWeight:"700",
marginBottom:12,
},


});