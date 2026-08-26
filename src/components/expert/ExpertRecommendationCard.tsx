import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";


interface Props {

  projectName:string;

  matchScore:number;

  matchReason:string;

  recommendType:string;

}


export default function ExpertRecommendationCard({
  projectName,
  matchScore,
  matchReason,
  recommendType,
}:Props){


return (

<View style={styles.card}>


<Text style={styles.title}>
{projectName}
</Text>


<Text>
匹配度：{matchScore}%
</Text>


<Text>
推荐类型：
{recommendType}
</Text>


<Text>
{matchReason}
</Text>


<Pressable style={styles.button}>

<Text style={styles.buttonText}>
参与项目
</Text>

</Pressable>


</View>

);


}


const styles = StyleSheet.create({

card:{
backgroundColor:"#ffffff",
padding:16,
borderRadius:12,
marginBottom:12,
},


title:{
fontSize:18,
fontWeight:"bold",
},


button:{
marginTop:10,
backgroundColor:"#2563eb",
padding:10,
borderRadius:8,
},


buttonText:{
color:"#fff",
textAlign:"center",
}

});