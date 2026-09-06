import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  id: string;
  name: string;
  industry: string;
  stage: string;
  description: string;
  aiScore?: number;
  onPress: () => void;
}

export default function ProjectCard({
  name,
  industry,
  stage,
  description,
  aiScore,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.name}>
        {name}
      </Text>

      <Text>
        行业：{industry}
      </Text>

      <Text>
        阶段：{stage}
      </Text>

      <Text>
        {description}
      </Text>

      <Text>
        AI评分：{aiScore}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },
});