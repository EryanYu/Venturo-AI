import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";


export default function EnterpriseDashboard(){


  return (

    <View style={styles.container}>


      {/* 企业创新中心 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🏢 企业创新中心
        </Text>


        <Text style={styles.mainText}>
          产业创新与技术合作平台
        </Text>


        <Text style={styles.desc}>
          发布产业需求，寻找创新项目与技术方案
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              8
            </Text>

            <Text style={styles.label}>
              创新需求
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.number}>
              20
            </Text>

            <Text style={styles.label}>
              合作项目
            </Text>

          </View>


        </View>


      </View>




      {/* 技术与项目发现 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🔎 项目发现
        </Text>


        <Text style={styles.desc}>
          AI项目筛选、技术寻找、创业团队发现
        </Text>



        <Pressable style={styles.button}>


          <Text style={styles.buttonText}>
            发布产业需求
          </Text>


        </Pressable>


      </View>




      {/* 产业合作 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🤝 产业合作
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              5
            </Text>

            <Text style={styles.label}>
              技术合作
            </Text>

          </View>




          <View style={styles.infoBox}>

            <Text style={styles.number}>
              3
            </Text>

            <Text style={styles.label}>
              投资机会
            </Text>

          </View>




          <View style={styles.infoBox}>

            <Text style={styles.number}>
              2
            </Text>

            <Text style={styles.label}>
              并购机会
            </Text>

          </View>


        </View>


      </View>




      {/* 企业资产 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          💎 企业资产
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              10000
            </Text>

            <Text style={styles.label}>
              Points
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.number}>
              A+
            </Text>

            <Text style={styles.label}>
              企业信用
            </Text>

          </View>




          <View style={styles.infoBox}>

            <Text style={styles.number}>
              95
            </Text>

            <Text style={styles.label}>
              产业影响力
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