import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";


export default function IntelligenceScreen(){


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


<Text style={styles.cardTitle}>
🔥 今日AI趋势
</Text>



<Text style={styles.news}>
OpenAI 最新模型推动 AI Agent 生态发展
</Text>


<Text style={styles.news}>
企业正在加速部署智能助手，提高生产效率
</Text>


<Text style={styles.news}>
AI创业机会集中在垂直行业应用
</Text>


</View>








<View style={styles.card}>


<Text style={styles.cardTitle}>
🤖 热门创业方向
</Text>


<Text style={styles.item}>
AI Agent 智能代理
</Text>


<Text style={styles.item}>
机器人 Robotics
</Text>


<Text style={styles.item}>
新能源 Energy
</Text>


<Text style={styles.item}>
智能制造 Industry AI
</Text>


</View>








<View style={styles.card}>


<Text style={styles.cardTitle}>
📈 投资热点
</Text>


<Text style={styles.item}>
AI基础设施
</Text>


<Text style={styles.item}>
企业AI应用
</Text>


<Text style={styles.item}>
未来计算
</Text>


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