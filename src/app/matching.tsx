import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MatchCard from "@/components/matching/MatchCard";
import {
    recommendationMockData
} from "@/data/recommendationMockData";
import ExpertCard from "@/components/expert/ExpertCard";
import { expertMockData } from "@/data/expertMockData";

export default function MatchingScreen(){

return (

<View style={styles.container}>


<View style={styles.header}>

<Text style={styles.title}>
AI智能匹配中心
</Text>


<Text style={styles.subtitle}>
AI Matching Engine
</Text>

</View>



<View>

{
recommendationMockData.map((item,index)=>(

<MatchCard

key={index}

score={item.score}

category={item.category}

reason={item.reasons}

/>

))
}


</View>

<View style={styles.section}>


<Text style={styles.sectionTitle}>
💰 投资人匹配
</Text>


{
recommendationMockData.map((item,index)=>(

<MatchCard

key={index}

score={item.score}

reason={item.reasons}

/>

))

}


</View>



<View style={styles.section}>


<Text style={styles.sectionTitle}>
🤖 专家匹配
</Text>


{
expertMockData.map((item,index)=>(


<ExpertCard

key={index}

data={item}


/>


))

}


</View>



<Pressable style={styles.button}>

<Text style={styles.buttonText}>
开始AI匹配
</Text>

</Pressable>


</View>

);

}



const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#050816"
},


header:{
alignItems:"center",
marginBottom:30
},


title:{
fontSize:24,
fontWeight:"bold",
color:"#fff"
},


subtitle:{
color:"#8aa4ff",
marginTop:8
},


button:{
marginTop:30,
backgroundColor:"#2563eb",
padding:15,
borderRadius:10
},


buttonText:{
color:"#fff",
textAlign:"center",
fontWeight:"bold"
},


section:{
marginTop:25
},


sectionTitle:{
fontSize:20,
fontWeight:"bold",
color:"#fff",
marginBottom:15
},



});