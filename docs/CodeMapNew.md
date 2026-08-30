Venturo AI · Code Map v1.0(20260829)
一、整体架构
目前可以把项目理解成：
                    Venturo AI
                        │
                        ▼
                 ┌─────────────┐
                 │   src/app    │
                 │   页面层     │
                 └──────┬──────┘
                        │
                        ▼
              ┌───────────────────┐
              │   components      │
              │   UI / 功能组件    │
              └────────┬──────────┘
                       │
                       ▼
              ┌───────────────────┐
              │     services      │
              │   业务逻辑引擎     │
              └────────┬──────────┘
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        ┌──────────┐       ┌──────────┐
        │  models  │       │   data   │
        │ 数据模型 │       │ Mock数据 │
        └──────────┘       └──────────┘
另外还有两个横向基础层：
context
   │
   └── 当前用户 / 全局用户状态

store
   │
   └── 用户状态持久化/状态管理

constants
   │
   └── 角色、主题、映射等系统常量

hooks
   │
   └── UI / Theme / Color Scheme
架构方向是对的。

二、App 页面地图
目前 src/app 一共 13 个页面：
页面	定位	当前主要依赖
index.tsx	首页 / Dashboard入口	页面内部逻辑
ai.tsx	AI助手	AI组件、AI Mock、UserContext
enterprise.tsx	企业/产业方	EnterpriseCard、企业Mock
expert.tsx	专家	ExpertRecommendationCard、专家Mock
explore.tsx	Explore	暂未发现 @/ 依赖
intelligence.tsx	Intelligence情报中心	intelligenceEngine + Intelligence组件
investor.tsx	投资人	MatchCard + investorRecommendationMockData
login.tsx	登录	暂未发现 @/ 依赖
matching.tsx	人脉匹配	MatchCard + RecommendationMock + ExpertMock
profile.tsx	用户中心	UserContext + Role + Dashboard
project.tsx	项目中心	Project + ProjectMatching
role.tsx	角色选择	UserContext
_layout.tsx	全局Layout	UserProvider


三、最重要的几个业务模块
① Intelligence 情报中心
这是目前比较完整的一条业务链：
app/intelligence.tsx
        │
        ├── UserContext
        │
        ├── intelligenceEngine
        │       │
        │       └── intelligenceCenterMockData
        │
        └── Intelligence Components
                │
                ├── IntelligenceHeader
                ├── TrendSection
                ├── IntelligenceFeed
                ├── DailyInsightSection
                ├── FounderOpportunitySection
                └── InvestorOpportunitySection
                            │
                            ▼
                 intelligenceRelationEngine
                            │
                            ├── allProfilesMock
                            └── UserProfile
也就是说：
Intelligence 已经不只是一个静态页面，而开始形成“情报 → 关系 → 生态用户”的业务链。
这是 Venturo AI 很重要的核心能力之一。


四、Project 项目中心
现在已经形成第二条非常清晰的业务链：
app/project.tsx
      │
      ├── projectMockData
      │
      ├── ProjectCard
      │
      └── ProjectMatchSection
                │
                ▼
       projectMatchingEngine
                │
                ├── Project
                ├── UserProfile
                └── allProfilesMock
核心逻辑：
Project
   │
   ▼
Project Matching Engine
   │
   ├── 行业
   ├── Track Tags
   ├── Need Tags
   └── Resource Needs
   │
   ▼
UserProfile
   │
   ▼
ProjectMatchResult
   │
   ▼
投资人 / 专家 / 企业合作方
这非常关键。
因为它意味着 Venturo AI 已经出现了：
Project → Ecosystem Profile

而不是单纯：
User → User

这也是为什么我们之前坚持把 projectMatchingEngine.ts 独立出来是正确的。


五、Profile / 人脉匹配体系
现在实际上存在两层：
第一层：基础人脉匹配
UserProfile
    │
    ▼
matchingEngine.ts
    │
    ├── industry
    ├── trackTags
    ├── needTags / skillTags
    └── city
    │
    ▼
MatchResult
第二层：Profile 推荐
UserProfile
      │
      ▼
profileRecommendationEngine
      │
      ▼
matchingEngine
      │
      ▼
