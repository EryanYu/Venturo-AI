import {
  View,
  Text,
  Pressable,
} from "react-native";

import {
  IntelligenceItem,
} from "@/models/intelligence";

import {
  resolveIntelligenceRelations,
} from "@/services/intelligenceRelationEngine";

import { useRouter } from "expo-router";

interface Props {
  items: IntelligenceItem[];
  onPress?: (item: IntelligenceItem) => void;
}


export default function InvestorOpportunitySection({
  items,
  onPress,
}: Props) {

const router = useRouter();

  if (items.length === 0) {
  return null;
}

return (
  <View>

    <Text
      style={{
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
      }}
    >
      💰 投资机会推荐
    </Text>

    {items.map((item, index) => {

        const relations =
          resolveIntelligenceRelations(item);

          console.log(
  "INVESTOR OPPORTUNITY RELATIONS:",
  item.id,
  relations
);

        return (

          <View
            key={item.id || index}
            style={{
              backgroundColor: "#172554",
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >

            <Pressable onPress={() => onPress?.(item)}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                }}
               >
                {item.title}
               </Text>
            </Pressable>


            <Pressable onPress={() => onPress?.(item)}>
              <Text
                style={{
                color: "#aaa",
                marginTop: 8,
                }}
              >
                {item.description}
              </Text>
            </Pressable>


            {relations.projects.length > 0 && (
              <Text
                style={{
                  color: "#60a5fa",
                  marginTop: 10,
                }}
              >
                📁 关联项目：
                {relations.projects.join("、")}
              </Text>
            )}


            {relations.investors.length > 0 && (
  <View style={{ marginTop: 10 }}>
    {relations.investors.map(profile => (
      <View
        key={profile.id}
        style={{
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: "#fbbf24",
          }}
        >
          💰 关联投资人：{profile.name}
        </Text>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/profile-detail",
              params: {
                id: profile.id,
              },
            })
          }
          style={{
            marginTop: 6,
          }}
        >
          <Text
            style={{
              color: "#60a5fa",
              fontSize: 13,
            }}
          >
            查看资料 →
          </Text>
        </Pressable>
      </View>
    ))}
  </View>
)}


            {relations.experts.length > 0 && (
              <Text
                style={{
                  color: "#a5b4fc",
                  marginTop: 6,
                }}
              >
                🧠 关联专家：
                {relations.experts
                  .map(profile => profile.name)
                  .join("、")}
              </Text>
            )}


            {relations.companies.length > 0 && (
              <Text
                style={{
                  color: "#34d399",
                  marginTop: 6,
                }}
              >
                🏢 关联企业：
                {relations.companies
                  .map(profile => profile.name)
                  .join("、")}
              </Text>
            )}

          </View>

        );

      })}

    </View>
  );
}