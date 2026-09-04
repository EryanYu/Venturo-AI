import {
  getBehaviorEvents,
  BehaviorEvent,
  BehaviorEventType,
  trackBehavior
} from "@/services/behaviorTracker";

export interface UserInterestProfile {
  userId: string;
  interests: {
    tag: string;
    score: number;
  }[];
}

export function buildUserInterestProfile(
  userId: string
): UserInterestProfile {
  const behaviorEvents = getBehaviorEvents();

  const tagScores = new Map<string, number>();

const behaviorWeights: Record<BehaviorEventType, number> = {
  view_intelligence: 1,
  view_project: 2,
  view_profile: 3,
  connection_intent: 5,
};

  behaviorEvents
    .filter(
      (event: BehaviorEvent) =>
        event.userId === userId && event.tags?.length
    )
    .forEach((event: BehaviorEvent) => {
      event.tags?.forEach(tag => {
  const currentScore = tagScores.get(tag) || 0;
  const weight = behaviorWeights[event.type] || 1;

  tagScores.set(
    tag,
    currentScore + weight
  );
});
    });



  const interests = Array.from(tagScores.entries())
    .map(([tag, score]) => ({
      tag,
      score,
    }))
    .sort((a, b) => b.score - a.score);



  return {
    userId,
    interests,
  };
}


export function testUserInterestProfile() {

  trackBehavior(
    "view_intelligence",
    "001",
    "test_intelligence_001",
    ["AI Agent"]
  );

  trackBehavior(
    "view_project",
    "001",
    "test_project_001",
    ["AI Agent"]
  );

  trackBehavior(
    "view_profile",
    "001",
    "test_profile_001",
    ["AI Agent"]
  );

  trackBehavior(
    "connection_intent",
    "001",
    "test_connection_001",
    ["AI Agent"]
  );

  const profile =
    buildUserInterestProfile("001");

  console.log(
    "VENTURO INTEREST PROFILE TEST:",
    profile
  );

  return profile;
}