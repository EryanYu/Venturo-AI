import { aiRecommendationMockData } from "@/data/aiRecommendationMockData";
import { User } from "@/models/user";
import {UserInterestProfile,} from "@/services/userInterestProfile";
import { getBehaviorEvents } from "@/services/behaviorTracker";


export function getRecommendations(
  user: User,
  interestProfile: UserInterestProfile
) {

  const behaviorEvents = getBehaviorEvents();

  const recommendations = aiRecommendationMockData
    .filter(item => item.targetRoles.includes(user.role))
    .map(item => {
      const priorityMap: Record<string, number> = {
        high: 30,
        medium: 20,
        low: 10,
      };

      let score = priorityMap[item.priority || "low"];

      const interestMatchScore =
  item.relatedTags.reduce(
    (total, tag) => {
      const interest =
        interestProfile.interests.find(
          item => item.tag === tag
        );

      return total + (interest?.score || 0);
    },
    0
  );

score += interestMatchScore;

      const viewedRelatedInvestor = behaviorEvents.some(
        event =>
          event.type === "view_profile" &&
          event.userId === user.id &&
          item.relatedInvestors?.includes(event.targetId)
      );

      const interestedRelatedInvestor = behaviorEvents.some(
        event =>
          event.type === "connection_intent" &&
          event.userId === user.id &&
          item.relatedInvestors?.includes(event.targetId)
      );

      if (viewedRelatedInvestor) {
        score += 10;
      }

      if (interestedRelatedInvestor) {
        score += 20;
      }

      return {
        ...item,
        recommendationScore: score,
      };
    })
    .sort(
      (a, b) =>
        (b.recommendationScore || 0) -
        (a.recommendationScore || 0)
    );



  return recommendations;
}