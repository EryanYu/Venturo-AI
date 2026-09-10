import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MatchCard from "@/components/matching/MatchCard";

import {
  founderProfileMock,
  investorProfileMock,
  expertProfileMock,
  enterpriseProfileMock,
} from "@/data/profileMockData";

import { projectMockData } from "@/data/projectMockData";

import { useUser } from "@/context/UserContext";

import { buildUserInterestProfile } from "@/services/userInterestProfile";

import { getRecommendations } from "@/services/recommendationEngine";

import {
  calculateProfileMatch,
} from "@/services/matchingEngine";

import {
  generateProjectRecommendations,
} from "@/services/projectRecommendationEngine";

import {
  calculateInvestmentMatch,
  generateInvestmentMatches,
} from "@/services/investmentMatchingEngine";

import { createConnection } from "@/services/connectionEngine";

import { InvestorProfile } from "@/models/profile";

export default function MatchingScreen() {
  const { user, profile } = useUser();

  if (!user || !profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          AI智能匹配中心
        </Text>

        <Text style={styles.subtitle}>
          正在加载用户信息...
        </Text>
      </View>
    );
  }

  /**
   * ============================================================
   * 1. Interest Profile
   * ============================================================
   */

  const interestProfile =
    buildUserInterestProfile(user.id);
  console.log("VENTURO INTEREST DEBUG:", {
  userId: user.id,
  interests: interestProfile.interests,
  intentSignals: interestProfile.intentSignals,
});
  /**
   * ============================================================
   * 2. AI Intelligence Recommendation
   * ============================================================
   *
   * This path remains independent from Project / Investment
   * Matching.
   */

  const intelligenceRecommendations =
    getRecommendations(
      user,
      interestProfile
    );

  console.log(
  "VENTURO INTELLIGENCE RECOMMENDATIONS:",
  intelligenceRecommendations
);


  /**
   * ============================================================
   * 3. AI Intelligence �?Profile Matching
   * ============================================================
   *
   * Only recommendations carrying explicit investor / expert
   * target IDs enter this matching path.
   */

  const targetProfiles = [
    founderProfileMock,
    investorProfileMock,
    expertProfileMock,
    enterpriseProfileMock,
  ];

  const intelligenceMatchCandidates =
    intelligenceRecommendations.flatMap(
      recommendation => {
        const candidates: {
          recommendation: typeof recommendation;
          type: "investor" | "expert";
          targetId: string;
        }[] = [];

        recommendation.relatedInvestors?.forEach(
          targetId => {
            candidates.push({
              recommendation,
              type: "investor",
              targetId,
            });
          }
        );

        recommendation.relatedExperts?.forEach(
          targetId => {
            candidates.push({
              recommendation,
              type: "expert",
              targetId,
            });
          }
        );

        return candidates;
      }
    );

  const intelligenceMatches =
    intelligenceMatchCandidates
      .map(candidate => {
        const targetProfile =
          targetProfiles.find(
            profileItem =>
              profileItem.id ===
              candidate.targetId
          );

        if (!targetProfile) {
          return null;
        }

        const matchResult =
          calculateProfileMatch(
            profile,
            targetProfile
          );

        return {
          ...candidate,
          targetProfile,
          matchResult,
        };
      })
      .filter(
        (
          item
        ): item is NonNullable<typeof item> =>
          item !== null
      )
      .sort(
        (a, b) =>
          b.matchResult.score -
          a.matchResult.score
      );

  /**
   * ============================================================
   * 4. Project-centric Recommendation
   * ============================================================
   *
   * This is the second independent algorithm path.
   */

  const projectRecommendations =
    generateProjectRecommendations(
      profile,
      interestProfile
    );

  console.log(
  "VENTURO PROJECT RECOMMENDATIONS:",
  projectRecommendations
);


  const projectCandidates =
    projectRecommendations.filter(
      recommendation => {
        if (recommendation.type !== "project") {
          return false;
        }

        const project = projectMockData.find(
          item =>
            item.id === recommendation.targetId
        );

        return (
          project !== undefined &&
          project.founderId !== user.id
        );
      }
    );

  /**
   * ============================================================
   * 5. Project �?Investor Matching
   * ============================================================
   *
   * Only Investor users enter Investment Matching.
   */

  const investmentMatches =
    profile.role === "投资�?
      ? projectCandidates
          .map(recommendation => {
            const project =
              projectMockData.find(
                item =>
                  item.id ===
                  recommendation.targetId
              );

            if (!project) {
              return null;
            }

            console.log(
               "VENTURO INVESTOR PROFILE DEBUG:",
               profile
             );

            const investmentMatch =
              calculateInvestmentMatch(
                project,
                profile as InvestorProfile
              );

            return {
              recommendation,
              project,
              investmentMatch,
            };
          })
          .filter(
            (
              item
            ): item is NonNullable<typeof item> =>
              item !== null
          )
          .filter(
            item =>
              item.investmentMatch.score > 0
          )
          .sort(
            (a, b) =>
              b.investmentMatch.score -
              a.investmentMatch.score
          )
      : [];

  /**
   * ============================================================
   * 6. Founder �?Investor Matching
   * ============================================================
   *
   * Entrepreneur users discover investors through their own
   * project(s).
   */

  const founderInvestmentMatches =
    profile.role === "创业�?
      ? projectMockData
          .filter(
            project =>
              project.founderId ===
              user.id
          )
          .flatMap(project =>
            generateInvestmentMatches(
              project
            ).map(investmentMatch => {
              const investor =
                targetProfiles.find(
                  target =>
                    target.id ===
                    investmentMatch.investorId
                );

              if (!investor) {
                return null;
              }

              return {
                project,
                investor,
                investmentMatch,
              };
            })
          )
          .filter(
            (
              item
            ): item is NonNullable<typeof item> =>
              item !== null
          )
          .sort(
            (a, b) =>
              b.investmentMatch.score -
              a.investmentMatch.score
          )
      : [];

  /**
   * ============================================================
   * 7. Connection Handlers
   * ============================================================
   */

  const handleIntelligenceConnect = async (
    item: typeof intelligenceMatches[number]
  ) => {
    try {
      const connection =
        await createConnection({
          requesterId: user.id,
          receiverId:
            item.targetProfile.userId,
          sourceType: "profile_match",
          sourceId:
            item.recommendation.id,
          tags:
            item.recommendation.relatedTags,
        });

      console.log(
        "VENTURO AI INTELLIGENCE CONNECTION:",
        connection
      );
    } catch (error) {
      console.error(
        "VENTURO AI INTELLIGENCE CONNECTION ERROR:",
        error
      );
    }
  };

  const handleInvestmentConnect = async (
    item: typeof investmentMatches[number]
  ) => {
    try {
      const connection =
        await createConnection({
          requesterId: user.id,
          receiverId:
            item.project.founderId,
          sourceType: "investment_match",
          sourceId:
            item.investmentMatch.id,
          tags: [
            ...(item.project.trackTags ?? []),
            ...(item.project.needTags ?? []),
          ],
        });

      console.log(
        "VENTURO AI INVESTMENT CONNECTION:",
        connection
      );
    } catch (error) {
      console.error(
        "VENTURO AI INVESTMENT CONNECTION ERROR:",
        error
      );
    }
  };

  const handleFounderInvestmentConnect =
    async (
      item: typeof founderInvestmentMatches[number]
    ) => {
      try {
        const connection =
          await createConnection({
            requesterId: user.id,
            receiverId:
              item.investor.userId,
            sourceType: "investment_match",
            sourceId:
              item.investmentMatch.id,
            tags: [
              ...(item.project.trackTags ?? []),
              ...(item.project.needTags ?? []),
            ],
          });

        console.log(
          "VENTURO AI FOUNDER INVESTMENT CONNECTION:",
          connection
        );
      } catch (error) {
        console.error(
          "VENTURO AI FOUNDER INVESTMENT CONNECTION ERROR:",
          error
        );
      }
    };

  const handleProjectConnect = async (
  project: typeof projectMockData[number]
) => {
  try {
    const connection = await createConnection({
      requesterId: user.id,
      receiverId: project.founderId,
      sourceType: "project_match",
      sourceId: project.id,
      tags: [
        ...(project.trackTags ?? []),
        ...(project.needTags ?? []),
      ],
    });

    console.log(
      "VENTURO PROJECT CONNECTION:",
      connection
    );
  } catch (error) {
    console.error(
      "VENTURO PROJECT CONNECTION ERROR:",
      error
    );
  }
};

  /**
   * ============================================================
   * 8. UI
   * ============================================================
   */

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          AI智能匹配中心
        </Text>

        <Text style={styles.subtitle}>
          AI Matching Engine
        </Text>
      </View>

      {/* ======================================================
          AI Intelligence Matching
          ====================================================== */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🧠 AI智能匹配
        </Text>

        {intelligenceMatches.length === 0 ? (
          <Text style={styles.emptyText}>
            当前暂无直接的投资人或专家匹配�?
          </Text>
        ) : (
          intelligenceMatches.map(item => (
            <MatchCard
              key={`intelligence_${item.recommendation.id}_${item.targetProfile.id}`}
              id={item.recommendation.id}
              targetId={item.targetProfile.id}
              type={item.type}
              score={
                item.matchResult.score
              }
              category={
                item.targetProfile.role
              }
              name={
                item.targetProfile.name
              }
              reason={
                item.matchResult.reasons
              }
              onConnect={() =>
                handleIntelligenceConnect(
                  item
                )
              }
            />
          ))
        )}
      </View>

    {/* ======================================================
    Project Discovery
    ====================================================== */}

<View style={styles.section}>
  <Text style={styles.sectionTitle}>
    📌 项目推荐
  </Text>

  {projectCandidates.length === 0 ? (
    <Text style={styles.emptyText}>
      当前暂无推荐项目�?
    </Text>
  ) : (
    projectCandidates.map(recommendation => {
      const project = projectMockData.find(
        item =>
          item.id === recommendation.targetId
      );

      if (!project) {
        return null;
      }

      return (
        <View
          key={`project_${project.id}`}
          style={styles.projectCard}
        >
          <Text style={styles.projectName}>
            {project.name}
          </Text>

          <Text style={styles.projectType}>
            项目类型�?
            {project.trackTags?.join("�?) ||
              project.industry ||
              "未分�?}
          </Text>

          <Text style={styles.projectStage}>
            项目阶段�?
            {project.stage}
          </Text>

          <Text style={styles.projectScore}>
            推荐度：{recommendation.score}%
          </Text>

          {recommendation.reasons?.length > 0 && (
            <Text style={styles.projectReason}>
              推荐理由�?
              {recommendation.reasons.join("�?)}
            </Text>
          )}

          <Pressable
            style={styles.projectButton}
            onPress={() =>
              handleProjectConnect(project)
           }
          >
            <Text style={styles.projectButtonText}>
              🤝 发起连接
            </Text>
          </Pressable>
        </View>
      );
    })
  )}
</View>

      {/* ======================================================
          Project Discovery / Investment Matching
          ====================================================== */}

      {profile.role === "投资�? && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            💰 项目 / 投资匹配
          </Text>

          {investmentMatches.length === 0 ? (
            <Text style={styles.emptyText}>
              当前暂无符合条件的项目�?
            </Text>
          ) : (
            investmentMatches.map(item => (
              <MatchCard
                key={`investment_${item.investmentMatch.id}`}
                id={
                  item.investmentMatch.id
                }
                targetId={
                  item.project.id
                }
                type="project"
                score={
                  item.investmentMatch.score
                }
                category={
                  item.investmentMatch.category
                }
                reason={
                  item.investmentMatch.reason
                    ? [
                        item.investmentMatch
                          .reason,
                      ]
                    : []
                }
                onConnect={() =>
                  handleInvestmentConnect(
                    item
                  )
                }
              />
            ))
          )}
        </View>
      )}

      {/* ======================================================
          Founder �?Investor Matching
          ====================================================== */}

      {profile.role === "创业�? && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            💰 投资人匹�?
          </Text>

          {founderInvestmentMatches.length ===
          0 ? (
            <Text style={styles.emptyText}>
              当前暂无符合条件的投资人�?
            </Text>
          ) : (
            founderInvestmentMatches.map(
              item => (
                <MatchCard
                  key={`founder_investment_${item.investmentMatch.id}`}
                  id={
                    item.investmentMatch.id
                  }
                  targetId={
                    item.investor.id
                  }
                  type="investor"
                  score={
                    item.investmentMatch.score
                  }
                  category={
                    item.investmentMatch.category
                  }
                  reason={
                    item.investmentMatch.reason
                      ? [
                          item.investmentMatch
                            .reason,
                        ]
                      : []
                  }
                  onConnect={() =>
                    handleFounderInvestmentConnect(
                      item
                    )
                  }
                />
              )
            )
          )}
        </View>
      )}

      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(
            "VENTURO AI MATCH REFRESH:",
            {
              userId: user.id,
              userRole: user.role,
              intelligenceRecommendations:
                intelligenceRecommendations.length,
              intelligenceMatches:
                intelligenceMatches.length,
              projectRecommendations:
                projectCandidates.length,
              investmentMatches:
                investmentMatches.length,
              founderInvestmentMatches:
                founderInvestmentMatches.length,
            }
          );
        }}
      >
        <Text style={styles.buttonText}>
          开始AI匹配
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },

  projectCard: {
    padding: 16,
    marginBottom: 14,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },

  projectName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  projectType: {
    fontSize: 14,
    marginBottom: 6,
  },

  projectStage: {
    fontSize: 14,
    marginBottom: 6,
  },

  projectScore: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  projectReason: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },

  projectButton: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#111",
    alignItems: "center",
  },

  projectButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#111",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
