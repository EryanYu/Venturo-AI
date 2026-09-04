import {
  aiRecommendationMockData,
} from "@/data/aiRecommendationMockData";

import {
  User,
} from "@/models/user";

import {
  getBehaviorEvents,
} from "@/services/behaviorTracker";

export function getRecommendations(
  user: User
) {

  const events =
    getBehaviorEvents()
      .filter(
        event =>
          event.userId === user.id
      );

  const priorityMap: Record<
    string,
    number
  > = {
    high: 30,
    medium: 20,
    low: 10,
  };

  const recommendations =
    aiRecommendationMockData
      .filter(
        item =>
          item.targetRoles.includes(
            user.role
          )
      )
      .map(item => {

        let score =
          priorityMap[
            item.priority || "low"
          ];

        for (const event of events) {

          if (
            event.type ===
            "view_project" &&
            item.relatedProjects?.includes(
              event.targetId
            )
          ) {
            score += 8;
          }

          if (
            event.type ===
            "view_profile" &&
            item.relatedInvestors?.includes(
              event.targetId
            )
          ) {
            score += 10;
          }

          if (
            event.type ===
            "view_profile" &&
            item.relatedExperts?.includes(
              event.targetId
            )
          ) {
            score += 10;
          }

          if (
            event.type ===
            "view_intelligence" &&
            item.relatedTags?.includes(
              event.targetId
            )
          ) {
            score += 5;
          }
        }

        return {
          item,
          score,
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score
      );

  return recommendations.map(
    result => result.item
  );
}