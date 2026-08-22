import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";


export default function ExpertDashboard(){


  return (

    <View style={styles.container}>


      {/* 专家能力 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🧠 我的专业能力
        </Text>


        <Text style={styles.mainText}>
          AI产业专家顾问
        </Text>


        <Text style={styles.desc}>
          技术方向、行业经验、专业标签管理
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              12
            </Text>

            <Text style={styles.label}>
              专业标签
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.number}>
              96
            </Text>

            <Text style={styles.label}>
              专业评分
            </Text>

          </View>


        </View>


      </View>




      {/* 服务机会 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          📚 服务机会
        </Text>


        <Text style={styles.desc}>
          创业项目咨询、技术评估、商业顾问服务
        </Text>



        <Pressable style={styles.button}>

          <Text style={styles.buttonText}>
            查看合作机会
          </Text>

        </Pressable>


      </View>




      {/* 项目合作 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🤝 项目合作
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              8
            </Text>

            <Text style={styles.label}>
              服务项目
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.number}>
              3
            </Text>

            <Text style={styles.label}>
              合作企业
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.number}>
              5
            </Text>

            <Text style={styles.label}>
              创业团队
            </Text>

          </View>


        </View>


      </View>




      {/* 专家资产 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          💎 专家资产
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              3000
            </Text>

            <Text style={styles.label}>
              Points
            </Text>

          </View>




          <View style={styles.infoBox}>

            <Text style={styles.number}>
              85%
            </Text>

            <Text style={styles.label}>
              AI额度
            </Text>

          </View>




          <View style={styles.infoBox}>

            <Text style={styles.number}>
              920
            </Text>

            <Text style={styles.label}>
              专家影响力
            </Text>

          </View>


        </View>


      </View>


    </View>

  );

}



const styles = StyleSheet.create({

  container:{
    marginTop:20,
    gap:12,
  },


  card:{
    backgroundColor:"#111936",
    borderRadius:14,
    padding:16,
  },


  cardTitle:{
    color:"#ffffff",
    fontSize:17,
    fontWeight:"700",
    marginBottom:10,
  },


  mainText:{
    color:"#ffffff",
    fontSize:16,
    marginBottom:5,
  },


  desc:{
    color:"#8fa5d8",
    fontSize:13,
  },


  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:15,
  },


  infoBox:{
    alignItems:"center",
  },


  number:{
    color:"#f5b700",
    fontSize:20,
    fontWeight:"700",
  },


  label:{
    color:"#8fa5d8",
    fontSize:12,
  },


  button:{
    marginTop:15,
    backgroundColor:"#2563eb",
    paddingVertical:10,
    borderRadius:8,
    alignItems:"center",
  },


  buttonText:{
    color:"#ffffff",
    fontWeight:"700",
  },

});