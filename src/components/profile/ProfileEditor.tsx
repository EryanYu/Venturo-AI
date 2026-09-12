import React, { useEffect, useState } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  EnterpriseProfile,
  ExpertProfile,
  FounderProfile,
  InvestorProfile,
  UserProfile,
} from "@/models/profile";

interface Props {
  profile: UserProfile | null;
  role?: UserProfile["role"];
  onSave: (profile: UserProfile) => void;
}

function splitTags(value: string): string[] {
  return value
    .split(/[，,、]/)
    .map(item => item.trim())
    .filter(Boolean);
}

function joinTags(value: string[]): string {
  return value.join("、");
}

function createDefaultProfile(
  role: UserProfile["role"] = "创业者"
): UserProfile {
  const baseProfile = {
    id: `profile_${Date.now()}`,
    userId: "",
    name: "",
    role,
    industry: "",
    city: "",
    trackTags: [],
    needTags: [],
    skillTags: [],
    seekingRoles: [],
    resources: [],
    description: "",
    createdAt: new Date().toISOString(),
  };

  switch (role) {
    case "投资人":
      return {
        ...baseProfile,
        role: "投资人",
        investmentStages: [],
        ticketSize: "",
        portfolio: [],
      } as InvestorProfile;

    case "专家/顾问":
      return {
        ...baseProfile,
        role: "专家/顾问",
        expertise: [],
        background: "",
        patents: [],
        canJoinStartup: false,
        availableForPitch: false,
      } as ExpertProfile;

    case "企业/产业合作方":
      return {
        ...baseProfile,
        role: "企业/产业合作方",
        companyName: "",
        industryNeeds: [],
        cooperationTypes: [],
      } as EnterpriseProfile;

    case "创业者":
    default:
      return {
        ...baseProfile,
        role: "创业者",
        startupName: "",
        fundingStage: "idea",
        fundingNeed: "",
      } as FounderProfile;
  }
}

