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
}: Props) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        🤝 AI投资匹配
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

      {onConnect && (
        <Pressable
          style={styles.connectionButton}
          onPress={onConnect}
        >
          <Text style={styles.connectionButtonText}>
            🤝 发起连接
          </Text>
        </Pressable>
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