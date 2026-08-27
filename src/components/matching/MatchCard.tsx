import {
  StyleSheet,
  Text,
  View,
} from "react-native";


interface Props {

  score:number;

  category?:string;

  reason:string[];

}


export default function MatchCard({

  score,

  category,

  reason,

}:Props){


return (

<View style={styles.card}>


<Text style={styles.title}>
🤝 AI投资匹配
</Text>


<Text style={styles.score}>
匹配度：{score}%
</Text>


<Text style={styles.category}>
类型：{category}
</Text>


<Text style={styles.reason}>
{reason}
</Text>


</View>

)

}



const styles = StyleSheet.create({

card:{

backgroundColor:"#fff",

padding:16,

borderRadius:16,

marginBottom:12,

},


title:{

fontSize:18,

fontWeight:"700",

marginBottom:8,

},


score:{

fontSize:16,

fontWeight:"700",

},


category:{

marginTop:6,

},


reason:{

marginTop:8,

lineHeight:20,

}

});