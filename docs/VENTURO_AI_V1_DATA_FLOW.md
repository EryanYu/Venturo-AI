# Venturo AI V1 Data Flow

**Status:** Canonical  
**Version:** V1.0  
**Scope:** Venturo AI V1 Data Flow  
**Baseline:** V0.3 Runtime `eb19ea3`

---

## 1. Purpose

This document defines the canonical data flow for Venturo AI V1.

It establishes how Intelligence, User Interest, Behavior, Recommendation, Matching, Connection, Collaboration, and Outcomes form a continuous intelligence flywheel.

This document complements:

- `VENTURO_AI_V1_ARCHITECTURE_CONTRACT.md`
- `VENTURO_AI_V1_RUNTIME_MAP.md`

It does not replace historical V0.3 data-flow documentation.

---

## 2. Core V1 Data Flow

The canonical V1 flow is:

```text id="k0l1nm"
Intelligence
      ↓
Intelligence Item
      ↓
User Exposure
      ↓
Behavior Event
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
      ↓
Interest Profile Update
      ↓
repeat
```

This is the core Venturo AI V1 flywheel.

---

## 3. Data Layer Architecture

V1 data is organized into six logical layers:

```text id="s2cz5g"
L0 Identity Data
L1 Domain Data
L2 Intelligence Data
L3 Behavior Data
L4 Derived Intelligence Data
L5 Outcome Data
```

Each layer has a distinct responsibility.

---

## 4. L0 — Identity Data

L0 contains authoritative identity information.

Examples:

```text id="2oh9fn"
User
Role
Profile Identity
Permissions
Identity Attributes
```

Purpose:

- Identify the user
- Establish ecosystem role
- Provide authorization context
- Connect user activity to the ecosystem

L0 should remain stable and authoritative.

---

## 5. L1 — Domain Data

L1 contains ecosystem domain entities.

Examples:

```text id="brj4g1"
Project
Founder
Investor
Expert
Enterprise
Funding Requirement
Investment Mandate
```

Domain data represents real ecosystem objects.

These objects become candidates for Recommendation and Matching.

---

## 6. L2 — Intelligence Data

L2 contains intelligence produced or imported by the Intelligence Layer.

Examples:

```text id="4d1t4u"
IntelligenceItem
Signal
Trend
Opportunity
Insight
```

Current V0.3 implementation includes:

```text id="ecwq9t"
IntelligenceItem
intelligenceCenterMockData
```

The V1 architecture treats these as Intelligence-domain objects rather than merely UI content.

---

## 7. L3 — Behavior Data

L3 contains observable user interaction events.

Examples:

```text id="2t8w8q"
View
Click
Save
Share
Connection Intent
Match Response
Collaboration Action
```

Behavior data represents what the user actually does.

It should not be confused with inferred interest.

---

## 8. L4 — Derived Intelligence Data

L4 contains signals derived from identity, domain data, intelligence, and behavior.

Examples:

```text id="7i5p0n"
Interest Profile
Recommendation Score
Matching Score
Intent Score
Relevance Score
```

L4 is derived rather than directly observed.

The system may update L4 when new behavior or domain information becomes available.

---

## 9. L5 — Outcome Data

L5 contains meaningful ecosystem outcomes.

Examples:

```text id="7p4n8a"
Connection
Collaboration
Investment
Financing
Partnership
Project Outcome
```

Outcome data represents what happened after users interacted with the system.

Outcomes provide higher-value feedback to the intelligence flywheel.

---

## 10. Intelligence → Exposure

The Intelligence Layer produces an Intelligence Item.

```text id="j3i0mc"
Intelligence
      ↓
Intelligence Item
      ↓
Targeting / Relevance
      ↓
User Exposure
```

Current V0.3 implementation:

```text id="3n2j7w"
intelligenceCenterMockData
      ↓
getIntelligenceFeed(role)
      ↓
IntelligenceItem[]
      ↓
rankIntelligence(user, items)
```

The result is an ordered Intelligence Feed.

---

## 11. Exposure → Behavior

When a user interacts with an Intelligence Item, the system records behavior.

Example:

```text id="0kbr2c"
User
 ↓
View Intelligence
 ↓
Behavior Event
```

Current V0.3 implementation uses:

```text id="v0xjz3"
trackBehavior(
  "view_intelligence",
  user.id,
  item.id,
  item.relatedTags
)
```

