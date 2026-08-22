import { getUser } from "@/store/userStore";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ROLES } from "@/constants/role";
import FounderDashboard from "@/components/dashboard/FounderDashboard";
import InvestorDashboard from "@/components/dashboard/InvestorDashboard";
import ExpertDashboard from "@/components/dashboard/ExpertDashboard";
import EnterpriseDashboard from "@/components/dashboard/EnterpriseDashboard";
export default function ProfileScreen(){
const user = getUser();
const roleTitle =

  user.role === "创业者"

    ? "Founder Center"

    : user.role === "投资人"

    ? "Investor Center"

    : user.role === "专家/顾问"

    ? "Expert Center"

    : user.role === "企业/产业方"

    ? "Enterprise Center"

    : "Venturo Center";
  return (

    <View style={styles.container}>


      {/* Header */}

      <View style={styles.header}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.slice(0,1)}
          </Text>
        </View>



        <Text style={styles.title}>
            {roleTitle}
        </Text>


        <Text style={styles.subtitle}>
          {user.role}控制中心
        </Text>

        
      </View>



      {/* Dashboard */}

      {
      user.role === ROLES.FOUNDER
      &&
      <FounderDashboard/>
      }

      {
      user.role === ROLES.INVESTOR
      &&
      <InvestorDashboard/>
      }

      {
      user.role === ROLES.EXPERT
      &&
      <ExpertDashboard/>
      }

      {
      user.role === ROLES.ENTERPRISE
      &&
      <EnterpriseDashboard/>
      }


     </View> 

  );

}






const styles = StyleSheet.create({


container:{


  flex:1,

  backgroundColor:"#050816",

  padding:24,


},




header:{


  alignItems:"center",

  marginBottom:20,


},



avatar:{


  width:70,

  height:70,

  borderRadius:35,

  backgroundColor:"#C89B2A",

  alignItems:"center",

  justifyContent:"center",


},



avatarText:{


  fontSize:30,

  color:"#fff",

  fontWeight:"700",


},




title:{


  marginTop:12,

  color:"#fff",

  fontSize:26,

  fontWeight:"700",


},



subtitle:{


  marginTop:6,

  color:"#8fa3ff",

  fontSize:15,


},






card:{


  backgroundColor:"#111936",

  borderRadius:18,

  padding:18,

  marginBottom:14,


},





cardTitle:{


  color:"#fff",

  fontSize:18,

  fontWeight:"600",

  marginBottom:12,


},




mainText:{


  color:"#C89B2A",

  fontSize:20,

  fontWeight:"700",

},





smallButton:{


  marginTop:12,

  backgroundColor:"#1c2850",

  paddingVertical:8,

  paddingHorizontal:16,

  borderRadius:20,

  alignSelf:"flex-start",


},



smallButtonText:{


  color:"#fff",

  fontSize:13,


},






row:{


  flexDirection:"row",

  justifyContent:"space-between",


},




assetBox:{


  alignItems:"center",


},




assetNumber:{


  color:"#C89B2A",

  fontSize:22,

  fontWeight:"700",


},



assetLabel:{


  color:"#9aa4c7",

  marginTop:5,


},




step:{


  color:"#b8c4ff",

  marginBottom:8,

  fontSize:15,


},




info:{


  color:"#9aa4c7",

  marginBottom:8,


},






button:{


  marginTop:12,

  backgroundColor:"#3b82f6",

  height:48,

  borderRadius:24,

  alignItems:"center",

  justifyContent:"center",


},



buttonText:{


  color:"#fff",

  fontSize:16,

  fontWeight:"600",


},


});