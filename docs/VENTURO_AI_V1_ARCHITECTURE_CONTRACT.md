# Venturo AI V1 Architecture Contract

**Status:** Canonical  
**Version:** V1.0  
**Scope:** Venturo AI V1 Architecture  
**Implementation Status:** Architecture Defined / Implementation Incremental  
**Baseline:** V0.3 Runtime `eb19ea3`

---

## 1. Purpose

This document defines the canonical architecture contract for Venturo AI V1.

It establishes:

- V1 architectural principles
- Core module boundaries
- Runtime responsibilities
- Data-layer boundaries
- V0.3 → V1 evolution rules
- V1 → V2 boundary
- Relay implementation boundaries

This document is the architectural constitution for Venturo AI V1.

---

## 2. Core Principle

Venturo AI V1 is built around an AI-driven venture ecosystem flywheel:

```text
AI Intelligence
      ↓
User Interest
      ↓
Recommendation
      ↓
Matching
      ↓
Connection
      ↓
Collaboration
      ↓
Behavior
      ↓
Interest Profile
      ↓
repeat
```

The architecture must preserve this closed loop.

---

## 3. V0.3 / V1 Relationship

The existing V0.3 Runtime is a stable baseline.

```text
V0.3 Runtime = FROZEN
V1 Architecture = DEFINED
V1 Implementation = INCREMENTAL
```

V1 must not break the stable V0.3 business model or existing user-facing functionality.

Existing V0.3 capabilities should be mapped into V1 architecture before any refactoring is considered.

Rule:

> Establish boundaries before moving code.

---

## 4. V1 Architecture Layers

Venturo AI V1 consists of the following logical layers:

```text
01 Intelligence Layer
02 User & Identity Layer
03 Interest & Behavior Layer
04 Recommendation Layer
05 Matching Layer
06 Investment / Financing Matching Layer
07 Connection Layer
08 Collaboration Layer
09 Data / Profile Layer
10 Agent Layer (Reserved)
```

The Agent Layer is reserved for future evolution.

V1 is **Agent-ready**, but the autonomous Agent Runtime is not activated in V1.

---

## 5. Core V1 Modules

### 5.1 Intelligence Layer

Responsibilities:

- Intelligence Feed
- Intelligence Items
- Industry and venture signals
- Trends
- Opportunities
- Intelligence relevance
- Intelligence ranking
- Intelligence explanation

The Intelligence Layer produces intelligence candidates and intelligence signals.

It does not independently perform autonomous investment, negotiation, or collaboration.

---

### 5.2 User & Identity Layer

Responsibilities:

- User identity
- User role
- User profile
- Permissions
- Ecosystem identity

The Identity Layer provides authoritative user identity information to other modules.

---

### 5.3 Interest & Behavior Layer

Responsibilities:

- User behavior events
- Interest signals
- Interest Profile
- Intent signals
- Profile updates derived from behavior

Behavior is an input to intelligence personalization and recommendation.

---

### 5.4 Recommendation Layer

Responsibilities:

- Personalized recommendations
- Candidate generation
- Candidate ranking
- Recommendation relevance
- Recommendation explanation

Recommendation answers:

> “现在应该给这个用户展示什么？”

Recommendation is not the same as Matching.

---

### 5.5 Matching Layer

Responsibilities:

- Profile matching
- Project matching
- Founder ↔ Investor matching
- Founder ↔ Expert matching
- Founder ↔ Enterprise matching
- Compatibility scoring

Matching answers:

> “这个用户与这个对象到底有多匹配？”

---

### 5.6 Investment / Financing Matching Layer

Responsibilities:

- Financing Requirement
- Investor Mandate
- Investment Matching
- Financing Recommendation
- Connection Intent

Core matching dimensions include:

- Industry
- Track
- Geography
- Business Model
- Funding Stage
- Target Amount
- Growth Signals
- Founder Profile
- Investor Profile
- Investment Thesis
- Ticket Size
- Preferred Stage
- Portfolio
- Investment Intent

---

### 5.7 Connection Layer

Responsibilities:

- Connection Intent
- Connection Request
- Connection State
- Basic connection lifecycle

The Connection Layer converts qualified matching results into potential ecosystem relationships.

---

### 5.8 Collaboration Layer

Responsibilities:

