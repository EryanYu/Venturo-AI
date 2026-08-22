import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";


export default function FounderDashboard(){


  return (

    <View style={styles.container}>


      {/* 项目中心 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🚀 我的项目
        </Text>


        <Text style={styles.mainText}>
          Venturo AI 创业项目
        </Text>


        <Text style={styles.desc}>
          AI创业生态平台
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              A+
            </Text>

            <Text style={styles.label}>
              AI创业评分
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.number}>
              Seed
            </Text>

            <Text style={styles.label}>
              融资阶段
            </Text>

          </View>


        </View>


      </View>




      {/* AI创业助手 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🤖 AI创业助手
        </Text>


        <Text style={styles.desc}>
          AI诊断、BP优化、商业模式分析
        </Text>



        <Pressable style={styles.button}>

          <Text style={styles.buttonText}>
            开始AI诊断
          </Text>

        </Pressable>


      </View>




      {/* 融资中心 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          💰 融资中心
        </Text>


        <Text style={styles.desc}>
          投资人匹配、融资流程管理、尽调支持
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              12
            </Text>

            <Text style={styles.label}>
              匹配投资人
            </Text>


          </View>



          <View style={styles.infoBox}>


            <Text style={styles.number}>
              3
            </Text>


            <Text style={styles.label}>
              沟通中项目
            </Text>


          </View>


        </View>


      </View>





      {/* 创业资产 */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          💎 创业资产
        </Text>



        <View style={styles.row}>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              1000
            </Text>

            <Text style={styles.label}>
              Points
            </Text>

          </View>




          <View style={styles.infoBox}>

            <Text style={styles.number}>
              80%
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
              创业信用
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