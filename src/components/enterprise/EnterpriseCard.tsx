import {
StyleSheet,
Text,
View,
} from "react-native";


interface Props {

companyName:string;

industry:string;

needTags:string[];

cooperationTypes:string[];

}


export default function EnterpriseCard({
companyName,
industry,
needTags,
cooperationTypes,

}:Props){


return (

<View style={styles.card}>


<Text style={styles.title}>
{companyName}
</Text>


<Text>
行业：
{industry}
</Text>


<Text>
需求：
{needTags.join(" / ")}
</Text>


<Text>
合作：
{cooperationTypes.join(" / ")}
</Text>


</View>

);

}


const styles = StyleSheet.create({

card:{
backgroundColor:"#fff",
padding:16,
borderRadius:12,
marginBottom:12,
},


title:{
fontSize:18,
fontWeight:"bold",
}

});