import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MatchCard from "@/components/matching/MatchCard";

import {recommendationMockData,} from "@/data/recommendationMockData";

import ExpertCard from "@/components/expert/ExpertCard";
import { expertMockData } from "@/data/expertMockData";

import { useUser } from "@/context/UserContext";

import {createConnection,} from "@/services/connectionEngine";


export default function MatchingScreen() {

  const { user } = useUser();

  const handleConnect = async (
    item: typeof recommendationMockData[number]
  ) => {
    if (!user) {
      return;
    }

    const sourceType =
      item.type === "investor"
        ? "investment_match"
        : "project_match";

    try {
      const connection = await createConnection({
        requesterId: user.id,
        receiverId: item.targetId,
        sourceType,
        sourceId: item.id,
        tags: [],
      });

      console.log(
        "VENTURO MATCH CONNECTION:",
        connection
      );
    } catch (error) {
      console.error(
        "VENTURO MATCH CONNECTION ERROR:",
        error
      );
    }
  };

    const handleExpertConnect = async () => {
    if (!user) {
      return;
    }

    const expertRecommendation =
      recommendationMockData.find(
        item => item.type === "expert"
      );

    if (!expertRecommendation) {
      return;
    }

    try {
      const connection = await createConnection({
        requesterId: user.id,
        receiverId: expertRecommendation.targetId,
        sourceType: "profile_match",
        sourceId: expertRecommendation.id,
      });

      console.log(
        "VENTURO EXPERT CONNECTION:",
        connection
      );
    } catch (error) {
      console.error(
        "VENTURO EXPERT CONNECTION ERROR:",
        error
      );
    }
  };



  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          AI智能匹配中心
        </Text>

        <Text style={styles.subtitle}>
          AI Matching Engine
        </Text>

      </View>

      <View>

        {
          recommendationMockData.map((item) => (

            <MatchCard
              key={item.id}
              id={item.id}
              targetId={item.targetId}
              type={item.type}
              score={item.score}
              category={item.category}
              reason={item.reasons}
              onConnect={() =>
                handleConnect(item)
              }
            />

          ))
        }

      </View>

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          💰 投资人匹配
        </Text>

        {
          recommendationMockData
            .filter(
              item => item.type === "investor"
            )
            .map((item) => (

              <MatchCard
                key={item.id}
                id={item.id}
                targetId={item.targetId}
                type={item.type}
                score={item.score}
                reason={item.reasons}
                onConnect={() =>
                  handleConnect(item)
                }
              />

            ))
        }

      </View>

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          🤖 专家匹配
        </Text>

         {
          expertMockData.map((item, index) => (
            <ExpertCard
              key={item.id}
              data={item}
              onConnect={
                index === 0
                  ? handleExpertConnect
                  : undefined
          }
        />
      ))
     }

      </View>

      <Pressable style={styles.button}>

        <Text style={styles.buttonText}>
          开始AI匹配
        </Text>

      </Pressable>


    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#050816",
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    color: "#8aa4ff",
    marginTop: 8,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },

});