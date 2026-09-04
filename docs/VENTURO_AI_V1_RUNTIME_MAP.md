# Venturo AI V1 Runtime Map

**Status:** Canonical  
**Version:** V1.0  
**Scope:** Venturo AI V1 Runtime  
**Baseline:** V0.3 Runtime `eb19ea3`

---

## 1. Purpose

This document defines the canonical runtime structure of Venturo AI V1.

It describes how the major V1 modules connect at runtime and how the existing V0.3 implementation maps into the target V1 architecture.

This document does not replace the V0.3 Runtime Map.

---

## 2. Runtime Architecture

The target V1 runtime is:

```text
UI
 ↓
Application / Orchestration
 ↓
Intelligence Runtime
 ├── Intelligence
 ├── Interest
 ├── Recommendation
 ├── Matching
 ├── Financing Matching
 └── Connection
 ↓
Domain Models
 ↓
Data Providers
```

The UI is responsible for presentation and user interaction.

Business rules should progressively move toward dedicated runtime services.

---

## 3. Intelligence Runtime

The V1 Intelligence Runtime consists of:

```text
Intelligence Data
      ↓
Intelligence Item
      ↓
Role / Context Filtering
      ↓
Relevance Calculation
      ↓
Ranking
      ↓
Intelligence Feed
      ↓
User Exposure
```

Core V0.3 implementation:

```text
src/services/intelligenceEngine.ts
src/services/intelligenceRelevanceEngine.ts
src/models/intelligence.ts
src/app/intelligence.tsx
```

---

## 4. Current V0.3 Intelligence Runtime

The current V0.3 implementation provides:

```text
intelligenceCenterMockData
        ↓
getIntelligenceFeed(role)
        ↓
IntelligenceItem[]
        ↓
rankIntelligence(user, items)
        ↓
Relevance Score
        ↓
Ranked Intelligence
```

The current Intelligence screen additionally connects the Intelligence Runtime with existing downstream capabilities.

```text
Intelligence Feed
      ↓
Interest Profile
      ↓
Recommendation
      ↓
Relevance Ranking
      ↓
Project Matching
      ↓
Behavior Tracking
```

These downstream connections are acknowledged as existing V0.3 runtime behavior.

They are not expanded as part of Relay 2.

---

## 5. Intelligence Engine

### Service

```text
src/services/intelligenceEngine.ts
```

### Responsibilities

- Load Intelligence Items
- Filter Intelligence by role
- Provide Intelligence Feed
- Provide Founder Opportunities
- Provide Investor Opportunities
- Provide Daily Insights

### Current interface

```text
getIntelligenceFeed(role)
getFounderOpportunities(role)
getInvestorOpportunities(role)
getDailyInsights(role)
```

The service currently uses:

```text
intelligenceCenterMockData
```

as its data provider.

---

## 6. Intelligence Relevance Engine

### Service

```text
src/services/intelligenceRelevanceEngine.ts
```

### Responsibilities

- Calculate Intelligence relevance
- Generate relevance reasons
- Rank Intelligence Items

Current relevance dimensions:

```text
Role
Industry
Track Tags
Need / Skill Tags
```

Current score model:

```text
Role          ≤ 30
Industry      ≤ 30
Track Tags    ≤ 30
Need / Skill  ≤ 10
-------------------
Total         ≤ 100
```

Current interfaces:

```text
calculateIntelligenceRelevance(
  user,
  item
)

rankIntelligence(
  user,
  items
)
```

This is the current V0.3 implementation foundation for V1 Intelligence relevance and ranking.

---

## 7. Intelligence Model

### Model

```text
src/models/intelligence.ts
```

### Core object

```text
IntelligenceItem
```

Important fields:

```text
id
type
targetRoles
title
description
category
reason
relatedTags
relatedCompanies
relatedProjects
relatedInvestors
relatedExperts
priority
industry
actionType
source
createdAt
```

The model supports:

- Intelligence classification
- Role targeting
- Industry relevance
- Tag relevance
- Related ecosystem objects
- Priority
- Recommended action
- Source tracking
- Temporal information

---

## 8. Intelligence Screen Runtime

### Application

```text
src/app/intelligence.tsx
```

The current runtime sequence is approximately:

```text
useUser()
   ↓
User + Profile
   ↓
getIntelligenceFeed(user.role)
   ↓
buildUserInterestProfile(user.id)
   ↓
getRecommendations(user, interestProfile)
   ↓
rankIntelligence(profile, intelligenceFeed)
   ↓
Category Filtering
   ↓
UI Sections
   ↓
Behavior Tracking
```

Current Intelligence UI sections include:

```text
IntelligenceHeader
PersonalRecommendationSection
DailyInsightSection
FounderOpportunitySection
InvestorOpportunitySection
IntelligenceFeed
AI Ecosystem Partner Recommendation
```

---

## 9. Behavior Integration

The current Intelligence screen already calls:

```text
trackBehavior()
```

for user interactions such as:

```text
view_intelligence
view_profile
```

This establishes an existing V0.3 connection between Intelligence exposure and Behavior.

