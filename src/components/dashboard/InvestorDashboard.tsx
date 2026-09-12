import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import { useUser } from "@/context/UserContext";
import { InvestorProfile } from "@/models/profile";

export default function InvestorDashboard() {
  const { user, profile } = useUser();

  const investorProfile = profile as InvestorProfile | null;

  return (
    <View style={styles.container}>

      {/* 投资人资料 */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          👤 投资人资料
        </Text>

        <Text style={styles.mainText}>
          {user?.name || "未设置姓名"}
        </Text>

        <Text style={styles.desc}>
          {investorProfile?.industry || "未设置行业"}
          {" · "}
          {investorProfile?.trackTags?.join("、") || "未设置赛道"}
        </Text>

        <Text style={styles.desc}>
          投资阶段：
          {investorProfile?.investmentStages?.join("、") || "未设置"}
        </Text>

      </View>


      {/* 投资组合 */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          💰 我的投资组合
        </Text>

        <Text style={styles.mainText}>
          AI科技投资组合
        </Text>

        <Text style={styles.desc}>
          项目管理、投资阶段、行业布局
        </Text>

        <View style={styles.row}>

          <View style={styles.infoBox}>

            <Text style={styles.number}>
              15
            </Text>

            <Text style={styles.label}>
              关注项目
            </Text>

          </View>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              5
            </Text>

            <Text style={styles.label}>
              已投项目
            </Text>

          </View>

        </View>

      </View>


      {/* AI项目发现 */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          🤖 AI项目发现
        </Text>

        <Text style={styles.desc}>
          AI筛选优质创业项目，发现投资机会
        </Text>

        <Pressable style={styles.button}>

          <Text style={styles.buttonText}>
            开始项目筛选
          </Text>

        </Pressable>

      </View>


      {/* 投资流程 */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          📊 投资流程
        </Text>

        <View style={styles.row}>

          <View style={styles.infoBox}>

            <Text style={styles.number}>
              8
            </Text>

            <Text style={styles.label}>
              尽调中
            </Text>

          </View>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              3
            </Text>

            <Text style={styles.label}>
              谈判中
            </Text>

          </View>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              2
            </Text>

            <Text style={styles.label}>
              已签约
            </Text>

          </View>

        </View>

      </View>


      {/* 投资资产 */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          💎 投资资产
        </Text>

        <View style={styles.row}>

          <View style={styles.infoBox}>

            <Text style={styles.number}>
              5000
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
              投资能力
            </Text>

          </View>


          <View style={styles.infoBox}>

            <Text style={styles.number}>
              96
            </Text>

            <Text style={styles.label}>
              生态信用
            </Text>

          </View>

        </View>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    marginTop: 20,
    gap: 12,
  },

  card: {
    backgroundColor: "#111936",
    borderRadius: 14,
    padding: 16,
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },

  mainText: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 5,
  },

  desc: {
    color: "#8fa5d8",
    fontSize: 13,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  infoBox: {
    alignItems: "center",
  },

  number: {
    color: "#f5b700",
    fontSize: 20,
    fontWeight: "700",
  },

  label: {
    color: "#8fa5d8",
    fontSize: 12,
  },

  button: {
    marginTop: 15,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },

});