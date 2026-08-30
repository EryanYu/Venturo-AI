import {
  View,
  Text,
} from "react-native";

import {
  IntelligenceItem,
} from "@/models/intelligence";

import {
  resolveIntelligenceRelations,
} from "@/services/intelligenceRelationEngine";


interface Props {
  items: IntelligenceItem[];
}


export default function FounderOpportunitySection({
  items,
}: Props) {

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
        🚀 创业机会推荐
      </Text>


      {items.map((item, index) => {

        const relations =
          resolveIntelligenceRelations(item);

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
                color: "#aaa",
                marginTop: 8,
              }}
            >
              {item.description}
            </Text>


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