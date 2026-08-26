import {
 View,
 Text
} from "react-native";


interface Props{

role:string;

}


export default function IntelligenceHeader({

role

}:Props){


return (

<View
style={{
marginBottom:16
}}
>


<Text

style={{

color:"#fff",

fontSize:24,

fontWeight:"700"

}}

>

AI情报中心

</Text>


<Text

style={{

color:"#8fa3ff",

marginTop:6

}}

>

AI Intelligence

</Text>



<Text

style={{

color:"#aaa",

marginTop:12

}}

>

当前角色：

{role}

</Text>


<Text

style={{

color:"#aaa",

marginTop:6

}}

>

AI正在根据你的身份推荐创业、投资与生态机会

</Text>


</View>


);


}