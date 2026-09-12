import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  RecommendationType,
} from "@/models/recommendation";

interface Props {
  id?: string;
  targetId?: string;
  type?: RecommendationType;

  score: number;
  category?: string;
  name?: string;
  reason: string[];

  onConnect?: () => void;
  onViewDetail?: () => void;
  connectionStatus?: "pending" | "accepted" | "rejected";
}

export default function MatchCard({
  id,
  targetId,
  type,
  score,
  category,
  name,
  reason,
  onConnect,
  onViewDetail,
  connectionStatus,
}: Props) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        {type === "expert"
          ? "🧠 AI专家匹配"
          : type === "investor"
          ? "🤝 AI投资匹配"
          : "🤝 AI匹配"}
      </Text>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.score}>
        匹配度：{score}%
      </Text>

      <Text style={styles.category}>
        类型：{category}
      </Text>

      <Text style={styles.reason}>
        {reason.join("、")}
      </Text>
      {onViewDetail && (
        <Pressable
          style={styles.connectionButton}
          onPress={onViewDetail}
        >
          <Text style={styles.connectionButtonText}>
            查看详情
          </Text>
        </Pressable>
     )}

      {onConnect && connectionStatus !== "accepted" && (
        <Pressable
          style={styles.connectionButton}
          onPress={onConnect}
          disabled={connectionStatus === "pending"}
        >
          <Text style={styles.connectionButtonText}>
            {connectionStatus === "pending"
              ? "⏳ 等待对方回应"
              : connectionStatus === "rejected"
              ? "🤝 再次发起连接"
              : "🤝 发起连接"}
          </Text>
         </Pressable>
      )}

      {connectionStatus === "accepted" && (
        <Text style={styles.connectionButtonText}>
          ✅ 已连接
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  name: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 6,
  },

  score: {
    fontSize: 16,
    fontWeight: "700",
  },

  category: {
    marginTop: 6,
  },

  reason: {
    marginTop: 8,
    lineHeight: 20,
  },

  connectionButton: {
    marginTop: 12,
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 8,
  },

  connectionButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

});