The formal Interest / Behavior architecture is handled by Relay 3.

Relay 2 does not expand this implementation.

---

## 10. Recommendation Integration

The current Intelligence screen calls:

```text
buildUserInterestProfile()
getRecommendations()
```

This means V0.3 already contains an implementation path from Intelligence toward Recommendation.

For V1:

```text
Intelligence
      ↓
Interest / Context / Behavior
      ↓
Recommendation
```

The Recommendation Layer remains a separate architectural module.

Its formal implementation belongs to Relay 4.

---

## 11. Matching Integration

The current Intelligence screen also invokes:

```text
generateProjectMatches(project)
```

This demonstrates that the V0.3 runtime already exposes a path from Intelligence toward Project Matching.

For V1:

```text
Recommendation / Candidate
      ↓
Matching
      ↓
Compatibility
```

The Matching Layer remains architecturally independent.

Its formal implementation belongs to Relay 5.

---

## 12. Runtime Module Map

```text
┌─────────────────────────────┐
│             UI              │
│  Intelligence Screen        │
│  Intelligence Components    │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Application / Orchestration │
│ intelligence.tsx            │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Intelligence Runtime        │
├─────────────────────────────┤
│ intelligenceEngine          │
│ intelligenceRelevanceEngine │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Domain Models               │
│ IntelligenceItem            │
│ UserProfile                 │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Data Providers              │
│ intelligenceCenterMockData  │
└─────────────────────────────┘
```

Existing downstream runtime:

```text
                 ┌───────────────┐
                 ↓               │
          Interest Profile       │
                 ↓               │
          Recommendation         │
                 ↓               │
             Matching            │
                 ↓               │
             Behavior ───────────┘
```

---

## 13. V1 Target Runtime

The V1 target expands the runtime without requiring an immediate rewrite of the V0.3 implementation.

```text
UI
 ↓
Application / Orchestration
 ↓
Intelligence Runtime
 ↓
Interest Runtime
 ↓
Recommendation Runtime
 ↓
Matching Runtime
 ↓
Financing Matching Runtime
 ↓
Connection Runtime
 ↓
Domain Models
 ↓
Data Providers
```

The complete flywheel is:

```text
Intelligence
    ↓
Exposure
    ↓
Behavior
    ↓
Interest Profile
    ↓
Recommendation
    ↓
Candidate
    ↓
Matching
    ↓
Connection Intent
    ↓
Connection
    ↓
Collaboration
    ↓
Outcome
    ↓
Behavior
```

---

## 14. V0.3 → V1 Mapping

| V0.3 Component | V1 Runtime Role |
|---|---|
| `intelligenceEngine.ts` | Intelligence Feed / Candidate Generation |
| `intelligenceRelevanceEngine.ts` | Intelligence Relevance / Ranking |
| `intelligence.tsx` | Application / Orchestration |
| `IntelligenceItem` | Intelligence Domain Object |
| `intelligenceCenterMockData` | Temporary Intelligence Data Provider |
| `trackBehavior()` | Behavior Event Input |
| `buildUserInterestProfile()` | Interest Profile Input |
| `getRecommendations()` | Recommendation Runtime Input |
| `generateProjectMatches()` | Matching Runtime Input |

This mapping is descriptive.

It does not authorize refactoring these components during Relay 2.

---

## 15. Runtime Boundary Rules

### Intelligence

Owns:

- Intelligence Items
- Intelligence Feed
- Intelligence Relevance
- Intelligence Ranking

Does not own:

- Investment execution
- Autonomous negotiation
- Autonomous collaboration

### Recommendation

Owns:

- Candidate presentation
- Recommendation ranking
- Recommendation explanation

Does not replace Matching.

### Matching

Owns:

- Compatibility
- Matching scores
- Entity-to-entity matching

Does not replace Recommendation.

### Behavior

Owns:

- Behavioral events
- Behavioral signals

Does not directly become UI business logic.

---

## 16. V1 Runtime Migration Principle

Migration should proceed incrementally:

```text
Existing V0.3 Runtime
        ↓
Map to V1 Boundary
        ↓
Preserve Working Behavior
        ↓
Extract / Refine Runtime Services
        ↓
Adopt V1 Architecture
```

No large-scale rewrite is required merely because the V1 architecture is defined.

---

## 17. Relay 2 Scope

Relay 2 includes:

- Intelligence Runtime mapping
- Intelligence model mapping
- Intelligence relevance mapping
- Intelligence ranking mapping
- Intelligence explanation mapping
- V0.3 → V1 architecture documentation

Relay 2 excludes:

- New Interest Profile implementation
- New Behavior implementation
- New Recommendation implementation
- New Matching implementation
- Investment Matching implementation
- Connection implementation
- Autonomous Agent implementation

---

## 18. Current Decision

```text
V0.3 Intelligence Runtime = Existing
V1 Intelligence Architecture = Defined
V0.3 → V1 Mapping = Completed
Immediate Refactor = Not Required
Code Change in Relay 2 = 0
```

The V0.3 Intelligence implementation is therefore treated as the initial runtime foundation for V1 Intelligence.

**End of Runtime Map**