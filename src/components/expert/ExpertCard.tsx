import {
  Pressable,
  Text,
  View,
  StyleSheet
} from "react-native";

interface Props {
  data: any;
  onConnect?: () => void;
}

export default function ExpertCard({
  data,
  onConnect,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {data.name}
      </Text>

      <Text>
        领域：{data.field}
      </Text>

      <Text>
        能力：{data.expertise}
      </Text>

      <Text>
        匹配度：{data.score}
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
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#111827",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
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
    fontWeight: "bold",
  },
});