import {
  View,
  Text,
  Pressable,
} from "react-native";

import {
  IntelligenceItem,
} from "@/models/intelligence";


interface Props {
  items: IntelligenceItem[];
  onPress?: (item: IntelligenceItem) => void;
}


export default function DailyInsightSection({
  items,
  onPress,
}: Props) {


  return (

    <View>

      <Text
        style={{
          color:"#fff",
          fontSize:18,
          fontWeight:"600",
          marginBottom:12
        }}
      >
        🧠 AI每日洞察
      </Text>


      {
        items.map(
          (item,index)=>(

            <Pressable
             key={item.id || index}
             onPress={() => onPress?.(item)}
             style={{
               backgroundColor:"#111827",
               padding:16,
               borderRadius:12,
               marginBottom:12
      }}
             >

              <Text
                style={{
                  color:"#fff",
                  fontSize:16,
                  fontWeight:"600"
                }}
              >
                {item.title}
              </Text>


              <Text
                style={{
                  color:"#aaa",
                  marginTop:8
                }}
              >
                {item.description}
              </Text>

            </Pressable>

          )
        )
      }

    </View>

  );

}