ProfileRecommendation
所以这里关系非常明确：
matchingEngine
      ↑
      │
profileRecommendationEngine
也就是说：
matchingEngine 是底层计算能力；
profileRecommendationEngine 是上层推荐业务。
这个分层我们应该保留。


六、Project Matching 是独立引擎
目前：
projectMatchingEngine
不要并入：
matchingEngine
地图明确记录：
matchingEngine
UserProfile ↔ UserProfile

projectMatchingEngine
Project ↔ UserProfile
这是目前非常重要的架构边界。
以后甚至可以继续发展：
matchingEngine
├── Founder ↔ Investor
├── Founder ↔ Expert
├── Founder ↔ Enterprise
└── User ↔ User

projectMatchingEngine
├── Project ↔ Investor
├── Project ↔ Expert
├── Project ↔ Enterprise
└── Project ↔ Ecosystem


七、目前发现的“历史遗留/待治理区”
这里就是这次代码地图最大的价值。
现在有：
src/models/matchingEngine.ts
src/models/recommendationEngine.ts
同时又有：
src/services/matchingEngine.ts
src/services/recommendationEngine.ts
这明显存在职责重叠风险。
而且我们已经实际扫描到：
src/models/recommendationEngine.ts
    ↓
@/models/matchingEngine
以及：
src/services/profileRecommendationEngine.ts
    ↓
@/services/matchingEngine
所以现在形成：
models
├── matchingEngine.ts          ← ⚠️
└── recommendationEngine.ts    ← ⚠️

services
├── matchingEngine.ts           ← 当前主版本
├── profileRecommendationEngine.ts
├── recommendationEngine.ts
├── intelligenceEngine.ts
├── intelligenceRelationEngine.ts
└── projectMatchingEngine.ts
备注：
现在不要删,我们把它们标记：
⚠️ LEGACY / DUPLICATED ENGINE
等 1.0 前做一次专门的：
Engine Consolidation（引擎归并）
再决定删除、迁移还是兼容。


八、Recommendation 体系也存在“双轨”
现在至少有：
models/recommendation.ts
models/aiRecommendation.ts
models/profileRecommendation.ts
对应：
recommendationMockData.ts
aiRecommendationMockData.ts
investorRecommendationMockData.ts
expertRecommendationMockData.ts
以及：
services/recommendationEngine.ts
services/profileRecommendationEngine.ts
因此现在可以暂时理解成：
Recommendation
      │
      ├── AI Recommendation
      │
      ├── Profile Recommendation
      │
      ├── Investor Recommendation
      │
      └── Expert Recommendation
这个方向本身没问题。
但未来需要解决：Recommendation 是一个统一领域模型，还是多个不同业务对象？


九、Data 层目前结构
目前 Mock 数据已经开始按照业务域分开：
data/
│
├── AI
│   ├── aiMockData
│   ├── aiRecommendationMockData
│   ├── assistantMockData
│   └── roleAIData
│
├── Profile
│   ├── profileMockData
│   └── allProfilesMockData
│
├── Project
│   └── projectMockData
│
├── Intelligence
│   ├── intelligenceMockData
│   └── intelligenceCenterMockData
│
├── Investor
│   └── investorRecommendationMockData
│
├── Expert
│   ├── expertMockData
│   └── expertRecommendationMockData
│
├── Enterprise
│   └── enterpriseMockData
│
├── Matching
│   └── matchingMockData
│
├── Recommendation
│   └── recommendationMockData
│
├── User
│   └── userMockData
│
└── Contribution
    └── contributionMockData
这已经可以看出未来后端 API 的雏形。


十、Models 层
目前模型领域已经比较丰富：
models/
│
├── user
├── profile
│
├── project
├── pitch
│
├── investor
├── expert
├── enterprise
│
├── matching
├── recommendation
├── profileRecommendation
├── expertRecommendation
├── aiRecommendation
│
├── intelligence
├── ai
│
├── contribution
├── dashboard
└── tag
这实际上已经接近一个初步的：
Venturo Domain Model


十一、Context / Store
目前：
UserContext.tsx
       │
       └── User
同时：
store/userStore.ts
       │
       └── User / UserRole
