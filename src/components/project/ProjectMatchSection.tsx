import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ProjectMatchResult,
} from "@/services/projectMatchingEngine";


interface Props {
  matches: ProjectMatchResult[];
}


export default function ProjectMatchSection({
  matches,
}: Props) {

  if (!matches || matches.length === 0) {
    return null;
  }


  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        🤖 AI项目匹配
      </Text>


      <Text style={styles.subtitle}>
        根据项目需求，为你推荐最合适的合作伙伴
      </Text>


      {
        matches.map(
          (item, index) => (

            <View
              key={item.profile.id || index}
              style={styles.card}
            >

              <View style={styles.headerRow}>

                <View>

                  <Text style={styles.name}>
                    {item.profile.name}
                  </Text>

                  <Text style={styles.role}>
                    {item.profile.role}
                  </Text>

                </View>


                <View style={styles.scoreBox}>

                  <Text style={styles.score}>
                    {item.score}%
                  </Text>

                  <Text style={styles.scoreLabel}>
                    匹配度
                  </Text>

                </View>

              </View>


              {
                item.reasons &&
                item.reasons.length > 0 && (

                  <View style={styles.reasons}>

                    {
                      item.reasons.map(
                        (reason, reasonIndex) => (

                          <Text
                            key={reasonIndex}
                            style={styles.reason}
                          >
                            ✓ {reason}
                          </Text>

                        )
                      )
                    }

                  </View>

                )
              }

            </View>

          )
        )
      }

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    marginTop: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },

  subtitle: {
    color: "#999",
    fontSize: 13,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  role: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 4,
  },

  scoreBox: {
    alignItems: "flex-end",
  },

  score: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  scoreLabel: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },

  reasons: {
    marginTop: 12,
  },

  reason: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 5,
  },

});