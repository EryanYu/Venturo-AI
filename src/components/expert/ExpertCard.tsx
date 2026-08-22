import {
Text,
View,
StyleSheet
} from "react-native";


interface Props{

data:any;

}


export default function ExpertCard({
data
}:Props){


return(

<View style={styles.card}>


<Text style={styles.name}>
{data.name}
</Text>


<Text>
领域：
{data.field}
</Text>


<Text>
能力：
{data.expertise}
</Text>


<Text>
匹配度：
{data.score}
</Text>


</View>


)

}



const styles=StyleSheet.create({

card:{
backgroundColor:"#fff",
padding:15,
borderRadius:12,
marginBottom:15
},


name:{
fontSize:18,
fontWeight:"bold"
}


});