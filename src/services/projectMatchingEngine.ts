import { Project } from "@/models/project";
import { UserProfile } from "@/models/profile";
import { allProfilesMock } from "@/data/allProfilesMockData";

export interface ProjectMatchResult {
  profile: UserProfile;
  score: number;
  reasons: string[];
}

/**
 * 项目与生态角色的专用匹配算法
 *
 * 注意：
 * 这里不调用 matchingEngine.ts。
 * matchingEngine.ts 专门负责 UserProfile ↔ UserProfile。
 * 本文件专门负责 Project ↔ UserProfile。
 */
export function calculateProjectProfileMatch(
  project: Project,
  profile: UserProfile
): ProjectMatchResult {
  let score = 0;
  const reasons: string[] = [];

  // 1. 行业匹配
  if (project.industry === profile.industry) {
    score += 30;
    reasons.push("行业方向高度匹配");
  }

  // 2. 赛道标签匹配
  const trackMatch =
    project.trackTags?.filter(tag =>
      profile.trackTags.includes(tag)
    ) ?? [];

  if (trackMatch.length > 0) {
    score += Math.min(trackMatch.length * 15, 30);

    reasons.push(
      `共同关注领域：${trackMatch.join("、")}`
    );
  }

  // 3. 项目需求 ↔ 用户能力匹配
  const needMatch =
    project.needTags?.filter(tag =>
      profile.skillTags.includes(tag)
    ) ?? [];

  if (needMatch.length > 0) {
    score += Math.min(needMatch.length * 10, 20);

    reasons.push(
      `能力与项目需求匹配：${needMatch.join("、")}`
    );
  }

  // 4. 项目资源需求 ↔ 用户角色匹配
  const roleMatch =
    project.resourceNeeds?.filter(resource =>
      profile.seekingRoles.includes(resource)
    ) ?? [];

  if (roleMatch.length > 0) {
    score += Math.min(roleMatch.length * 10, 20);

    reasons.push(
      `生态角色匹配：${roleMatch.join("、")}`
    );
  }

  return {
    profile,
    score: Math.min(score, 100),
    reasons,
  };
}

/**
 * 获取项目推荐的生态用户
 *
 * 默认推荐：
 * 投资人 + 专家/顾问 + 企业/产业合作方
 */
export function generateProjectMatches(
  project: Project,
  targetRoles?: UserProfile["role"][]
): ProjectMatchResult[] {
  const roles =
    targetRoles ?? [
      "投资人",
      "专家/顾问",
      "企业/产业合作方",
    ];

  return allProfilesMock
    .filter(profile =>
      roles.includes(profile.role)
    )
    .map(profile =>
      calculateProjectProfileMatch(
        project,
        profile
      )
    )
    .filter(result => result.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score
    );
}