- Collaboration State
- Collaboration lifecycle
- Collaboration outcome signals

V1 provides the basic collaboration architecture.

Advanced autonomous collaboration belongs to V2.

---

### 5.9 Data / Profile Layer

The data architecture follows six logical levels:

```text
L0 Identity Data
L1 Domain Data
L2 Intelligence Data
L3 Behavior Data
L4 Derived Intelligence Data
L5 Outcome Data
```

These layers must not be mixed casually.

---

### 5.10 Agent Layer

The Agent Layer is reserved.

V1:

```text
Agent-ready = YES
Agent-active = NO
```

No autonomous Agent Runtime is required for V1.

---

## 6. Recommendation vs Matching

These concepts must remain architecturally separate.

### Recommendation

```text
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
Candidate Pool
```

Recommendation determines what should be presented to a user.

### Matching

```text
User / Project
      +
Target Object
      ↓
Compatibility
      ↓
Matching Score
```

Matching determines compatibility between entities.

Recommendation may invoke Matching.

Matching must not become a substitute for Recommendation.

---

## 7. Investment Matching Contract

The financing flow is:

```text
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
Connection
```

The architecture must preserve this sequence.

---

## 8. V1 Runtime Contract

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

UI components should not become the primary business-rule computation layer.

Existing V0.3 code may contain orchestration inside screens.

Such code should be treated as existing implementation debt, not as permission for uncontrolled refactoring during Relay implementation.

---

## 9. Data Flow Contract

The canonical V1 data flow is:

```text
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
```

This loop is the core V1 intelligence flywheel.

---

## 10. V1 / V2 Boundary

The following capabilities are explicitly outside V1 implementation scope:

- Autonomous AI Agent
- Digital Avatar
- Agent-to-Agent Collaboration
- Autonomous Investment Agent
- AI Negotiation
- AI Due Diligence Automation
- AI Pitch Room
- AI Meeting Intelligence
- AI-generated Podcast
- Video Ecosystem
- Web3 Data Asset
- Tokenomics
- On-chain Identity
- Data Marketplace
- Autonomous Transaction

These may be architecturally reserved but must not be implemented as part of V1 Relay work.

---

## 11. Relay Boundary

V1 implementation is divided into sequential Relays:

```text
Relay 2 — Intelligence Integration
Relay 3 — Interest / Behavior
Relay 4 — Recommendation
Relay 5 — Matching Core
Relay 6 — Investment Matching
Relay 7 — Connection / Collaboration
Relay 8 — V1 Integration
```

Each Relay must remain within its defined scope.

A later Relay must not be prematurely implemented during an earlier Relay unless required only for compatibility.

---

## 12. Relay 2 Contract

Relay 2 focuses exclusively on:

- Intelligence architecture
- Intelligence integration
- V0.3 → V1 Intelligence mapping
- Intelligence Item
- Intelligence Feed
- Intelligence relevance
- Intelligence ranking
- Intelligence explanation

Relay 2 does not implement:

- New Interest Profile logic
- New Behavior system
- New Recommendation system
- New Matching system
- Investment Matching
- Autonomous Agent functionality

Existing implementations of later-layer capabilities may be documented and mapped, but should not be expanded during Relay 2.

---

## 13. Compatibility Principle

Every V1 implementation must satisfy:

```text
Preserve V0.3
      +
Respect V1 Contract
      +
Minimize Code Change
```

Preferred evolution path:

```text
V0.3 Stable
    ↓
Architecture Contract
    ↓
Documentation
    ↓
Runtime Mapping
    ↓
Minimal Integration
    ↓
V1
```

Large refactors are not a prerequisite for V1 architecture.

---

## 14. Architectural Decision

For the current Relay 2 Intelligence audit:

```text
Architecture Contract = Defined
Intelligence Mapping = Required
V0.3 Runtime = Preserved
Code Refactor = Not Required
Code Change = 0
```

The existing Intelligence implementation provides sufficient foundation for the V1 Intelligence Layer.

Future changes should extend the architecture incrementally rather than replace the stable runtime without necessity.

---

## 15. Canonical Rule

When conflicts occur between implementation convenience and this architecture contract:

> The architecture contract defines the intended V1 boundary.

However, existing V0.3 behavior remains frozen until a controlled V1 migration explicitly replaces it.

**End of Contract**