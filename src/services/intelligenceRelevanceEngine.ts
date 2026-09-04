import { IntelligenceItem } from "@/models/intelligence";
import { UserProfile } from "@/models/profile";

export interface IntelligenceRelevanceResult {
  score: number;
  reasons: string[];
}

export function calculateIntelligenceRelevance(
  user: UserProfile,
  item: IntelligenceItem
): IntelligenceRelevanceResult {

  let score = 0;

  const reasons: string[] = [];

  // 1. Role relevance
  if (
    item.targetRoles.length === 0 ||
    item.targetRoles.includes(user.role)
  ) {
    score += 30;

    reasons.push(
      "与你的生态角色相关"
    );
  }

  // 2. Industry relevance
  if (
    item.industry &&
    user.industry &&
    item.industry === user.industry
  ) {
    score += 30;

    reasons.push(
      "与你所在行业相关"
    );
  }

  // 3. Track tag relevance
  const trackMatches =
    user.trackTags.filter(
      tag =>
        item.relatedTags.includes(tag)
    );

  if (trackMatches.length > 0) {

    const trackScore =
      Math.min(
        trackMatches.length * 10,
        30
      );

    score += trackScore;

    reasons.push(
      `与你的赛道标签匹配：${trackMatches.join("、")}`
    );
  }

  // 4. Need / skill relevance
  const profileCapabilityTags = [
    ...user.needTags,
    ...user.skillTags,
  ];

  const capabilityMatches =
    profileCapabilityTags.filter(
      tag =>
        item.relatedTags.includes(tag)
    );

  if (capabilityMatches.length > 0) {

    const capabilityScore =
      Math.min(
        capabilityMatches.length * 5,
        10
      );

    score += capabilityScore;

    reasons.push(
      `与你的需求/能力相关：${capabilityMatches.join("、")}`
    );
  }

  return {
    score: Math.min(score, 100),
    reasons,
  };
}

  export function rankIntelligence(
  user: UserProfile,
  items: IntelligenceItem[]
): {
  item: IntelligenceItem;
  relevance: IntelligenceRelevanceResult;
}[] {

  return items
    .map(item => ({
      item,
      relevance: calculateIntelligenceRelevance(
        user,
        item
      ),
    }))
    .sort(
      (a, b) =>
        b.relevance.score -
        a.relevance.score
    );
}