因此这里未来也值得检查：
Context
   VS
Store
两者的职责边界。
但目前同样：
不修改。
先进入代码地图。


十二、目前的核心依赖图
压缩成一张真正的 CTO 视角地图，定义成：
                         ┌──────────────┐
                         │   src/app    │
                         └──────┬───────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
        Intelligence         Project           Profile
             │                  │                  │
             ▼                  ▼                  ▼
 intelligenceEngine    projectMatchingEngine  profileRecommendationEngine
             │                  │                  │
             ▼                  ▼                  ▼
      Intelligence       Project Matching     matchingEngine
             │                  │                  │
             └──────────────┬───┴──────────────────┘
                            │
                            ▼
                       UserProfile
                            │
                            ▼
                    allProfilesMock
同时：
AI
 │
 ├── assistantMockData
 ├── roleAIData
 └── aiRecommendationMockData
          │
          ▼
   recommendationEngine


十三、我们现在已经可以给模块打“架构等级”
 Venturo AI 代码地图从现在开始采用这个标记：
🟢 Core
已经明确属于核心业务能力：
 UserProfile
 Project
 matchingEngine
 projectMatchingEngine
 intelligenceEngine
 intelligenceRelationEngine
🟡 Active
正在使用，但架构仍需要继续整理：
 profileRecommendationEngine
 recommendationEngine
 AI Recommendation
 Investor Recommendation
 Expert Recommendation
🟠 Legacy / Duplicate
暂时不要动：
 src/models/matchingEngine.ts
 src/models/recommendationEngine.ts
⚪ UI Layer
主要负责展示：
 ProjectMatchSection
 ProjectCard
 MatchCard
 ExpertCard
 Intelligence 各类 Section/Card



 Venturo AI Code Map v1.0
第二阶段：Dependency Map
1. Services 依赖关系
目前实际调用关系：
app/intelligence.tsx
        │
        ▼
services/intelligenceEngine.ts
        │
        └── models/intelligence
        └── data/intelligenceCenterMockData


app/project.tsx
        │
        └── services/projectMatchingEngine.ts
                │
                ├── models/project
                ├── models/profile
                └── data/allProfilesMockData


ProjectMatchSection.tsx
        │
        └── services/projectMatchingEngine.ts


FounderOpportunitySection.tsx
        │
        └── services/intelligenceRelationEngine.ts


InvestorOpportunitySection.tsx
        │
        └── services/intelligenceRelationEngine.ts


services/profileRecommendationEngine.ts
        │
        └── services/matchingEngine.ts
结论
这一层非常健康：
App / Component
       ↓
Service
       ↓
Model + Data
没有发现：
Service → Component
这种反向依赖。
🟢 架构正确


2. Models 依赖关系
我们发现：
components
    ↓
models
以及：
data
    ↓
models
这是合理的。
但是这里出现一个特殊情况：
src/models/matchingEngine.ts
        ↓
src/models/profile.ts
        ↓
src/models/matchingEngine.ts
以及：
src/models/recommendationEngine.ts
        ↓
src/models/matchingEngine.ts
        ↓
src/models/recommendation.ts
        ↓
src/models/profile.ts
而目前业务代码真正使用的是：
src/services/matchingEngine.ts
因此：
src/models/matchingEngine.ts
标记：
🟠 Legacy / Duplicate Engine
src/models/recommendationEngine.ts
标记：
🟠 Legacy / Duplicate Engine
暂时不要删除。


3. Context
现在非常明确：
_layout.tsx
      │
      ▼
UserProvider
      │
      ▼
UserContext
      ▲
      │
 ┌────┼──────────────┐
 │    │              │
 ▼    ▼              ▼
ai  intelligence   profile
                     │
                     ▼
                    role
实际使用：
ai.tsx
intelligence.tsx
profile.tsx
role.tsx
_layout.tsx
所以：
UserContext
🟢 Core Infrastructure


4. Store
这是一个很有价值的发现。
我们扫描：
context/|store/
结果只有：
src/store/userStore.ts
自身依赖：
src/store/userStore.ts
       ↓
models/user.ts
但是：
目前没有发现其他文件 import userStore.ts。