This establishes the first feedback connection between Intelligence and Behavior.

---

## 12. Behavior → Interest Profile

Behavior is transformed into interest signals.

```text id="5v5n1a"
Behavior Events
      ↓
Behavior Signals
      ↓
Interest Profile
```

Examples of possible signals:

```text id="z8l8g6"
Repeated views
Saved intelligence
Repeated interaction with a track
Repeated interaction with an industry
Connection intent
Match response
```

The formal Interest / Behavior implementation belongs to Relay 3.

Relay 2 only establishes the data-flow boundary.

---

## 13. Interest Profile → Recommendation

The Interest Profile provides personalization signals to Recommendation.

```text id="7a3m3v"
Interest Profile
      +
Context
      +
Intelligence
      +
User Data
      ↓
Recommendation
```

Current V0.3 already contains:

```text id="v6q9av"
buildUserInterestProfile()
getRecommendations()
```

The formal Recommendation architecture belongs to Relay 4.

---

## 14. Recommendation → Candidate

Recommendation selects or ranks objects that may be useful to the user.

```text id="x9y9cz"
Recommendation
      ↓
Candidate Pool
```

Candidates may include:

- Intelligence
- Projects
- Investors
- Experts
- Enterprises
- Opportunities

Recommendation determines presentation relevance.

---

## 15. Candidate → Matching

Matching evaluates compatibility between the user and a candidate.

```text id="y1j6af"
Candidate
      ↓
Compatibility Evaluation
      ↓
Matching Score
      ↓
Matching Result
```

Matching may consider:

- Role
- Industry
- Track
- Skills
- Needs
- Geography
- Business Model
- Investment Thesis
- Funding Stage
- Ticket Size
- Other domain-specific constraints

Matching is separate from Recommendation.

The formal Matching architecture belongs to Relay 5.

---

## 16. Matching → Connection Intent

A sufficiently relevant matching result may generate a Connection Intent.

```text id="6o7w0j"
Matching Result
      ↓
Connection Intent
```

Connection Intent represents the user's willingness to initiate a relationship.

It is not yet a confirmed connection.

---

## 17. Connection Intent → Connection

The Connection Layer manages the transition from intent to relationship.

```text id="1v8p5b"
Connection Intent
      ↓
Connection Request
      ↓
Connection State
      ↓
Connection
```

The formal Connection architecture belongs to Relay 7.

---

## 18. Connection → Collaboration

A successful connection may develop into collaboration.

```text id="x7z8n4"
Connection
      ↓
Collaboration
      ↓
Collaboration State
```

Collaboration may include:

- Project cooperation
- Expert support
- Enterprise partnership
- Investment relationship
- Strategic cooperation

V1 provides basic collaboration architecture.

Autonomous collaboration belongs to V2.

---

## 19. Collaboration → Outcome

Collaboration may generate measurable ecosystem outcomes.

```text id="l7b8r1"
Collaboration
      ↓
Outcome
```

Possible outcomes:

```text id="4t3k6d"
Investment
Financing
Partnership
Project Progress
Commercial Cooperation
Other Ecosystem Outcome
```

Outcome data is high-value feedback for future intelligence.

---

## 20. Outcome → Behavior

Outcomes generate additional behavioral and learning signals.

```text id="7o1f4h"
Outcome
      ↓
Behavior / Outcome Signal
      ↓
Interest Profile Update
```

This closes the flywheel.

The system should learn not only from what users view, but also from what interactions eventually produce meaningful outcomes.

---

## 21. Intelligence Relevance Flow

The current V0.3 relevance engine uses:

```text id="m6r7q4"
UserProfile
      +
IntelligenceItem
      ↓
calculateIntelligenceRelevance()
      ↓
Score
      +
Reasons
```

Current relevance dimensions:

```text id="r0b4fz"
Role
Industry
Track Tags
Need / Skill Tags
```

Maximum score:

```text id="t3s1v7"
100
```

This is the V0.3 foundation for V1 Intelligence relevance.

---

## 22. Recommendation and Matching Separation

The data flow must preserve the distinction:

```text id="j0t0nq"
Recommendation
= What should be shown?

Matching
= How compatible are they?
```

Therefore:

```text id="x3m5sp"
Interest
   +
Context
   +
Behavior
   +
Intelligence
      ↓
Recommendation
      ↓
Candidate
      ↓
Matching
      ↓
Compatibility
```

