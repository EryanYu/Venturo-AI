import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";


export default function HomeScreen(){


return (

<View style={styles.container}>


<View style={styles.header}>


<Text style={styles.logo}>
Venturo AI
</Text>


<Text style={styles.subtitle}>
AI Venture Intelligence
</Text>


<Text style={styles.desc}>
探索未来创业机会
</Text>


</View>





<Pressable
style={styles.card}
onPress={()=>router.push("/intelligence")}
>


<Text style={styles.cardTitle}>
🔥 AI情报中心
</Text>


<Text style={styles.cardDesc}>
全球创新趋势、创业机会和投资动态
</Text>


<Text style={styles.action}>
进入 →
</Text>


</Pressable>








<Pressable
style={styles.card}
onPress={()=>router.push("/ai")}
>


<Text style={styles.cardTitle}>
🤖 AI创业顾问
</Text>


<Text style={styles.cardDesc}>
商业模式分析、融资策略、BP优化
</Text>


<Text style={styles.action}>
开始咨询 →
</Text>


</Pressable>








<Pressable
style={styles.card}
onPress={()=>router.push("/project")}
>


<Text style={styles.cardTitle}>
🚀 我的创业项目
</Text>


<Text style={styles.cardDesc}>
Venturo AI

AI评分：82 /100
</Text>


<Text style={styles.action}>
查看项目 →
</Text>


</Pressable>








<View style={styles.points}>


<Text style={styles.pointsText}>
💎 Points余额：1000
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
marginBottom:30,
},



logo:{
fontSize:36,
fontWeight:"700",
color:"#fff",
},



subtitle:{
marginTop:8,
color:"#8fa3ff",
fontSize:16,
},



desc:{
marginTop:18,
color:"#fff",
fontSize:18,
},






card:{
backgroundColor:"#111936",
padding:20,
borderRadius:18,
marginBottom:16,
},




cardTitle:{
color:"#fff",
fontSize:21,
fontWeight:"700",
},



cardDesc:{
marginTop:10,
color:"#9aa4c7",
lineHeight:22,
},



action:{
marginTop:14,
color:"#C89B2A",
fontWeight:"600",
},




points:{
marginTop:20,
alignItems:"center",
},



pointsText:{
color:"#C89B2A",
fontSize:16,
},



});