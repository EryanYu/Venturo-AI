import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";

import {
  useCallback,
  useState,
} from "react";

import {useUser} from "@/context/UserContext";
import {
  rankIntelligence,
} from "@/services/intelligenceRelevanceEngine";

import {
  getIntelligenceFeed,
  getDailyInsights,
  getFounderOpportunities,
  getInvestorOpportunities,
} from "@/services/intelligenceEngine";

import IntelligenceHeader from "@/components/intelligence/IntelligenceHeader";
import TrendSection from "@/components/intelligence/TrendSection";
import IntelligenceFeed from "@/components/intelligence/IntelligenceFeed";
import DailyInsightSection from "@/components/intelligence/DailyInsightSection";
import PersonalRecommendationSection from "@/components/intelligence/PersonalRecommendationSection";
import FounderOpportunitySection from "@/components/intelligence/FounderOpportunitySection";
import InvestorOpportunitySection from "@/components/intelligence/InvestorOpportunitySection";
import { projectMockData } from "@/data/projectMockData";
import {generateProjectMatches,} from "@/services/projectMatchingEngine";

import {trackBehavior,} from "@/services/behaviorTracker";
import {
  useRouter,
  useFocusEffect,
} from "expo-router";
import {getRecommendations,} from "@/services/recommendationEngine";
import {buildUserInterestProfile,} from "@/services/userInterestProfile";

export default function IntelligenceScreen(){

const { user, profile, loading } = useUser();

const router = useRouter();

const [, setRefreshKey] =
  useState(0);

useFocusEffect(
  useCallback(() => {
    setRefreshKey(
      value => value + 1
    );
  }, [])
);

if(loading || !user || !profile){
  return null;
}


const intelligenceFeed =
  getIntelligenceFeed(
    user.role
  );

const interestProfile =
  buildUserInterestProfile(
    user.id
  );

const personalRecommendations =
  getRecommendations(
    user,
    interestProfile
  );

const intelligenceRelevance =
  rankIntelligence(
    profile,
    intelligenceFeed
  );

const dailyInsights =
  intelligenceRelevance
    .filter(
      result =>
        result.item.type === "insight"
    )
    .map(
      result =>
        result.item
    );

const founderOpportunities =
  intelligenceRelevance
    .filter(
      result =>
        result.item.type === "founder_opportunity"
    )
    .map(
      result =>
        result.item
    );

const investorOpportunities =
  intelligenceRelevance
    .filter(
      result =>
        result.item.type === "investor_opportunity"
    )
    .map(
      result =>
        result.item
    );

const collaborationItems =
  intelligenceRelevance
    .filter(
      result =>
        result.item.type === "collaboration"
    )
    .map(
      result =>
        result.item
    );


    const project =
  projectMockData.find(
    item => item.id === "project_001"
  );

const projectMatches =
  project
    ? generateProjectMatches(project)
    : [];

return (
  <View style={styles.container}>

  <IntelligenceHeader
      role={user.role}
    />

  <PersonalRecommendationSection
      items={personalRecommendations}
  />

  <DailyInsightSection
  items={dailyInsights}
  onPress={(item) => {
  if (!item) {
    return;
  }

  trackBehavior(
    "view_intelligence",
    user.id,
    item.id,
    item.relatedTags
  );
}}
/>

    <FounderOpportunitySection
      items={founderOpportunities}
    />

    <InvestorOpportunitySection
      items={investorOpportunities}
    />

<View style={styles.intelligenceSection}>

  <Text style={styles.sectionTitle}>
    📰 AI情报流
  </Text>

  <IntelligenceFeed
    items={collaborationItems}
    onPress={(item) => {
      trackBehavior(
        "view_intelligence",
        user.id,
        item.id,
        item.relatedTags
      );
    }}
  />

</View>

    <View style={styles.matchSection}>

  <Text style={styles.sectionTitle}>
    🤝 AI生态伙伴推荐
  </Text>

  {project && (
    <Text style={styles.projectContext}>
      针对项目：{project.name}
    </Text>
  )}

  {projectMatches.map(match => (

  <Pressable
    key={match.profile.id}
    style={styles.matchCard}
    onPress={() => {
      trackBehavior(
        "view_profile",
        profile.userId,
        match.profile.id,
        match.profile.trackTags
      );
      router.push({
        pathname: "/profile-detail",
        params: {
          id: match.profile.id,
        },
      });
    }}
  >

      <View style={styles.matchHeader}>

        <Text style={styles.matchName}>
          {match.profile.name}
        </Text>

        <Text style={styles.matchScore}>
          {match.score} 分
        </Text>

      </View>

      <Text style={styles.matchRole}>
        {match.profile.role}
      </Text>

      {match.reasons.map(
        (reason, index) => (

          <Text
            key={index}
            style={styles.matchReason}
          >
            • {reason}
          </Text>

        )
      )}

      </Pressable>

  ))}

</View>

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


matchSection: {
  marginTop: 20,
},


intelligenceSection: {
  marginTop: 20,
},


sectionTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 12,
},

matchCard: {
  backgroundColor: "#111936",
  padding: 16,
  borderRadius: 16,
  marginBottom: 12,
},

matchHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

matchName: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},

matchScore: {
  color: "#3b82f6",
  fontSize: 16,
  fontWeight: "700",
},

matchRole: {
  color: "#9aa4c7",
  marginTop: 4,
  marginBottom: 10,
},

matchReason: {
  color: "#b8c4ff",
  fontSize: 13,
  lineHeight: 20,
},

projectContext: {
  color: "#8fa3ff",
  fontSize: 14,
  marginBottom: 12,
},

});