因此现在：
userStore.ts
应该标记：
⚪ Currently Unused / Future State
而不是删除。
这很可能是我们未来把：
UserContext
逐步迁移/整合到状态管理体系时的基础。


5. Data 层依赖
目前 Data 层结构很清晰：
App
 │
 ├── assistantMockData
 ├── roleAIData
 ├── enterpriseMockData
 ├── expertRecommendationMockData
 ├── investorRecommendationMockData
 ├── recommendationMockData
 └── projectMockData
同时 Service 使用：
intelligenceEngine
       ↓
intelligenceCenterMockData

intelligenceRelationEngine
       ↓
allProfilesMockData
       ↓
profileMockData

projectMatchingEngine
       ↓
allProfilesMockData

recommendationEngine
       ↓
aiRecommendationMockData


6. 一个非常重要的结构
现在已经可以画出：
                   DATA
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
   profileMock   projectMock   intelligenceMock
        │           │            │
        ▼           ▼            ▼
 allProfilesMock    │     intelligenceCenterMock
        │           │            │
        └──────┬────┘            │
               ▼                 ▼
       projectMatching     intelligenceEngine
               │                 │
               ▼                 ▼
             Project        Intelligence
               │                 │
               └───────┬─────────┘
                       ▼
                    UI Layer
这已经是一个真正的业务数据流了。


7. 当前 Dependency Map 的健康度
我给当前架构做一个阶段性判断：
区域	状态	判断
App → Components	🟢	正常
App → Services	🟢	正常
Components → Services	🟢	正常
Components → Models	🟢	正常
Services → Models	🟢	正常
Services → Data	🟢	正常
Data → Models	🟢	正常
Context	🟢	正常
Store	⚪	暂未实际使用
models/matchingEngine	🟠	重复/遗留
models/recommendationEngine	🟠	重复/遗留

总体：
🟢 主架构健康
真正需要处理的主要是：
Engine 重复，而不是整个项目架构混乱。


③ Domain Map
数据
↓
Model
↓
Service
↓
Component
↓
App
↓
用户价值
↓
未来后端



## 14. Models Layer — Core Domain

### User Domain

models/user.ts
    ↓
User / UserRole

models/profile.ts
    ↓
UserProfile
    ├── FounderProfile
    ├── InvestorProfile
    ├── ExpertProfile
    └── EnterpriseProfile


### Project Domain

models/project.ts
    ↓
Project


### Core Relationships

UserProfile ↔ UserProfile
    ↓
services/matchingEngine.ts

Project ↔ UserProfile
    ↓
services/projectMatchingEngine.ts


### Product Domain Model

User
  ↓
UserProfile
  ↓
Ecosystem Role
  ↓
Project
  ↓
Investor / Expert / Enterprise
  ↓
Matching
  ↓
Recommendation


⚠️ UserRole 与 ROLES 存在重复定义，未来应考虑统一为单一类型来源

## 15. Role System

### Canonical Role Definition

src/constants/role.ts

ROLES
├── FOUNDER → 创业者
├── INVESTOR → 投资人
├── EXPERT → 专家/顾问
└── ENTERPRISE → 企业/产业合作方


### User Role

src/models/user.ts

User
└── role
    └── typeof ROLES[keyof typeof ROLES]


### Profile Roles

src/models/profile.ts

UserProfile
├── FounderProfile
├── InvestorProfile
├── ExpertProfile
└── EnterpriseProfile


### System Role Mapping

src/constants/roleMapping.ts

Business Role
├── 创业者 → founder
├── 投资人 → investor
├── 专家/顾问 → expert
└── 企业/产业合作方 → enterprise


### Role Architecture

constants/role.ts
        ↓
models/user.ts
        ↓
User
        ↓
models/profile.ts
        ↓
UserProfile / Role Profiles

constants/roleMapping.ts
        ↓
SystemRole
        ↓
System-level role logic


### Architecture Note

ROLES is the current canonical business-role definition.

Potential duplication:
UserRole in models/user.ts duplicates the literal role definitions
already represented by ROLES.

Do not modify during Code Map phase.
Consider consolidating into a single type source during future
architecture cleanup.


## 16. Recommendation Domain

### A. Generic Entity Recommendation

