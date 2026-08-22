import {
  StyleSheet,
  Text,
  View,
} from "react-native";


interface Props {

  title:string;

  description:string;

}



export default function IntelligenceCard({
  title,
  description,
}:Props){


return (

<View style={styles.card}>


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

},

title:{

fontSize:18,

fontWeight:"700",

},


description:{

marginTop:8,

fontSize:14,

color:"#666",

},


});