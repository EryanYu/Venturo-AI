import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";

import { useState } from "react";

import { allProfilesMock } from "@/data/allProfilesMockData";

import { useUser } from "@/context/UserContext";

import { trackBehavior } from "@/services/behaviorTracker";

import {
  getConnectionStatus,
  ConnectionStatus,
} from "@/services/connectionEngine";

export default function ProfileDetailScreen() {

  const { user } = useUser();

  const { id } =
  useLocalSearchParams<{ id?: string }>();

  const [connectionStatus, setConnectionStatus] =
  useState<ConnectionStatus>("none");

  const profile =
    allProfilesMock.find(
      item => item.id === id
    );

  const handleConnectionIntent = () => {
  if (!user || !profile) {
    return;
  }

  trackBehavior(
  "connection_intent",
  user.id,
  profile.id,
  profile.trackTags
);

  const status =
    getConnectionStatus(
      user.id,
      profile.id
    );

  setConnectionStatus(status);
};

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          未找到该用户资料
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>
            返回
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable
        onPress={() => router.back()}
      >
        <Text style={styles.back}>
          ← 返回
        </Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.name}>
          {profile.name}
        </Text>

        <Text style={styles.role}>
          {profile.role}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          基础信息
        </Text>

        <Text style={styles.item}>
          行业：{profile.industry}
        </Text>

        <Text style={styles.item}>
          城市：{profile.city}
        </Text>

        <Text style={styles.item}>
          简介：{profile.description}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          关注赛道
        </Text>

        <Text style={styles.item}>
          {profile.trackTags.join("、")}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          能力与需求
        </Text>

        <Text style={styles.item}>
          能力：{profile.skillTags.join("、")}
        </Text>

        <Text style={styles.item}>
          需求：{profile.needTags.join("、")}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          生态资源
        </Text>

        <Text style={styles.item}>
          {profile.resources.join("、")}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          希望连接
        </Text>

        <Text style={styles.item}>
          {profile.seekingRoles.join("、")}
        </Text>
      </View>

    <Pressable
      style={styles.connectionButton}
      onPress={handleConnectionIntent}
     >
      <Text style={styles.connectionButtonText}>
  {connectionStatus === "none" &&
    "🤝 对这个人感兴趣"}

  {connectionStatus === "interested" &&
    "✓ 已表达兴趣"}

  {connectionStatus === "mutual" &&
    "🤝 双方已互相感兴趣"}

  {connectionStatus === "connected" &&
    "✓ 已连接"}
      </Text>
    </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  back: {
    color: "#8fa3ff",
    fontSize: 14,
    marginBottom: 24,
  },

  header: {
    marginBottom: 20,
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  role: {
    color: "#8fa3ff",
    fontSize: 15,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#111936",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },

  item: {
    color: "#b8c4ff",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  button: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

connectionButton: {
  height: 48,
  borderRadius: 24,
  backgroundColor: "#3b82f6",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 4,
},

connectionButtonText: {
  color: "#fff",
  fontSize: 15,
  fontWeight: "600",
},

});