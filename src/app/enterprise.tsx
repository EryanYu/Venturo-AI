import {
  StyleSheet,
  Text,
  View,
} from "react-native";


import EnterpriseCard from "@/components/enterprise/EnterpriseCard";


import {
  enterpriseMockData
} from "@/data/enterpriseMockData";



export default function EnterpriseScreen(){


return (

<View style={styles.container}>


<View style={styles.header}>


<Text style={styles.title}>
企业生态中心
</Text>


<Text style={styles.subtitle}>
Enterprise Network
</Text>


</View>




<View style={styles.profileCard}>


<Text style={styles.profileTitle}>
🏢 我的企业身份
</Text>


<Text>
未来智能科技集团
</Text>


<Text>
行业：
智能制造
</Text>


<Text>
寻找 AI 技术合作与产业创新项目
</Text>


</View>





<Text style={styles.sectionTitle}>
AI推荐合作方向
</Text>




{
enterpriseMockData.map(
(item,index)=>(


<EnterpriseCard

key={index}

companyName={item.companyName}

industry={item.industry}

needTags={item.needTags}

cooperationTypes={
item.cooperationTypes
}

/>


)

)

}




</View>

);


}



const styles = StyleSheet.create({


container:{

flex:1,

backgroundColor:"#050816",

padding:20,

},



header:{

alignItems:"center",

marginBottom:20,

},



title:{

fontSize:26,

fontWeight:"bold",

color:"#ffffff",

},



subtitle:{

fontSize:16,

color:"#60a5fa",

marginTop:5,

},



profileCard:{


backgroundColor:"#111827",

padding:16,

borderRadius:12,

marginBottom:20,

},



profileTitle:{


fontSize:18,

fontWeight:"bold",

color:"#ffffff",

marginBottom:10,

},



sectionTitle:{


fontSize:20,

color:"#ffffff",

marginBottom:12,

}


});