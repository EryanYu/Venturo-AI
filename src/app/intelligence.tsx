import {
    StyleSheet,
    View,
} from "react-native";
import { useUser } from "@/context/UserContext";
import {getRecommendations} from "@/services/recommendationEngine";
import RecommendationSection from "@/components/intelligence/RecommendationSection";
import {intelligenceMockData} from "@/data/intelligenceMockData";
import {getIntelligenceFeed} from "@/services/intelligenceEngine";
import IntelligenceHeader from "@/components/intelligence/IntelligenceHeader";
import TrendSection from "@/components/intelligence/TrendSection";
import IntelligenceFeed from "@/components/intelligence/IntelligenceFeed";
import EcosystemSection from "@/components/intelligence/EcosystemSection";

export default function IntelligenceScreen(){

const { user, loading } = useUser();

if(loading || !user){

return null;

}


const personalizedRecommendations =
getRecommendations(user);


console.log(
"CURRENT ROLE:",
user.role
);


const roleData =
  intelligenceMockData.filter(
    item => item.targetRoles.includes(user.role)
  );


const intelligenceFeed =
getIntelligenceFeed(
 intelligenceMockData,
 user.role
);


const ecosystemData =
  personalizedRecommendations.filter(
    item => item.type==="ecosystem"
  );


console.log(
"AI INTELLIGENCE FEED:",
intelligenceFeed
);

return (
  <View style={styles.container}>

    <IntelligenceHeader
     role={user.role}
    />

    <TrendSection
     items={roleData}
    />

    <RecommendationSection
      recommendations={
        personalizedRecommendations
      }
    />

    <IntelligenceFeed
     items={intelligenceFeed}
    />

    <EcosystemSection
    items={ecosystemData}
    />

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



title:{
fontSize:28,
fontWeight:"700",
color:"#fff",
},



subtitle:{
marginTop:8,
color:"#8fa3ff",
},




card:{
backgroundColor:"#111936",
padding:18,
borderRadius:18,
marginBottom:14,
},



cardTitle:{
color:"#fff",
fontSize:18,
fontWeight:"600",
marginBottom:12,
},



news:{
color:"#b8c4ff",
marginBottom:10,
lineHeight:20,
},



item:{
color:"#b8c4ff",
marginBottom:10,
},




adCard:{
backgroundColor:"#182348",
padding:18,
borderRadius:18,
marginTop:5,
},



adTitle:{
color:"#fff",
fontSize:20,
fontWeight:"700",
},



adDesc:{
color:"#9aa4c7",
marginTop:8,
lineHeight:20,
},




button:{
marginTop:16,
height:48,
backgroundColor:"#3b82f6",
borderRadius:24,
justifyContent:"center",
alignItems:"center",
},



buttonText:{
color:"#fff",
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