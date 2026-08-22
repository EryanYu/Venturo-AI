import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { updateRole } from "@/store/userStore";
export default function RoleScreen(){


return (

<View style={styles.container}>


<View style={styles.header}>

<Text style={styles.title}>
选择你的身份
</Text>

<Text style={styles.subtitle}>
开启你的 Venturo AI 创业生态
</Text>

</View>



<View style={styles.card}>


<Pressable 
style={styles.role}
onPress={()=>{

  updateRole("创业者");

  router.push("/profile");

}}
>

<Text style={styles.icon}>
🚀
</Text>

<Text style={styles.roleTitle}>
创业者
</Text>

<Text style={styles.desc}>
AI创业诊断、BP优化、融资匹配
</Text>


</Pressable>




<Pressable 
style={styles.role}
onPress={()=>{

  updateRole("投资人");

  router.push("/profile");

}}
>


<Text style={styles.icon}>
💰
</Text>


<Text style={styles.roleTitle}>
投资人
</Text>


<Text style={styles.desc}>
项目筛选、投资机会发现
</Text>


</Pressable>




<Pressable
style={styles.role}
onPress={()=>{

  updateRole("专家/顾问");

  router.push("/profile");

}}
>

<Text style={styles.icon}>
🤖
</Text>


<Text style={styles.roleTitle}>
专家/顾问
</Text>


<Text style={styles.desc}>
技术服务、模型训练、生态合作
</Text>


</Pressable>



<Pressable

style={styles.role}

onPress={()=>{

  updateRole("企业/产业方");

  router.push("/profile");

}}

>
<Pressable
style={styles.role}
onPress={()=>{

  updateRole("企业/产业方");

  router.push("/profile");

}}
>

</Pressable>

<Text style={styles.icon}>
🏢
</Text>


<Text style={styles.roleTitle}>
企业/产业方
</Text>


<Text style={styles.desc}>
产业合作、创新需求发布
</Text>


</Pressable>



</View>



</View>


)

}





const styles = StyleSheet.create({


container:{


flex:1,

backgroundColor:"#050816",

padding:24,

justifyContent:"center",


},



header:{


alignItems:"center",

marginBottom:30,


},



title:{


color:"#fff",

fontSize:28,

fontWeight:"700",


},



subtitle:{


marginTop:10,

color:"#8fa3ff",

fontSize:16,


},



card:{


backgroundColor:"#111936",

padding:20,

borderRadius:20,


},



role:{


backgroundColor:"#18234d",

padding:18,

borderRadius:16,

marginBottom:15,


},



icon:{


fontSize:28,


},



roleTitle:{


color:"#fff",

fontSize:20,

fontWeight:"600",

marginTop:8,


},



desc:{


color:"#9aa4c7",

marginTop:6,


}


});