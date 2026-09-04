import {
  testUserInterestProfile,
} from "@/services/userInterestProfile";

const profile =
  testUserInterestProfile();

console.log(
  "TEST RESULT:",
  profile
);

const aiAgentInterest =
  profile.interests.find(
    item => item.tag === "AI Agent"
  );

if (
  !aiAgentInterest ||
  aiAgentInterest.score !== 11
) {
  throw new Error(
    `Expected AI Agent score to be 11, got ${
      aiAgentInterest?.score ?? "undefined"
    }`
  );
}

console.log(
  "USER INTEREST PROFILE TEST PASSED"
);