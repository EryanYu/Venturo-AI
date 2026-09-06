import {
  buildUserInterestProfile,
} from "@/services/userInterestProfile";

import {
  generateProjectRecommendations,
} from "@/services/projectRecommendationEngine";

import {
  founderProfileMock,
} from "@/data/profileMockData";

const userProfile = founderProfileMock;

const interestProfile =
  buildUserInterestProfile(userProfile.userId);

const recommendations =
  generateProjectRecommendations(
    userProfile,
    interestProfile
  );

console.log(
  "PROJECT RECOMMENDATION TEST RESULT:",
  recommendations
);

if (recommendations.length === 0) {
  throw new Error(
    "Expected project recommendations, got 0"
  );
}

const projectRecommendations =
  recommendations.filter(
    item => item.type === "project"
  );

const opportunityRecommendations =
  recommendations.filter(
    item => item.type === "opportunity"
  );

const investorRecommendations =
  recommendations.filter(
    item => item.type === "investor"
  );

const expertRecommendations =
  recommendations.filter(
    item => item.type === "expert"
  );

if (projectRecommendations.length === 0) {
  throw new Error(
    "Expected at least one project recommendation"
  );
}

if (opportunityRecommendations.length === 0) {
  throw new Error(
    "Expected at least one opportunity recommendation"
  );
}

if (investorRecommendations.length === 0) {
  throw new Error(
    "Expected at least one investor recommendation"
  );
}

if (expertRecommendations.length === 0) {
  throw new Error(
    "Expected at least one expert recommendation"
  );
}

const sorted = recommendations.every(
  (item, index) =>
    index === 0 ||
    recommendations[index - 1].score >= item.score
);

if (!sorted) {
  throw new Error(
    "Recommendations are not sorted by descending score"
  );
}

console.log(
  "PROJECT RECOMMENDATION TEST PASSED"
);