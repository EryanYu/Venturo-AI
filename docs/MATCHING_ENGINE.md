# Venturo AI Matching Engine V2.1


## 1. Overview


Venturo AI Matching Engine is the core recommendation system of the platform.

It connects:

- Entrepreneurs
- Investors
- Experts / Advisors
- Enterprises


through AI-driven profile analysis and multi-dimensional matching.



The goal:

> Discover the right opportunities, people and resources at the right time.



---


# 2. Matching Architecture



User Profile

↓

Tag System

↓

Matching Engine

↓

Recommendation Result



The matching engine evaluates:

- Industry
- Track
- Funding Stage
- Location
- Needs
- Skills
- Cooperation Intent



---


# 3. Matching Objects



## 3.1 Founder ↔ Investor


Purpose:

Find suitable investment opportunities.



Matching dimensions:



| Dimension | Weight |
|---|---:|
| Track Match | 40% |
| Funding Stage Match | 30% |
| Location Match | 15% |
| Need / Resource Match | 15% |



Example:


Founder:
AI Agent
Pre-Seed
Shenzhen
Need Angel Investment


Investor:

AI
Early Stage
Beijing
Looking for AI Projects



The system calculates compatibility score.



---


# 3.2 Founder ↔ Expert



Purpose:

Technical evaluation and startup support.



Matching dimensions:



| Dimension | Weight |
|---|---:|
| Technical Skill Match | 40% |
| Industry Match | 30% |
| Startup Stage Match | 20% |
| Cooperation Intent | 10% |



Expert scenarios:



 Technology consulting

 Project evaluation

 Pitch participation

 Technical co-founder matching



Future support:

Experts can join startup teams through platform matching.



---


# 3.3 Founder ↔ Enterprise



Purpose:

Connect startups with industrial resources.



Matching dimensions:



| Dimension | Weight |
|---|---:|
| Industry Match | 40% |
| Cooperation Need | 30% |
| Location | 20% |
| Resource Compatibility | 10% |



Examples:


Startup:

AI Manufacturing Solution


Enterprise:

Industrial AI Upgrade Requirement



---


# 4. Matching Data Structure



Input:



UserProfile
-
ProjectProfile
-
Tag System
-
Investment Information



Core fields:



role
industry
city
trackTags
needTags
skillTags
fundingStage



---


# 5. Matching Score Model



Current V2.1:



Matching Score =
Track Compatibility
-
Stage Compatibility
-
Location Compatibility
-
Need / Skill Compatibility



Output:



0 - 100 Score



Example:


AI Startup
↓
Investor A
↓
92 Match Score



---


# 6. Expert Pitch Matching (Future V2.0)



Future online pitch module:


Participants:


Founder

+

Investor

+

Expert


System recommendation:


Founder submits project

↓

AI analyzes technology requirements

↓

Recommend relevant experts

↓

Invite expert into pitch room



Possible future functions:


 Online pitch room

 AI pitch assistant

 Expert evaluation report

 Investment recommendation



---


# 7. Future AI Upgrade Roadmap



## V2.5

AI semantic matching:


 Embedding Model

 Vector Database

 Similarity Search



## V3.0

Knowledge Graph Matching:


Users

Projects

Companies

Investments

Experts



Build relationship network.



---


# 8. Development Status



Current:


✅ User Profile Model

✅ Tag System

✅ Matching Data Model

✅ Mock Matching Data



Next:


 Matching Algorithm implementation

 AI recommendation service

 Backend API integration