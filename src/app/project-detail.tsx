import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { projectMockData } from "@/data/projectMockData";
import { opportunityMockData } from "@/data/opportunityMockData";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const project =
    projectMockData.find((item) => item.id === id) ??
    projectMockData[0];

  const opportunities = opportunityMockData.filter(
    (item) => item.projectId === project.id
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.name}</Text>

        <Text style={styles.subtitle}>
          Project Detail
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          项目概览
        </Text>

        <Text style={styles.description}>
          {project.description}
        </Text>

        <Text style={styles.info}>
          行业：{project.industry}
        </Text>

        <Text style={styles.info}>
          阶段：{project.stage}
        </Text>

        <Text style={styles.info}>
          融资状态：{project.fundingStatus}
        </Text>

        {project.fundingAmount && (
          <Text style={styles.info}>
            融资规模：{project.fundingAmount}
          </Text>
        )}

        {project.aiScore !== undefined && (
          <Text style={styles.score}>
            AI Score：{project.aiScore}/100
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          项目方向
        </Text>

        <View style={styles.tagContainer}>
          {project.trackTags?.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          当前机会
        </Text>

        {opportunities.length === 0 ? (
          <Text style={styles.emptyText}>
            当前暂无开放机会
          </Text>
        ) : (
          opportunities.map((opportunity) => (
            <View
              key={opportunity.id}
              style={styles.opportunity}
            >
              <Text style={styles.opportunityType}>
                {opportunity.type}
              </Text>

              <Text style={styles.opportunityTitle}>
                {opportunity.title}
              </Text>

              <Text style={styles.opportunityDescription}>
                {opportunity.description}
              </Text>

              <Text style={styles.status}>
                状态：{opportunity.status}
              </Text>

              <Text style={styles.targetRoles}>
                面向：{opportunity.targetRoles.join("、")}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#050816",
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    marginTop: 6,
    color: "#8fa3ff",
  },

  card: {
    backgroundColor: "#111936",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  description: {
    color: "#c7cee8",
    lineHeight: 21,
    marginBottom: 14,
  },

  info: {
    color: "#9aa4c7",
    marginBottom: 8,
  },

  score: {
    marginTop: 6,
    color: "#C89B2A",
    fontWeight: "700",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#1c2850",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  tagText: {
    color: "#b8c4ff",
  },

  opportunity: {
    backgroundColor: "#182348",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  opportunityType: {
    color: "#8fa3ff",
    fontSize: 13,
    marginBottom: 5,
  },

  opportunityTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 7,
  },

  opportunityDescription: {
    color: "#9aa4c7",
    lineHeight: 20,
    marginBottom: 8,
  },

  status: {
    color: "#C89B2A",
    marginBottom: 5,
  },

  targetRoles: {
    color: "#b8c4ff",
  },

  emptyText: {
    color: "#9aa4c7",
  },
});