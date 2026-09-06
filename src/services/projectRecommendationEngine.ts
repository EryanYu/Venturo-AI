import { UserProfile } from "@/models/profile";
import { UserInterestProfile } from "@/models/interest";
import { Recommendation } from "@/models/recommendation";
import { Project } from "@/models/project";
import { Opportunity } from "@/models/opportunity";

import { projectMockData } from "@/data/projectMockData";
import { opportunityMockData } from "@/data/opportunityMockData";
import { allProfilesMock } from "@/data/allProfilesMockData";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}



function getMatchedTags(
  tags: string[] | undefined,
  interestProfile: UserInterestProfile
): string[] {
  if (!tags?.length) {
    return [];
  }

  const interestTags = new Set(
    interestProfile.interests.map(item => normalize(item.tag))
  );

  return tags.filter(tag =>
    interestTags.has(normalize(tag))
  );
}

function getProjectRecommendation(
  userProfile: UserProfile,
  interestProfile: UserInterestProfile,
  project: Project
): Recommendation {
  let score = 0;
  const reasons: string[] = [];

  const industryMatch =
    normalize(project.industry) ===
    normalize(userProfile.industry);

  if (industryMatch) {
    score += 25;
    reasons.push("与用户所属行业方向匹配");
  }

  const trackMatches = getMatchedTags(
    project.trackTags,
    interestProfile
  );

  if (trackMatches.length > 0) {
    score += Math.min(trackMatches.length * 10, 30);
    reasons.push(
      `与兴趣标签匹配：${trackMatches.join("、")}`
    );
  }

  const needMatches = getMatchedTags(
    project.needTags,
    interestProfile
  );

  if (needMatches.length > 0) {
    score += Math.min(needMatches.length * 8, 20);
    reasons.push(
      `项目需求与你的兴趣相关：${needMatches.join("、")}`
    );
  }

  const resourceMatches = getMatchedTags(
    project.resourceNeeds,
    interestProfile
  );

  if (resourceMatches.length > 0) {
    score += Math.min(resourceMatches.length * 5, 10);
    reasons.push(
      `项目资源需求与你关注的方向相关：${resourceMatches.join("、")}`
    );
  }

  if (project.fundingStatus === "融资中") {
    score += 5;
    reasons.push("项目当前处于融资阶段");
  }

  if (reasons.length === 0) {
    reasons.push("项目与当前用户兴趣存在基础相关性");
  }

  return {
    id: `${userProfile.userId}_${project.id}`,
    type: "project",
    sourceId: userProfile.userId,
    targetId: project.id,
    title: project.name,
    description: project.description,
    category: project.industry,
    score,
    reasons,
    createdAt: new Date().toISOString(),
  };
}

function getOpportunityRecommendation(
  userProfile: UserProfile,
  interestProfile: UserInterestProfile,
  opportunity: Opportunity,
  project: Project
): Recommendation {
  const projectRecommendation =
    getProjectRecommendation(
      userProfile,
      interestProfile,
      project
    );

  let score = Math.round(
    projectRecommendation.score * 0.7
  );

  const reasons = [
    `关联项目：${project.name}`,
  ];

  const roleMatched =
    opportunity.targetRoles.includes(
      userProfile.role
    ) ||
    opportunity.targetRoles.some(role =>
      userProfile.seekingRoles.includes(role)
    );

  if (roleMatched) {
    score += 20;
    reasons.push("机会目标角色与你的生态角色匹配");
  }

  if (opportunity.status === "开放") {
    score += 10;
    reasons.push("机会当前开放");
  }

  if (opportunity.type) {
    reasons.push(
      `机会类型：${opportunity.type}`
    );
  }

  return {
    id: `${userProfile.userId}_${opportunity.id}`,
    type: "opportunity",
    sourceId: userProfile.userId,
    targetId: opportunity.id,
    title: opportunity.title,
    description: opportunity.description,
    category: opportunity.type,
    score,
    reasons,
    createdAt: new Date().toISOString(),
  };
}

function getProfileRecommendation(
  userProfile: UserProfile,
  interestProfile: UserInterestProfile,
  target: UserProfile,
  type: "investor" | "expert"
): Recommendation {
  let score = 0;
  const reasons: string[] = [];

  if (
    normalize(target.industry) ===
    normalize(userProfile.industry)
  ) {
    score += 25;
    reasons.push("行业方向匹配");
  }

  const trackMatches = getMatchedTags(
    target.trackTags,
    interestProfile
  );

  if (trackMatches.length > 0) {
    score += Math.min(trackMatches.length * 10, 30);
    reasons.push(
      `与你关注的方向匹配：${trackMatches.join("、")}`
    );
  }

  const needMatches = getMatchedTags(
    target.needTags,
    interestProfile
  );

  if (needMatches.length > 0) {
    score += Math.min(needMatches.length * 8, 20);
    reasons.push(
      `其需求与你关注的方向相关：${needMatches.join("、")}`
    );
  }

  const skillMatches = getMatchedTags(
    target.skillTags,
    interestProfile
  );

  if (skillMatches.length > 0) {
    score += Math.min(skillMatches.length * 5, 15);
    reasons.push(
      `相关能力标签：${skillMatches.join("、")}`
    );
  }

  const intentMatch =
    interestProfile.intentSignals.some(
      signal =>
        signal.targetId === target.id ||
        signal.targetId === target.userId
    );

  if (intentMatch) {
    score += 20;
    reasons.push("用户已有主动连接意向");
  }

  if (reasons.length === 0) {
    reasons.push("与当前兴趣画像存在基础相关性");
  }

  return {
    id: `${userProfile.userId}_${target.id}`,
    type,
    sourceId: userProfile.userId,
    targetId: target.id,
    title: target.name,
    description: target.description,
    category: target.role,
    score,
    reasons,
    createdAt: new Date().toISOString(),
  };
}

export function generateProjectRecommendations(
  userProfile: UserProfile,
  interestProfile: UserInterestProfile
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // 1. Project
  projectMockData.forEach(project => {
    recommendations.push(
      getProjectRecommendation(
        userProfile,
        interestProfile,
        project
      )
    );
  });

  // 2. Opportunity
  opportunityMockData.forEach(opportunity => {
    const project = projectMockData.find(
      item => item.id === opportunity.projectId
    );

    if (!project) {
      return;
    }

    recommendations.push(
      getOpportunityRecommendation(
        userProfile,
        interestProfile,
        opportunity,
        project
      )
    );
  });

  // 3. Investor / Expert
  allProfilesMock
    .filter(
      profile =>
        profile.role === "投资人" ||
        profile.role === "专家/顾问"
    )
    .forEach(profile => {
      const type =
        profile.role === "投资人"
          ? "investor"
          : "expert";

      recommendations.push(
        getProfileRecommendation(
          userProfile,
          interestProfile,
          profile,
          type
        )
      );
    });

  return recommendations.sort(
    (a, b) => b.score - a.score
  );
}