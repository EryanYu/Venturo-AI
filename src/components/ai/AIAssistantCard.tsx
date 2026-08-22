import {
  StyleSheet,
  Text,
  View,
} from "react-native";


interface Props {

icon:string;

title:string;

description:string;

points:number;

}


export default function AIAssistantCard({
icon,
title,
description,
points,
}:Props){


return (

<View style={styles.card}>


<Text style={styles.icon}>
{icon}
</Text>


<Text style={styles.title}>
{title}
</Text>


<Text style={styles.description}>
{description}
</Text>


<Text style={styles.points}>
消耗 Points：{points}
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


icon:{

fontSize:28,

},


title:{

fontSize:18,

fontWeight:"700",

marginTop:8,

},


description:{

fontSize:14,

color:"#555",

marginTop:6,

},


points:{

marginTop:10,

fontSize:13,

color:"#888",

},


});