src/models/recommendation.ts

Recommendation
├── id
├── type
│   ├── investor
│   ├── expert
│   ├── enterprise
│   └── project
├── sourceId
├── targetId
├── title
├── description
├── category?
├── score
├── reasons[]
└── createdAt

Purpose:
Entity → Entity recommendation.


### B. Profile Recommendation

src/models/profileRecommendation.ts

ProfileRecommendation
├── id
├── title
├── description
├── category
├── reason
├── industry?
├── score?
└── createdAt?

Flow:

UserProfile
    ↓
services/matchingEngine.ts
    ↓
MatchResult
    ↓
services/profileRecommendationEngine.ts
    ↓
ProfileRecommendation


### C. AI Ecosystem Recommendation

src/models/aiRecommendation.ts

AIUserRecommendation
├── id
├── type
│   ├── intelligence
│   ├── opportunity
│   ├── ecosystem
│   └── promotion
├── targetRoles[]
├── title
├── description
├── category
├── reason
├── relatedTags[]
├── priority?
├── industry?
├── actionType?
├── source?
├── createdAt
└── ecosystem relations
    ├── relatedProjects[]
    ├── relatedInvestors[]
    ├── relatedExperts[]
    └── relatedCompanies[]


### Recommendation Architecture

Generic Recommendation
    ↓
Entity → Entity

ProfileRecommendation
    ↓
Matching Result → Profile Presentation

AIUserRecommendation
    ↓
AI Intelligence / Opportunity / Ecosystem
    ↓
Action + Ecosystem Relations


### Architecture Warning

There are currently three recommendation data models.

Do not merge them during Code Map phase.

Need to verify actual consumers and data flow before
deciding whether they represent separate domains or
should eventually be unified.


## 17. Recommendation Data Map

### 1. General Recommendation

src/data/recommendationMockData.ts
        ↓
models/recommendation.ts
        ↓
Recommendation[]

Current relations:
Founder → Investor
Founder → Expert

Data:
founder_001 → investor_001
founder_001 → expert_001


### 2. Investor Recommendation

src/data/investorRecommendationMockData.ts
        ↓
models/recommendation.ts
        ↓
Recommendation[]

Current relation:

Investor → Project

investor_001 → project_001


### 3. AI Recommendation

src/data/aiRecommendationMockData.ts
        ↓
models/aiRecommendation.ts
        ↓
AIUserRecommendation[]

Domains:
├── intelligence
├── opportunity
├── ecosystem
└── promotion

Additional dimensions:
├── targetRoles[]
├── priority
├── relatedTags[]
├── actionType
├── industry
└── ecosystem relations

Relations:
├── relatedProjects[]
├── relatedInvestors[]
├── relatedExperts[]
└── relatedCompanies[]


### 4. Expert Recommendation

src/data/expertRecommendationMockData.ts
        ↓
ExpertRecommendation
        ↓
Project ↔ Expert

Recommendation types:
├── technical_review
├── industry_advisor
└── startup_partner


### Current Architecture

Recommendation
    ↓
Generic Entity → Entity recommendation

AIUserRecommendation
    ↓
AI Intelligence / Opportunity / Ecosystem recommendation

ExpertRecommendation
    ↓
Specialized Project ↔ Expert matching


### Architecture Decision

Do NOT merge the three models during Code Map phase.

They currently represent different business semantics.

Further inspection is required to determine:
1. Which recommendation systems are actually rendered.
2. Which engines generate them.
3. Which data sets are historical/mock-only.
4. Whether ExpertRecommendation should remain a specialized domain.
5. Whether Recommendation and ProfileRecommendation overlap.




========================================
Models Runtime Map
========================================

🟢 ACTIVE MODELS

models/user.ts
    ↓
UserContext
    ↓
app/ai
app/intelligence
app/profile
app/role
store/userStore


models/profile.ts
    ↓
allProfilesMockData
    ↓
intelligenceRelationEngine
projectMatchingEngine
matchingEngine
profileRecommendationEngine


models/project.ts
    ↓
projectMockData
    ↓
app/project
projectMatchingEngine


models/intelligence.ts
    ↓
