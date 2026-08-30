import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProjectCard from "@/components/project/ProjectCard";
import {projectMockData} from "@/data/projectMockData";
import ProjectMatchSection from "@/components/project/ProjectMatchSection";
import {generateProjectMatches,} from "@/services/projectMatchingEngine";

export default function ProjectScreen(){

const projects = projectMockData;

const currentProject = projectMockData[0];

const projectMatches =
  generateProjectMatches(
    currentProject,
    [
      "投资人",
      "专家/顾问",
      "企业/产业合作方",
    ]
  );



console.log(
  "PROJECT MATCHING:",
  projectMatches
);

  return (

    <View style={styles.container}>


      {/* Header */}

      <View style={styles.header}>


        <Text style={styles.title}>
          我的项目
        </Text>


        <Text style={styles.subtitle}>
          Startup Project Center
        </Text>


      </View>





      {/* Create Project */}

      <Pressable style={styles.createButton}>


        <Text style={styles.createText}>
          ＋ 创建新项目
        </Text>


      </Pressable>







      {/* Project Card */}

      <View style={styles.card}>


        <Text style={styles.projectName}>
          Venturo AI
        </Text>


        <Text style={styles.description}>
          AI驱动的创业生态平台
        </Text>




        <View style={styles.infoRow}>


          <View style={styles.infoBox}>

            <Text style={styles.label}>
              行业
            </Text>

            <Text style={styles.value}>
              AI SaaS
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.label}>
              阶段
            </Text>

            <Text style={styles.value}>
              Pre-Seed
            </Text>

          </View>


        </View>





        <View style={styles.infoRow}>


          <View style={styles.infoBox}>

            <Text style={styles.label}>
              融资目标
            </Text>

            <Text style={styles.value}>
              500万元
            </Text>

          </View>



          <View style={styles.infoBox}>

            <Text style={styles.label}>
              状态
            </Text>

            <Text style={styles.value}>
              准备融资
            </Text>

          </View>


        </View>



      </View>








      {/* AI Score */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🤖 AI项目评分
        </Text>



        <Text style={styles.score}>
          82 / 100
        </Text>



        <Text style={styles.scoreDesc}>
          AI分析：
          项目方向明确，市场空间较大，
          建议进一步完善商业模式和融资方案。
        </Text>



      </View>









      {/* Next Steps */}

      <View style={styles.card}>


        <Text style={styles.cardTitle}>
          🚀 下一步建议
        </Text>



        <Text style={styles.step}>
          ✅ 完善商业模式
        </Text>


        <Text style={styles.step}>
          🔄 AI优化BP
        </Text>


        <Text style={styles.step}>
          🔒 匹配投资人
        </Text>


        <Text style={styles.step}>
          🔒 开始融资流程
        </Text>



      </View>







      {/* Action */}

      <Pressable style={styles.button}>


        <Text style={styles.buttonText}>
          开始AI项目分析
        </Text>


      </Pressable>

      <ProjectMatchSection
       matches={projectMatches}
      />

    <View style={styles.section}>


      <Text style={styles.sectionTitle}>

      🔥 热门创业项目

      </Text>


      {
      projects.map((item,index)=>(


      <ProjectCard

      key={index}

      name={item.name}

      industry={item.industry}

      stage={item.stage}

      description={item.description}

      aiScore={item.aiScore}


      />


      ))
      }


    </View>



    </View>

  );

}





const styles = StyleSheet.create({


container:{


flex:1,

backgroundColor:"#050816",

padding:24,


},




header:{


alignItems:"center",

marginBottom:20,


},



title:{


fontSize:28,

fontWeight:"700",

color:"#fff",


},



subtitle:{


marginTop:8,

fontSize:15,

color:"#8fa3ff",


},




createButton:{


backgroundColor:"#1c2850",

padding:14,

borderRadius:16,

marginBottom:16,

alignItems:"center",


},



createText:{


color:"#fff",

fontSize:16,

fontWeight:"600",


},






card:{


backgroundColor:"#111936",

padding:18,

borderRadius:18,

marginBottom:14,


},




projectName:{


fontSize:24,

fontWeight:"700",

color:"#fff",


},




description:{


marginTop:8,

color:"#9aa4c7",

fontSize:15,


},




infoRow:{


flexDirection:"row",

justifyContent:"space-between",

marginTop:18,


},




infoBox:{


width:"48%",


},



label:{


color:"#7180a8",

fontSize:12,


},



value:{


marginTop:5,

color:"#fff",

fontSize:15,

fontWeight:"600",


},






cardTitle:{


fontSize:18,

fontWeight:"600",

color:"#fff",

marginBottom:12,


},




score:{


fontSize:36,

fontWeight:"700",

color:"#C89B2A",


},



scoreDesc:{


marginTop:10,

color:"#9aa4c7",

lineHeight:22,


},





step:{


color:"#b8c4ff",

marginBottom:10,

fontSize:15,


},




button:{


height:52,

backgroundColor:"#3b82f6",

borderRadius:26,

justifyContent:"center",

alignItems:"center",


},



buttonText:{


color:"#fff",

fontSize:17,

fontWeight:"600",


},



section:{
marginTop:20,
},


sectionTitle:{
fontSize:20,
fontWeight:"700",
marginBottom:12,
},


});