import {
  StyleSheet,
  Text,
  View,
} from "react-native";


interface Props {

  title:string;

  description:string;

  role:string;

}



export default function RecommendationCard({
  title,
  description,
  role,
}:Props){


return (

<View style={styles.card}>


<Text style={styles.role}>
{role}
</Text>


<Text style={styles.title}>
{title}
</Text>


<Text style={styles.description}>
{description}
</Text>


</View>

);


}



const styles = StyleSheet.create({

card:{

backgroundColor:"#ffffff",

padding:16,

borderRadius:16,

marginBottom:12,

borderWidth:1,

borderColor:"#eeeeee",

},


role:{

fontSize:12,

color:"#666",

marginBottom:6,

},


title:{

fontSize:17,

fontWeight:"700",

},


description:{

fontSize:14,

color:"#555",

marginTop:8,

},


});