intelligenceCenterMockData
intelligenceMockData
    ↓
intelligenceEngine
intelligenceRelationEngine


models/recommendation.ts
    ↓
recommendationMockData
investorRecommendationMockData
recommendationEngine


models/aiRecommendation.ts
    ↓
aiRecommendationMockData
    ↓
recommendationEngine
BusinessOpportunityCard
OpportunitySection
RecommendationSection


models/profileRecommendation.ts
    ↓
profileRecommendationEngine


models/matching.ts
    ↓
matchingMockData
    ↓
🔴 当前暂无 Runtime Consumer


========================================
🔴 POTENTIALLY ORPHAN MODELS
========================================

models/ai.ts
models/dashboard.ts
models/contribution.ts
models/pitch.ts
models/tag.ts
models/expertRecommendation.ts


========================================
IMPORTANT FINDINGS
========================================

1. Dashboard Components 是 Runtime 活跃的，
   但 dashboard.ts Model 当前没有 Consumer。

2. Tag Model 已存在，
   但 Profile / Matching 当前直接使用 string[]，
   尚未接入 Tag Model。

3. expertRecommendation.ts
   → expertMockData
   → 当前无 Runtime Consumer。

4. expert.tsx 实际使用的是
   expertRecommendationMockData.ts，
   而不是 expertMockData.ts。

5. models/ai.ts 与 models/aiRecommendation.ts
   必须严格区分，不能因为前缀搜索结果混淆。

6. 当前项目存在部分“已经设计但尚未进入 Runtime”
   的 Model / Data。


========================================
Component Runtime Map v1.0
========================================

🟢 ACTIVE COMPONENTS
========================================

AI
----------------------------------------
AIAssistantCard
    ↓
app/ai.tsx


INTELLIGENCE
----------------------------------------
IntelligenceHeader
    ↓
app/intelligence.tsx

TrendSection
    ↓
app/intelligence.tsx

IntelligenceFeed
    ↓
app/intelligence.tsx

DailyInsightSection
    ↓
app/intelligence.tsx

FounderOpportunitySection
    ↓
app/intelligence.tsx

InvestorOpportunitySection
    ↓
app/intelligence.tsx


PROJECT
----------------------------------------
ProjectCard
    ↓
app/project.tsx

ProjectMatchSection
    ↓
app/project.tsx


MATCHING
----------------------------------------
MatchCard
    ↓
app/investor.tsx
app/matching.tsx

ExpertCard
    ↓
app/matching.tsx


========================================
🔴 CURRENTLY UNREFERENCED COMPONENTS
========================================

OpportunitySection
    ↓
未发现 Runtime Consumer

RecommendationSection
    ↓
未发现 Runtime Consumer

ProfileRecommendationSection
    ↓
未发现 Runtime Consumer


========================================
Component Dependency Map
========================================

COMPONENT → MODEL
----------------------------------------

BusinessOpportunityCard
    ↓
models/aiRecommendation

DailyInsightSection
    ↓
models/intelligence

FounderOpportunitySection
    ↓
models/intelligence

InvestorOpportunitySection
    ↓
models/intelligence

OpportunitySection
    ↓
models/aiRecommendation

ProfileRecommendationSection
    ↓
models/profileRecommendation

RecommendationSection
    ↓
models/aiRecommendation


COMPONENT → SERVICE
----------------------------------------

FounderOpportunitySection
    ↓
services/intelligenceRelationEngine

InvestorOpportunitySection
    ↓
services/intelligenceRelationEngine

ProjectMatchSection
    ↓
services/projectMatchingEngine


COMPONENT → DATA
----------------------------------------

当前未发现直接 Data 引用。


COMPONENT → CONTEXT / STORE
----------------------------------------

当前未发现直接 Context / Store 引用。


========================================
IMPORTANT FINDINGS
========================================

21. Intelligence Components 已形成明确的
    Model Dependency。

22. FounderOpportunitySection /
    InvestorOpportunitySection
    同时连接 intelligenceRelationEngine。

23. ProjectMatchSection
    直接连接 projectMatchingEngine。

24. 当前未发现 Component → Data
    的直接依赖。

25. 当前未发现 Component → Context / Store
    的直接依赖。


