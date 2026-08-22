import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

export default function LoginScreen(){

  return (

    <View style={styles.container}>


      <View style={styles.header}>

        <Text style={styles.logo}>
          Venturo AI
        </Text>


        <Text style={styles.title}>
          欢迎进入未来创业生态
        </Text>


        <Text style={styles.subtitle}>
          AI驱动的创业伙伴
        </Text>

      </View>



      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          开始你的创业旅程
        </Text>


        <Text style={styles.desc}>
          连接机会、资本与伙伴
        </Text>



        <Pressable
          style={styles.button}
          onPress={()=>router.push("/role")}
        >

          <Text style={styles.buttonText}>
            注册 / 登录
          </Text>


        </Pressable>



      </View>



    </View>

  );

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
 marginBottom:40,
},


logo:{
 color:"#fff",
 fontSize:36,
 fontWeight:"700",
},


title:{
 marginTop:20,
 color:"#fff",
 fontSize:22,
},


subtitle:{
 marginTop:10,
 color:"#8fa3ff",
},


card:{
 backgroundColor:"#111936",
 padding:24,
 borderRadius:20,
},


cardTitle:{
 color:"#fff",
 fontSize:20,
 fontWeight:"600",
},


desc:{
 marginTop:10,
 color:"#9aa4c7",
},


button:{
 marginTop:30,
 height:52,
 backgroundColor:"#3b82f6",
 borderRadius:26,
 justifyContent:"center",
 alignItems:"center",
},


buttonText:{
 color:"#fff",
 fontSize:17,
 fontWeight:"600",
},


});