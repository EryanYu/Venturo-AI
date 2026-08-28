# Venturo AI Intelligence & Connection Architecture

Version: v1.0

---

## 1. Architecture Overview

Venturo AI is an AI-driven venture ecosystem platform.

The platform is organized into four technical modules:

1. Intelligence
2. Connection
3. AI Agent
4. Core Platform

The first three are business-facing capability layers.

Core Platform provides the shared technical foundation for all business modules.

```text
                         Venturo AI
                             |
        +--------------------+--------------------+
        |                    |                    |
        v                    v                    v
 Intelligence          Connection             AI Agent
 情报与机会             人脉与项目连接          智能代理
        |                    |                    |
        +--------------------+--------------------+
                             |
                             v
                      Core Platform
                             |
        +--------------------+--------------------+
        |          |          |         |         |
      User      Profile    Matching  Recommendation
      Data       System     Engine      Engine


2. Module 1 — Intelligence
2.1 Purpose
Intelligence is the information and opportunity discovery layer of Venturo AI.
Its purpose is to help users understand:
- What is happening
- What is changing
- What opportunities are emerging
- What opportunities are relevant to the user
2.2 Current capabilities
Intelligence
|
+-- AI Daily Insights
|
+-- Founder Opportunities
|
+-- Investor Opportunities
2.3 Product logic
Information
    |
    v
AI Analysis
    |
    v
Insight
    |
    v
Opportunity
    |
    v
User Decision
Intelligence is responsible for discovering and explaining opportunities.
It is not responsible for directly managing relationships.
2.4 Future evolution
Potential future sources include:
- News
- Industry reports
- Public company information
- Startup databases
- Investment data
- Market data
- External intelligence APIs
- LLM-generated analysis
3. Module 2 — Connection
3.1 Purpose
Connection is the relationship and matching layer.
It answers:
Who should I meet?

and:
Which project or opportunity should I connect with?

3.2 Current capabilities
Connection
|
+-- People Recommendation
|
+-- Project Matching
3.3 Matching dimensions
Matching may use:
- User role
- Industry
- City
- Track tags
- Need tags
- Skill tags
- Expertise
- Experience
- Investment stage
- Ticket size
- Industry needs
- Cooperation types
- Project requirements
- Funding requirements
3.4 Relationship flow
User Profile
     |
     v
Matching Engine
     |
     v
Recommendation
     |
     v
Connection
     |
     v
Conversation
     |
     v
Project / Investment / Cooperation
3.5 Future project workflow
Discover
   |
   v
Match
   |
   v
Connect
   |
   v
Communicate
   |
   v
Due Diligence
   |
   v
Investment / Financing / Cooperation
Connection therefore acts as the bridge between user intelligence and real-world relationships. 

4. Module 3 — AI Agent
4.1 Purpose
AI Agent is the intelligent assistance and future execution layer.
Unlike Intelligence, which primarily discovers information, AI Agent focuses on:
- Understanding user context
- Providing personalized recommendations
- Generating action plans
- Assisting with decisions
- Eventually executing tasks on behalf of users
4.2 Current capability
The current stage focuses on:
AI Agent Suggestions
4.3 Future capabilities
AI Agent
|
+-- Founder Agent
|
+-- Investor Agent
|
+-- Enterprise Agent
|
+-- Project Financing Agent
|
+-- GEO Agent
|
+-- Personal AI Agent
|
+-- Digital Twin
4.4 Future direction
Understand
    |
    v
Reason
    |
    v
Recommend
    |
    v
Plan
    |
    v
Execute
AI Agent is intentionally kept independent from the current recommendation models.


5. Module 4 — Core Platform
Core Platform provides shared technical infrastructure.
5.1 User
The User model represents the platform account and basic user state.
User
|
+-- id
+-- name
+-- role
+-- points
+-- aiLevel
+-- createdAt
5.2 User Profile
UserProfile represents the user's structured professional identity.
UserProfile
|
+-- identity
+-- role
+-- industry
+-- city
+-- trackTags
+-- needTags
+-- skillTags
+-- description
Role-specific profiles extend UserProfile:
UserProfile
|
+-- FounderProfile
+-- InvestorProfile
+-- ExpertProfile
+-- EnterpriseProfile
5.3 Matching Engine
The Matching Engine calculates compatibility between profiles.
Source Profile
      |
      v
Matching Engine
      |
      v
MatchResult
      |
      +-- score
      +-- reasons
The Matching Engine should remain independent from UI components.
5.4 Profile Recommendation Engine
The Profile Recommendation Engine transforms matching results into profile recommendations.
UserProfile
     |
     v
Matching Engine
     |
     v
Profile Recommendation Engine
     |
     v
ProfileRecommendation
5.5 Recommendation Engine
Recommendation Engine manages recommendation-oriented business logic.
It should not become a universal container for every recommendation type.

6. Recommendation Type Boundaries
Venturo AI must keep different recommendation concepts separate.
6.1 AI Insight
AIInsight
Purpose:
- Information
- Trend
- Analysis
- Market intelligence
6.2 Opportunity
Opportunity
Purpose:
- Startup opportunities
- Investment opportunities
- Ecosystem opportunities
6.3 Profile Recommendation
ProfileRecommendation
Purpose:
- Recommended people
- Experts
- Investors
- Founders
- Enterprises
6.4 Project Match
ProjectMatch
Purpose:
- Project compatibility
- Investment matching
- Cooperation matching
6.5 Connection
Connection
Purpose:
- Represents an actual relationship or connection between users/projects.
The above concepts should not be forced into one universal TypeScript interface.


7. Data Architecture
Current development uses local mock data.
src/data/
|
+-- profileMockData.ts
+-- allProfilesMockData.ts
+-- aiRecommendationMockData.ts
+-- recommendationMockData.ts
+-- investorRecommendationMockData.ts
+-- expertMockData.ts
Mock data is development infrastructure, not the final data architecture.
Future data sources
External Data
     |
     +-- News
     +-- Market Data
     +-- Investment Data
     +-- Company Data
     +-- Startup Data
     |
     v
Data Processing
     |
     v
AI / LLM
     |
     v
Venturo AI Data Layer
Potential future infrastructure:
- API services
- Database
- Vector Database
- Search
- Embedding
- LLM
- External intelligence providers


8. Frontend Architecture
The frontend should follow:
Model
  |
  v
Data
  |
  v
Service / Engine
  |
  v
Component
  |
  v
Screen
Intelligence
/intelligence
|
+-- Intelligence Header
+-- Daily Insights
+-- Founder Opportunities
+-- Investor Opportunities
+-- Profile Recommendations
Connection
Future structure:
/connections
|
+-- People
+-- Projects
+-- Matches
+-- Connections
AI Agent
Future structure:
/agent
|
+-- Agent Suggestions
+-- Agent Workspace
+-- Agent Actions


9. Current Architecture
Current implementation:
User
 |
 v
UserContext / UserStore
 |
 v
UserProfile
 |
 +----------------------+
 |                      |
 v                      v
Matching Engine     Intelligence
 |                      |
 v                      |
Profile Recommendation  |
Engine                   |
 |                      |
 +----------+-----------+
            |
            v
      Intelligence UI
Current focus is on establishing stable profile matching and recommendation infrastructure.


10. Future Architecture
The long-term architecture evolves toward:
                         Venturo AI
                             |
       +---------------------+---------------------+
       |                     |                     |
       v                     v                     v
 Intelligence          Connection             AI Agent
       |                     |                     |
       |                     |                     +-- GEO
       |                     |                     +-- Digital Twin
       |                     |                     +-- Actions
       |                     |
       |                     +-- People
       |                     +-- Projects
       |                     +-- Financing
       |                     +-- Cooperation
       |
       +-- Insights
       +-- Opportunities
       +-- Market Intelligence
                             |
                             v
                      Core Platform
                             |
       +---------------------+---------------------+
       |          |          |          |          |
      User     Profile    Matching  Recommendation Data


11. Core Product Loop
The three business layers form a continuous product loop.
Intelligence
     |
     v
Discover Opportunity
     |
     v
Connection
     |
     v
Find People / Projects
     |
     v
Build Relationship
     |
     v
AI Agent
     |
     v
Recommend / Plan / Execute
     |
     v
New Data
     |
     v
Intelligence
This loop is one of the core strategic foundations of Venturo AI.


12. Development Principles
Principle 1 — Clear responsibilities
Each model, service, engine and component should have a single primary responsibility.
Principle 2 — Separate business concepts
AI Insight, Opportunity, Profile Recommendation, Project Match and Connection should remain distinct concepts.
Principle 3 — Engine/UI separation
Business logic should not be embedded directly inside screen components.
Principle 4 — Mock data isolation
Mock data should be replaceable by APIs or databases without requiring major UI redesign.
Principle 5 — Future AI compatibility
Current architecture should allow future integration of:
- LLM
- Embeddings
- Vector Search
- Agent systems
- Personalized AI
- Digital Twin
- GEO
Principle 6 — Incremental implementation
Future functionality should be introduced layer by layer.
Do not implement future Agent, GEO or Digital Twin functionality prematurely.


13. Development Roadmap
Phase 1 — Intelligence Foundation
Current / next-stage focus:
- AI Daily Insights
- Founder Opportunities
- Investor Opportunities
- Unified Intelligence UI
Phase 2 — Connection
- People Recommendation
- Project Matching
- Match Scoring
- Connection workflow
Phase 3 — Project & Financing Workflow
- Project discovery
- Investor matching
- Financing workflow
- Due diligence preparation
- Cooperation workflow
Phase 4 — AI Agent
- Personalized Agent Suggestions
- Context-aware recommendations
- Action planning
- Agent workspace
Phase 5 — Advanced AI
- GEO
- Personal AI Agent
- Digital Twin
- Agent execution
- Intelligent ecosystem automation
Phase 6 — Future Web3 Evolution
Potential future capabilities:
- User-controlled data
- On-chain data assets
- Data marketplace
- Tokenization
- Decentralized identity
- Web3 ecosystem participation


14. Architecture Baseline
Version: v1.0
This document defines the initial technical architecture boundary for:
- Intelligence
- Connection
- AI Agent
- Core Platform
Future implementation should extend this architecture rather than introduce overlapping or conflicting abstractions without architectural review.