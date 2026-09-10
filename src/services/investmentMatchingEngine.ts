import { Project } from "@/models/project";
import { InvestorProfile } from "@/models/profile";
import { InvestmentMatch } from "@/models/matching";
import { allProfilesMock } from "@/data/allProfilesMockData";

const stageMap: Record<Project["stage"], string[]> = {
  Idea: ["pre_seed", "seed"],
  MVP: ["pre_seed", "seed", "pre_a"],
  Growth: ["pre_a", "series_a", "series_b_plus"],
  Scale: ["series_a", "series_b_plus"],
};

function calculateInvestmentStageScore(
  projectStage: Project["stage"],
  investmentStages: string[]
): number {
  const supportedStages = stageMap[projectStage];

  console.log(
  "VENTURO INVESTMENT STAGE DEBUG:",
  {
    projectStage,
    investmentStages,
    supportedStages,
  }
);

  return investmentStages.some((stage) => supportedStages.includes(stage))
    ? 20
    : 0;
}

function calculateTagScore(
  projectTags: string[] = [],
  investorTags: string[] = []
): number {
  const overlapCount = projectTags.filter((tag) =>
    investorTags.includes(tag)
  ).length;

  return Math.min(overlapCount * 10, 30);
}

function calculateNeedScore(
  projectNeeds: string[] = [],
  investorNeeds: string[] = [],
  investorResources: string[] = []
): number {
  const investorSignals = [...investorNeeds, ...investorResources];

  const overlapCount = projectNeeds.filter((tag) =>
    investorSignals.includes(tag)
  ).length;

  return Math.min(overlapCount * 10, 20);
}

export function calculateInvestmentMatch(
  project: Project,
  investor: InvestorProfile
): InvestmentMatch {
  let score = 0;
  const reasons: string[] = [];

  if (project.industry === investor.industry) {
    score += 30;
    reasons.push("行业匹配");
  }

  const tagScore = calculateTagScore(
    project.trackTags,
    investor.trackTags
  );

  if (tagScore > 0) {
    score += tagScore;
    reasons.push("赛道匹配");
  }

  const stageScore = calculateInvestmentStageScore(
    project.stage,
    investor.investmentStages
  );

  if (stageScore > 0) {
    score += stageScore;
    reasons.push("融资阶段匹配");
  }

  const needScore = calculateNeedScore(
    project.needTags,
    investor.needTags,
    investor.resources
  );

  if (needScore > 0) {
    score += needScore;
    reasons.push("投资需求匹配");
  }

  return {
    id: `investment_match_${project.id}_${investor.id}`,
    projectId: project.id,
    investorId: investor.id,
    score,
    reason:
      reasons.length > 0
        ? reasons.join("、")
        : "暂无明显匹配信号",
    category:
      reasons[0] === "行业匹配"
        ? "行业匹配"
        : reasons[0] === "融资阶段匹配"
          ? "阶段匹配"
          : reasons[0] === "投资需求匹配"
            ? "投资偏好"
            : "技术匹配",
    createdAt: new Date().toISOString(),
  };
}

export function generateInvestmentMatches(
  project: Project
): InvestmentMatch[] {
  const investors = allProfilesMock.filter(
    (profile): profile is InvestorProfile =>
      profile.role === "投资人"
  );

  return investors
    .map((investor) => calculateInvestmentMatch(project, investor))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);
}