Matching should not be used as a replacement for Recommendation.

---

## 23. Investment / Financing Data Flow

The financing-specific flow is:

```text id="0j2h5m"
Financing Intent
      ↓
Project Financing Profile
      ↓
Investor Mandate
      ↓
Eligibility Filter
      ↓
Compatibility Score
      ↓
Investment Recommendation
      ↓
Connection Intent
      ↓
Connection
```

Relevant data includes:

### Project / Founder

```text id="z9t4kh"
Project
Funding Requirement
Funding Stage
Target Amount
Industry
Track
Geography
Business Model
Growth Signal
Founder Profile
```

### Investor

```text id="3y4h9n"
Investor Profile
Investment Thesis
Ticket Size
Preferred Stage
Portfolio
Investment Intent
```

Formal implementation belongs to Relay 6.

---

## 24. Data Provenance

Each derived signal should have a clear conceptual source.

```text id="4r2m0c"
Identity
   ↓
Domain Data
   ↓
Intelligence
   ↓
Behavior
   ↓
Derived Intelligence
   ↓
Outcome
```

Derived intelligence must not be treated as raw user-provided facts.

Outcome data must remain distinguishable from inferred interest.

---

## 25. Feedback Loop

The V1 feedback loop is:

```text id="3z8f4p"
User
 ↓
Exposure
 ↓
Behavior
 ↓
Interest
 ↓
Recommendation
 ↓
Matching
 ↓
Connection
 ↓
Collaboration
 ↓
Outcome
 ↓
Behavior
```

This loop is the foundation for progressively improving personalization and ecosystem matching.

---

## 26. V0.3 → V1 Data Flow Mapping

| V0.3 Implementation | V1 Data Flow Role |
|---|---|
| `IntelligenceItem` | L2 Intelligence Data |
| `intelligenceCenterMockData` | L2 Data Provider |
| `getIntelligenceFeed()` | Intelligence → Exposure |
| `rankIntelligence()` | L2 → L4 Relevance |
| `trackBehavior()` | Exposure → L3 Behavior |
| `buildUserInterestProfile()` | L3 → L4 Interest |
| `getRecommendations()` | L4 → Recommendation |
| `generateProjectMatches()` | Candidate → Matching |
| Connection routing | Matching → Connection boundary |

This mapping does not require immediate code migration.

---

## 27. Data Boundary Rules

### L0 Identity

Authoritative identity only.

### L1 Domain

Business entities only.

### L2 Intelligence

Intelligence and signals only.

### L3 Behavior

Observed actions only.

### L4 Derived Intelligence

Computed or inferred signals only.

### L5 Outcome

Confirmed ecosystem results only.

These layers should remain conceptually separate even when implementation uses shared storage or models.

---

## 28. Relay Boundaries

### Relay 2

Focus:

```text
Intelligence
Intelligence Item
Relevance
Ranking
Exposure Boundary
```

### Relay 3

Focus:

```text
Behavior
Interest
Intent
Interest Profile
```

### Relay 4

Focus:

```text
Recommendation
Candidate Ranking
Recommendation Explanation
```

### Relay 5

Focus:

```text
Matching
Compatibility
Profile / Project Matching
```

### Relay 6

Focus:

```text
Financing Requirement
Investor Mandate
Investment Matching
```

### Relay 7

Focus:

```text
Connection
Collaboration
```

### Relay 8

Focus:

```text
Full V1 Integration
Flywheel Validation
```

---

## 29. V1 / V2 Data Boundary

The following data capabilities are outside V1:

```text id="e0b7rf"
Digital Avatar Data
Agent-to-Agent State
Autonomous Investment State
AI Negotiation State
Web3 Data Asset
On-chain Identity
Tokenomics
Data Marketplace
Autonomous Transaction
```

These may be reserved for future architecture but must not be introduced into V1 data flow.

---

## 30. Current Decision

```text id="5b2k7x"
V1 Data Flow = Defined
V0.3 Data Flow = Preserved
V0.3 → V1 Mapping = Completed
Relay 2 Data Expansion = Not Required
Code Change = 0
```

The current V0.3 Intelligence implementation provides sufficient data-flow foundations for Relay 2.

The next Relays progressively activate the remaining portions of the V1 flywheel.

**End of Data Flow**