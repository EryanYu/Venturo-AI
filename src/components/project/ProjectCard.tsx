import {
StyleSheet,
Text,
View,
} from "react-native";


interface Props{

name:string;

industry:string;

stage:string;

description:string;

aiScore?:number;

}


export default function ProjectCard({

name,

industry,

stage,

description,

aiScore

}:Props){


return (

<View style={styles.card}>


<Text style={styles.name}>
{name}
</Text>


<Text>
行业：{industry}
</Text>


<Text>
阶段：{stage}
</Text>


<Text>
{description}
</Text>


<Text>
AI评分：
{aiScore}
</Text>


</View>

)

}



const styles=StyleSheet.create({

card:{

backgroundColor:"#fff",

padding:16,

borderRadius:16,

marginBottom:12

},


name:{

fontSize:18,

fontWeight:"700"

}


});