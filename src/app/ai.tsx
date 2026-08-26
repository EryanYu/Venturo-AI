import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import AIAssistantCard from "@/components/ai/AIAssistantCard";
import {
  aiServices
} from "@/data/assistantMockData";
import { useUser } from "@/context/UserContext";
import {
roleAIServices
} from "@/data/roleAIData";

export default function AIScreen(){

const { user, loading } = useUser();


if(loading || !user){

return null;

}


const services =
roleAIServices[user.role];

  return (

    <View style={styles.container}>


      {/* Header */}

      <View style={styles.header}>

        <Text style={styles.title}>
          AI Venture Copilot
        </Text>


        <Text style={styles.subtitle}>
          你的AI创业伙伴
        </Text>


      </View>



      {/* AI介绍 */}

      <View style={styles.aiCard}>


        <Text style={styles.aiTitle}>
          🤖 AI创业顾问
        </Text>


        <Text style={styles.aiDesc}>
          从创业方向、商业模式到融资策略，
          AI帮助你发现机会，提高创业成功率。
        </Text>


      </View>





      {/* AI服务 */}

      <Text style={styles.sectionTitle}>
        AI服务
      </Text>



      {
      services.map((item,index)=>(

      <AIAssistantCard

      key={index}

      icon={item.icon}

      title={item.title}

      description={item.description}

      points={item.points}

      />

      ))
      }




      {/* 输入 */}

      <TextInput

        placeholder="输入你的创业问题..."

        placeholderTextColor="#7180a8"

        style={styles.input}

      />





      {/* Button */}

      <Pressable style={styles.button}>


        <Text style={styles.buttonText}>
          开始AI分析
        </Text>


      </Pressable>






      {/* Points */}

      <View style={styles.points}>


        <Text style={styles.pointsText}>
          Points余额：1000
        </Text>


      </View>



    </View>

  );

}






const styles = StyleSheet.create({



container:{


  flex:1,

  backgroundColor:"#050816",

  padding:24,

  justifyContent:"center",


},




header:{


  alignItems:"center",

  marginBottom:25,


},




title:{


  color:"#ffffff",

  fontSize:28,

  fontWeight:"700",


},




subtitle:{


  marginTop:8,

  color:"#8fa3ff",

  fontSize:16,


},




aiCard:{


  backgroundColor:"#111936",

  padding:20,

  borderRadius:18,


},




aiTitle:{


  color:"#ffffff",

  fontSize:22,

  fontWeight:"600",


},




aiDesc:{


  marginTop:10,

  color:"#9aa4c7",

  lineHeight:22,


},




sectionTitle:{


  color:"#ffffff",

  fontSize:18,

  marginTop:20,

  marginBottom:10,


},




serviceCard:{


  backgroundColor:"#111936",

  padding:16,

  borderRadius:16,

  marginBottom:12,


},




serviceTitle:{


  color:"#ffffff",

  fontSize:18,

  fontWeight:"600",


},




serviceDesc:{


  color:"#9aa4c7",

  marginTop:8,


},




cost:{


  marginTop:10,

  color:"#C89B2A",

  fontSize:13,


},




input:{


  marginTop:15,

  height:52,

  backgroundColor:"#111936",

  borderRadius:14,

  paddingHorizontal:16,

  color:"#ffffff",


},




button:{


  marginTop:18,

  height:52,

  backgroundColor:"#3b82f6",

  borderRadius:26,

  alignItems:"center",

  justifyContent:"center",


},




buttonText:{


  color:"#ffffff",

  fontSize:17,

  fontWeight:"600",


},




points:{


  marginTop:18,

  alignItems:"center",


},




pointsText:{


  color:"#C89B2A",

},



});