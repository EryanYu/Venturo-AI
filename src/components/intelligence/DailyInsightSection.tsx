import {
  View,
  Text,
} from "react-native";

import {
  IntelligenceItem,
} from "@/models/intelligence";


interface Props{

  items:IntelligenceItem[];

}


export default function DailyInsightSection({
  items
}:Props){


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

            <View
              key={item.id || index}
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

            </View>

          )
        )
      }

    </View>

  );

}