export default function ProfileEditor({
  profile,
  role,
  onSave,
}: Props) {

  const [draft, setDraft] = useState<UserProfile>(
  profile ?? createDefaultProfile(role)
);

  useEffect(() => {
    if (profile) {
      setDraft(profile);
    }
  }, [profile]);

  function updateField<K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K]
  ) {
    setDraft(current => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSave() {
    onSave(draft);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        完善个人资料
      </Text>

      <Text style={styles.subtitle}>
        建立你的 Venturo AI Active Profile
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          基础信息
        </Text>

        <Text style={styles.label}>姓名</Text>

        <TextInput
          value={draft.name}
          onChangeText={value =>
            updateField("name", value)
          }
          placeholder="请输入姓名"
          placeholderTextColor="#667085"
          style={styles.input}
        />

        <Text style={styles.label}>行业</Text>

        <TextInput
          value={draft.industry}
          onChangeText={value =>
            updateField("industry", value)
          }
          placeholder="例如：人工智能"
          placeholderTextColor="#667085"
          style={styles.input}
        />

        <Text style={styles.label}>城市</Text>

        <TextInput
          value={draft.city}
          onChangeText={value =>
            updateField("city", value)
          }
          placeholder="例如：深圳"
          placeholderTextColor="#667085"
          style={styles.input}
        />

        <Text style={styles.label}>个人简介</Text>

        <TextInput
          value={draft.description}
          onChangeText={value =>
            updateField("description", value)
          }
          placeholder="介绍一下你自己"
          placeholderTextColor="#667085"
          multiline
          style={[
            styles.input,
            styles.textarea,
          ]}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          匹配标签
        </Text>

        <Text style={styles.label}>
          赛道标签
        </Text>

        <TextInput
          value={joinTags(draft.trackTags)}
          onChangeText={value =>
            updateField(
              "trackTags",
              splitTags(value)
            )
          }
          placeholder="AI Agent、企业SaaS、机器人"
          placeholderTextColor="#667085"
          style={styles.input}
        />

        <Text style={styles.label}>
          需求标签
        </Text>

        <TextInput
          value={joinTags(draft.needTags)}
          onChangeText={value =>
            updateField(
              "needTags",
              splitTags(value)
            )
          }
          placeholder="融资、技术合作、产业资源"
          placeholderTextColor="#667085"
          style={styles.input}
        />

        <Text style={styles.label}>
          能力标签
        </Text>

        <TextInput
          value={joinTags(draft.skillTags)}
          onChangeText={value =>
            updateField(
              "skillTags",
              splitTags(value)
            )
          }
          placeholder="产品设计、投资分析、算法"
          placeholderTextColor="#667085"
          style={styles.input}
        />

        <Text style={styles.label}>
          希望匹配的角色
        </Text>

        <TextInput
          value={joinTags(draft.seekingRoles)}
          onChangeText={value =>
            updateField(
              "seekingRoles",
              splitTags(value)
            )
          }
          placeholder="投资人、专家/顾问"
          placeholderTextColor="#667085"
          style={styles.input}
        />

        <Text style={styles.label}>
          我的资源
        </Text>

        <TextInput
          value={joinTags(draft.resources)}
          onChangeText={value =>
            updateField(
              "resources",
              splitTags(value)
            )
          }
          placeholder="资金、产业资源、技术能力"
          placeholderTextColor="#667085"
          style={styles.input}
        />
      </View>

      {draft.role === "创业者" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            创业者信息
          </Text>

          <Text style={styles.label}>
            Startup Name
          </Text>

          <TextInput
            value={(draft as FounderProfile).startupName}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                startupName: value,
              } as FounderProfile))
            }
            placeholder="例如：Venturo AI"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            融资阶段
          </Text>

          <TextInput
            value={(draft as FounderProfile).fundingStage}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                fundingStage: value,
              } as FounderProfile))
            }
            placeholder="idea / pre_seed / seed"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            融资需求
          </Text>

          <TextInput
            value={(draft as FounderProfile).fundingNeed}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                fundingNeed: value,
              } as FounderProfile))
            }
            placeholder="例如：500万元"
            placeholderTextColor="#667085"
            style={styles.input}
          />
        </View>
      )}

      {draft.role === "投资人" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            投资人信息
          </Text>

          <Text style={styles.label}>
            投资阶段
          </Text>

          <TextInput
            value={joinTags(
              (draft as InvestorProfile).investmentStages
            )}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                investmentStages: splitTags(value),
              } as InvestorProfile))
            }
            placeholder="pre_seed、seed"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            单笔投资金额
          </Text>

          <TextInput
            value={(draft as InvestorProfile).ticketSize}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                ticketSize: value,
              } as InvestorProfile))
            }
            placeholder="例如：100-500万元"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            Portfolio
          </Text>

          <TextInput
            value={joinTags(
              (draft as InvestorProfile).portfolio
            )}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                portfolio: splitTags(value),
              } as InvestorProfile))
            }
            placeholder="AI SaaS、机器人"
            placeholderTextColor="#667085"
            style={styles.input}
          />
        </View>
      )}

      {draft.role === "专家/顾问" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            专家信息
          </Text>

          <Text style={styles.label}>
            专业领域
          </Text>

          <TextInput
            value={joinTags(
              (draft as ExpertProfile).expertise
            )}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                expertise: splitTags(value),
              } as ExpertProfile))
            }
            placeholder="大模型、机器学习"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            背景
          </Text>

          <TextInput
            value={(draft as ExpertProfile).background}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                background: value,
              } as ExpertProfile))
            }
            placeholder="高校、企业、研究机构等"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            专利
          </Text>

          <TextInput
            value={joinTags(
              (draft as ExpertProfile).patents
            )}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                patents: splitTags(value),
              } as ExpertProfile))
            }
            placeholder="请输入专利"
            placeholderTextColor="#667085"
            style={styles.input}
          />
        </View>
      )}

      {draft.role === "企业/产业合作方" && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            企业信息
          </Text>

          <Text style={styles.label}>
            公司名称
          </Text>

          <TextInput
            value={
              (draft as EnterpriseProfile).companyName
            }
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                companyName: value,
              } as EnterpriseProfile))
            }
            placeholder="公司名称"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            行业需求
          </Text>

          <TextInput
            value={joinTags(
              (draft as EnterpriseProfile).industryNeeds
            )}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                industryNeeds: splitTags(value),
              } as EnterpriseProfile))
            }
            placeholder="工业AI、自动化"
            placeholderTextColor="#667085"
            style={styles.input}
          />

          <Text style={styles.label}>
            合作方式
          </Text>

          <TextInput
            value={joinTags(
              (draft as EnterpriseProfile).cooperationTypes
            )}
            onChangeText={value =>
              setDraft(current => ({
                ...current,
                cooperationTypes: splitTags(value),
              } as EnterpriseProfile))
            }
            placeholder="技术合作、产业投资"
            placeholderTextColor="#667085"
            style={styles.input}
          />
        </View>
      )}

      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          保存个人资料
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  subtitle: {
    color: "#8fa3ff",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#111936",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },

  label: {
    color: "#9aa4c7",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#080f24",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: "#fff",
    fontSize: 14,
  },

  textarea: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  saveButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
