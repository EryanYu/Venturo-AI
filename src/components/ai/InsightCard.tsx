import {
  Text,
  View,
  StyleSheet,
} from "react-native";


interface Props {

category:string;

title:string;

}



export default function InsightCard({
category,
title,
}:Props){


return (

<View style={styles.card}>


<Text style={styles.category}>
{category}
</Text>


<Text style={styles.title}>
{title}
</Text>


</View>


);


}



const styles = StyleSheet.create({

card:{

backgroundColor:"#f5f5f5",

padding:14,

borderRadius:14,

marginBottom:10,

},


category:{

fontSize:12,

color:"#888",

},


title:{

fontSize:16,

fontWeight:"600",

marginTop:6,

},


});