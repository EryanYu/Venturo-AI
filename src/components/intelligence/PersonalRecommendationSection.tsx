import {
  View,
  Text,
} from "react-native";

import {
  AIUserRecommendation,
} from "@/models/aiRecommendation";

interface Props {
  items: AIUserRecommendation[];
}

export default function PersonalRecommendationSection({
  items,
}: Props) {

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={{ marginBottom: 20 }}>

      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 12,
        }}
      >
        ✨ 为你推荐
      </Text>

      {items.map((item, index) => (

        <View
          key={item.id || index}
          style={{
            backgroundColor: "#111936",
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
          }}
        >

          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {item.title}
          </Text>

          <Text
            style={{
              color: "#9aa4c7",
              marginTop: 8,
              lineHeight: 20,
            }}
          >
            {item.description}
          </Text>

          <Text
            style={{
              color: "#8fa3ff",
              marginTop: 8,
              fontSize: 13,
            }}
          >
            {item.reason}
          </Text>

        </View>

      ))}

    </View>
  );
}