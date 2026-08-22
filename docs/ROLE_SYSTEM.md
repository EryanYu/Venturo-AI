# Venturo AI Role System

Version:

V0.1 Prototype


Date:

2026-08



# Overview


Venturo AI uses a role-based ecosystem architecture.


Each user belongs to one primary role.


Current roles:


1. Founder
2. Investor
3. Expert / Advisor
4. Enterprise / Industry Partner



# Role Architecture


User

↓

Role ID

↓

Permission

↓

Dashboard



Example:


Founder

↓

founder

↓

FounderDashboard



# Role Definition



## 1. Founder 创业者


Role ID:

founder


Display Name:

创业者


Dashboard:

FounderDashboard



Purpose:


Entrepreneur operating system.



Main Functions:


- Project management
- AI startup diagnosis
- BP optimization
- Fundraising support
- Investor matching



Future Expansion:


- Startup profile
- Digital founder avatar
- Startup data asset



---



## 2. Investor 投资人


Role ID:

investor


Display Name:

投资人


Dashboard:

InvestorDashboard



Purpose:


Investment decision and opportunity discovery.



Main Functions:


- Project discovery
- AI evaluation
- Due diligence
- Investment pipeline
- Portfolio management



Future Expansion:


- Investment strategy AI
- Deal intelligence



---



## 3. Expert / Advisor 专家顾问


Role ID:

expert


Display Name:

专家/顾问


Dashboard:

ExpertDashboard



Purpose:


Professional knowledge ecosystem.



Main Functions:


- Technical consulting
- Industry advice
- Project evaluation
- Startup mentoring



Future Expansion:


- Expert digital avatar
- Knowledge asset
- Consulting marketplace



---



## 4. Enterprise / Industry 企业产业方


Role ID:

enterprise


Display Name:

企业/产业方


Dashboard:

EnterpriseDashboard



Purpose:


Industry collaboration platform.



Main Functions:


- Innovation demand publishing
- Technology discovery
- Industry cooperation
- Strategic investment



Future Expansion:


- Enterprise innovation center
- Supply chain ecosystem



# Permission Concept


Future permission system:



Role

↓

Permission Group

↓

Feature Access



Example:



Founder


Can access:


✓ AI Diagnosis

✓ BP Optimization

✓ Funding Center



Investor


Can access:


✓ Project Discovery

✓ Due Diligence

✓ Investment Management



Expert


Can access:


✓ Consulting Service

✓ Knowledge Contribution



Enterprise


Can access:


✓ Industry Demand

✓ Cooperation Management



# Current Implementation


Current version:


Simple role switch



Implementation:


src/constants/role.ts

src/store/userStore.ts

src/app/role.tsx

src/app/profile.tsx



# Future Upgrade Plan


Phase 1:

Role String


Phase 2:

Role ID


Phase 3:

Permission System


Phase 4:

DAO / Web3 Identity


# Notes


Display names can change.

Role IDs should remain stable.


Example:


Display:

行业专家


Internal:


expert



This prevents system breaking during future product evolution.