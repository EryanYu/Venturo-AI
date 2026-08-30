【核心发现 #01】

Venturo AI 当前存在两套 Matching Engine：

1. src/models/matchingEngine.ts
   - calculateMatchScore()
   - generateRecommendations()
   - 评分维度：
     Track 40
     Need/Skill 30
     City 15
     Industry 15

2. src/services/matchingEngine.ts
   - calculateProfileMatch()
   - 评分维度：
     Industry 30
     Track 30
     Skill/Need 20
     City 10

结论：
两者属于不同版本/不同设计思路的匹配算法。
当前禁止直接删除或合并。
后续需要通过调用关系确认实际生产路径。


【核心发现 #02】

Venturo AI 当前存在两套 Recommendation Engine：

1. src/models/recommendationEngine.ts
   - 基于 UserProfile
   - 调用 models/matchingEngine
   - 生成 Recommendation[]

2. src/services/recommendationEngine.ts
   - 基于 User
   - 使用 aiRecommendationMockData
   - 根据 targetRoles 筛选
   - 根据 priority 排序
   - 返回 AIUserRecommendation[]

结论：
前者属于“画像匹配推荐”
后者属于“AI 情报/机会推荐”
目前不能简单视为重复。

【核心发现 #03 — Matching Engine Call Graph】

当前存在两套 Matching Engine，且两套均被实际代码调用：

A. src/models/matchingEngine.ts
   ├── calculateMatchScore()
   └── generateRecommendations()

调用关系：
src/models/recommendationEngine.ts
        ↓
calculateMatchScore()
        ↓
src/models/matchingEngine.ts

B. src/services/matchingEngine.ts
   └── calculateProfileMatch()

调用关系：
src/services/profileRecommendationEngine.ts
        ↓
calculateProfileMatch()
        ↓
src/services/matchingEngine.ts

结论：
两套 Matching Engine 当前均属于 ACTIVE。
暂时不能删除或合并。
后续需要根据业务入口进一步判断职责边界。
Status: ⚪ HISTORICAL / SUPERSEDED

Updated By:
- #15 — Runtime 使用链与孤立 Engine
- #25 — Matching / Recommendation 多引擎并存
- #27 — Matching Center UI 与 Engine 命名不一致

Archive Note:
At the time of the original scan, both Matching Engine implementations
were considered ACTIVE based on their internal call relationships.

Subsequent Runtime evidence shows that "ACTIVE" must be distinguished
from "reachable from the current App Runtime".

Therefore, this Finding remains historically valid as a record of the
earlier call-graph state, but its ACTIVE conclusion is superseded.

Current Canonical Judgment:
Do not treat both Matching Engines as confirmed App Runtime engines.
Further Runtime entry analysis is required before selecting a canonical engine.

【核心发现 #04 — Project Matching Runtime】

src/app/project.tsx
        ↓
src/services/projectMatchingEngine.ts
        ↓
generateProjectMatches()

结论：
Project Matching 已确认存在 App → Service 的直接运行路径。
属于当前实际产品功能链路。

发现 #05：
services/recommendationEngine.ts 当前为孤立服务（Orphan Service）。
getRecommendations() 在整个 src 中只有定义，没有调用方。
当前不能认定它是废弃代码，因为它可能是预留的未来架构；但从当前 Runtime Call Graph 看，它不参与现有页面运行链路。

🟡 ORPHAN / UNUSED AT RUNTIME

src/services/recommendationEngine.ts
└── getRecommendations()

状态：
- 有实现
- 有数据依赖
- 无当前调用方
- 暂未删除
- 待后续架构决策

🔴 发现 #06：profileRecommendationEngine 当前完全没有调用入口
三个东西分别标记：
文件	当前状态	结论
models/matchingEngine.ts	🟢 Active	有实际调用
models/recommendationEngine.ts	🟢 Active	调用 calculateMatchScore
services/matchingEngine.ts	🟡 Indirect/Orphan Chain	被 profileRecommendationEngine 调用
services/profileRecommendationEngine.ts	🔴 No Entry	没有任何调用方
services/recommendationEngine.ts	🔴 No Entry	getRecommendations 没有调用方

🔴 【核心发现 #07 — models/recommendationEngine 当前无 Runtime Entry】

搜索：
Get-ChildItem src -Recurse -File | Select-String "models/recommendationEngine"

结果：
无返回。

已知内部关系：

src/models/recommendationEngine.ts
        │
        └── generateRecommendations()
                │
                ▼
        calculateMatchScore()
                │
                ▼
        src/models/matchingEngine.ts

但整个 src 当前没有模块调用
models/recommendationEngine.ts。

状态：
🟠 ORPHAN CHAIN

解释：
该模块已经实现 Recommendation → Matching 的业务逻辑，
但目前没有接入 App / Component / Service Runtime。

处理：
暂不删除。
暂不重构。
暂不合并。
保留到 1.0 架构决策阶段。

🔴 发现 #08：userStore.ts 当前没有任何调用方
src/store/userStore.ts

状态：🔴 NO RUNTIME ENTRY / ORPHAN

内部：
globalThis.VENTURO_USER
        │
        ├── updateRole()
        └── getUser()

外部调用：
❌ 无
🟠 LEGACY / UNUSED CANDIDATE

【核心发现 #09 — UserContext 是当前 User Runtime 主状态系统】

useUser() 调用位置：

src/app/ai.tsx
src/app/intelligence.tsx
src/app/profile.tsx
src/app/role.tsx

UserProvider：

src/context/UserContext.tsx

Runtime 结构：

src/app/_layout.tsx
        ↓
UserProvider
        ↓
UserContext
        ↓
useUser()
        ├── ai.tsx
        ├── intelligence.tsx
        ├── profile.tsx
        └── role.tsx

结论：

UserContext.tsx 是当前 Venturo AI Runtime
实际使用的 User State 主入口。

src/store/userStore.ts 当前没有 Runtime 调用，
暂标记：

🔴 NO RUNTIME ENTRY
🟠 LEGACY / UNUSED CANDIDATE

暂不删除、暂不重构。

【核心发现 #10 — UserProvider 是全局 Runtime Provider】

文件：
src/app/_layout.tsx

实际结构：

ThemeProvider
    │
    ├── AnimatedSplashOverlay
    │
    └── UserProvider
            │
            └── Stack
                 │
                 └── Expo Router 页面树

结论：

UserProvider 位于 Expo Router Stack 上层，
因此 UserContext 对整个 App 页面树可用。

确认：

src/context/UserContext.tsx
        ↓
UserProvider
        ↓
Expo Router Stack
        ↓
各业务页面
        ↓
useUser()

UserContext = 当前全局 User Runtime State。

关联：
#08 userStore 无 Runtime 调用
#09 useUser 实际调用面
#10 UserProvider 全局挂载确认

状态：
🟢 CONFIRMED


发现 #11：
App 页面实际接入的 Components
根据你刚才的真实扫描结果，可以确定：
src/app
│
├── ai.tsx
│    └── components/ai/
│         └── AIAssistantCard
│
├── enterprise.tsx
│    └── components/enterprise/
│         └── EnterpriseCard
│
├── expert.tsx
│    └── components/expert/
│         └── ExpertRecommendationCard
│
├── intelligence.tsx
│    └── components/intelligence/
│         ├── IntelligenceHeader
│         ├── TrendSection
│         ├── IntelligenceFeed
│         ├── DailyInsightSection
│         ├── FounderOpportunitySection
│         └── InvestorOpportunitySection
│
├── investor.tsx
│    └── components/matching/
│         └── MatchCard
│
├── matching.tsx
│    ├── components/matching/
│    │    └── MatchCard
│    └── components/expert/
│         └── ExpertCard
│
├── profile.tsx
│    └── components/dashboard/
│         ├── FounderDashboard
│         ├── InvestorDashboard
│         ├── ExpertDashboard
│         └── EnterpriseDashboard
│
├── project.tsx
│    ├── components/project/
│    │    ├── ProjectCard
│    │    └── ProjectMatchSection
│
├── explore.tsx
│    └── 暂无 components import
│
├── index.tsx
│    └── 暂无 components import
│
├── login.tsx
│    └── 暂无 components import
│
└── role.tsx
     └── 暂无 components import


发现 #12：
     Components 存在明显的“业务域分层”
目前已经形成：
components/
│
├── ai/
│
├── dashboard/
│
├── enterprise/
│
├── expert/
│
├── intelligence/
│
├── matching/
│
├── project/
│
└── ui/
其中已经能看到比较清晰的业务边界：
AI
│
├── AIAssistantCard
├── InsightCard
├── IntelligenceCard
└── RecommendationCard


Intelligence
│
├── IntelligenceHeader
├── TrendSection
├── IntelligenceFeed
├── DailyInsightSection
├── FounderOpportunitySection
├── InvestorOpportunitySection
├── OpportunitySection
├── ProfileRecommendationSection
└── RecommendationSection


Matching
│
└── MatchCard


Project
│
├── ProjectCard
└── ProjectMatchSection


Dashboard
│
├── FounderDashboard
├── InvestorDashboard
├── ExpertDashboard
└── EnterpriseDashboard
这说明 Venturo AI 已经不是简单的 Demo 页面集合，而是开始形成：
Route → Domain Components → Domain Logic/Data

这样的架构。

【核心发现 #13 — Components 层存在两种依赖结构】

扫描范围：
src/components/**/*.{tsx,ts}

一、业务组件依赖

发现：

components/intelligence/OpportunitySection.tsx
    ↓
components/intelligence/BusinessOpportunityCard.tsx

结论：
Intelligence 业务组件存在 Section → Card 的一级嵌套关系。

二、基础/通用组件依赖

app-tabs.web.tsx
    ↓
themed-text
themed-view

hint-row.tsx
    ↓
themed-text
themed-view

web-badge.tsx
    ↓
themed-text
themed-view

animated-icon.web.tsx
    ↓
animated-icon.module.css

三、总体判断

Components 并非完全扁平。

当前可以划分为：

业务组件层
    ↓
Section / Card

基础组件层
    ↓
ThemedText / ThemedView 等

目前没有发现大规模、多层级 Component → Component 依赖。

状态：
🟢 CONFIRMED


【核心发现 #14 — Service / Engine API Map】

src/services/

1. intelligenceEngine.ts
   ├── getIntelligenceFeed()
   ├── getFounderOpportunities()
   ├── getInvestorOpportunities()
   └── getDailyInsights()

   定位：
   Intelligence 核心数据/推荐入口

2. intelligenceRelationEngine.ts
   ├── IntelligenceRelations
   └── resolveIntelligenceRelations()

   定位：
   Intelligence 与用户/生态对象之间的关系解析

3. matchingEngine.ts
   ├── MatchResult
   └── calculateProfileMatch()

   定位：
   用户画像匹配引擎

4. profileRecommendationEngine.ts
   └── generateProfileRecommendations()

   定位：
   基于用户画像生成推荐

5. projectMatchingEngine.ts
   ├── ProjectMatchResult
   ├── calculateProjectProfileMatch()
   └── generateProjectMatches()

   定位：
   项目 ↔ 用户/生态角色匹配引擎

6. recommendationEngine.ts
   └── getRecommendations()

   定位：
   根据 User Role 获取 AI Recommendation

总体结构：

Intelligence
    ├── intelligenceEngine
    └── intelligenceRelationEngine

Matching
    ├── matchingEngine
    ├── profileRecommendationEngine
    └── projectMatchingEngine

Recommendation
    └── recommendationEngine

状态：
🟢 Service API 已确认


🔴 发现 #15：Runtime 使用链与“孤立 Engine”开始出现
目前已经确认：
明确进入页面 Runtime 的
intelligenceEngine
    ↑
app/intelligence.tsx

projectMatchingEngine
    ↑
app/project.tsx

intelligenceRelationEngine
    ↑
FounderOpportunitySection
InvestorOpportunitySection
已存在，但目前没有发现直接调用者的
profileRecommendationEngine
recommendationEngine
而且此前：
models/recommendationEngine
也是没有调用者。
这非常重要。
不要马上删除它们。
它们可能是：
1. 历史版本；
2. 尚未接入的未来功能；
3. 被间接调用；
4. Demo 阶段遗留；
5. 两套算法演进过程中的旧实现。
所以 Code Map 中应该标记：
🟡 Orphan / Unverified Runtime
归档提示：🟠 Risk B — Engine 很多，但 Runtime Entry 很少
ACTIVE / Runtime
├── intelligenceEngine
├── intelligenceRelationEngine
└── projectMatchingEngine

ORPHAN / UNVERIFIED
├── services/profileRecommendationEngine
├── services/recommendationEngine
└── models/recommendationEngine

【核心发现 #16】
Intelligence Engine 当前为：
Mock Data → Role Filter → Type Filter → UI

当前定位：
Intelligence Feed Filtering Engine

未来可演进：
Real Data → AI Processing → Personalized Ranking → Intelligence Feed


【核心发现 #17】
Intelligence Relation Engine：

IntelligenceItem
    ↓
relatedProjects
relatedInvestors
relatedExperts
relatedCompanies
    ↓
allProfilesMock
    ↓
UserProfile[]

定位：
Intelligence Entity / Relation Resolution


【核心发现 #18】
Venturo 当前存在两类 Matching：

A. UserProfile ↔ UserProfile
   calculateProfileMatch()

B. Project ↔ UserProfile
   calculateProjectProfileMatch()

两者属于不同业务领域，代码已经进行了明确分离。


【核心发现 #19】
Matching Score Calibration Issue

Profile ↔ Profile：
最高理论分数 = 90

Project ↔ Profile：
最高分数 = 100

目前 score 并非完全同尺度。

状态：
🟡 记录问题
暂不修改代码。


【核心发现 #20】
profileRecommendationEngine
不是独立 Matching Algorithm。

调用链：

matchingEngine
    ↓
calculateProfileMatch()
    ↓
profileRecommendationEngine
    ↓
generateProfileRecommendations()
    ↓
ProfileRecommendation

定位：
Matching → Recommendation Adapter


【核心发现 #21 — Data Layer 数据资产分类】
src/data 当前包含：

① Intelligence / AI 数据
- aiMockData.ts
- intelligenceCenterMockData.ts
- intelligenceMockData.ts
- aiRecommendationMockData.ts
- roleAIData.ts
- assistantMockData.ts

② Ecosystem Profile 数据
- allProfilesMockData.ts
- profileMockData.ts
- founder / investor / expert / enterprise

③ Project 数据
- projectMockData.ts

④ Recommendation / Matching 数据
- recommendationMockData.ts
- investorRecommendationMockData.ts
- matchingMockData.ts
- expertRecommendationMockData.ts

⑤ User 数据
- userMockData.ts

⑥ Enterprise / Expert 数据
- enterpriseMockData.ts
- expertMockData.ts

⑦ 空/待确认
- contributionMockData.ts

总体判断：
Data Layer 已经不是单纯的测试数据集合，
而是开始呈现未来 Venturo AI Domain Data Model 的雏形。
当前全部仍属于 Mock / Static Data 阶段。


【核心发现 #22 — Data Model Duplication / Overlap】
当前 Data Layer 存在多个语义相近的数据集合：
Recommendation：
- recommendationMockData
- aiRecommendationMockData
- investorRecommendationMockData
- expertRecommendationMockData

Profile：
- profileMockData
- allProfilesMockData
- enterpriseMockData
- expertMockData

目前尚不能认定为重复代码。

可能代表：
1. 不同业务域
2. 不同开发阶段
3. 不同 UI 数据源
4. 历史架构遗留

状态：
🟡 待 Runtime 使用关系确认

原则：
暂不删除
暂不合并
暂不重构


【核心发现 #23 — allProfilesMock 是共享生态 Profile Pool】
已确认调用：
intelligenceRelationEngine
    → allProfilesMock

projectMatchingEngine
    → allProfilesMock

allProfilesMockData
    → profileMockData

因此：

profileMockData
    ↓
allProfilesMockData
    ↓
┌─────────────────────────┐
│                         │
▼                         ▼
Intelligence Relations   Project Matching


🟢 profileMockData.ts 是生态用户 Profile 的底层 Mock 数据源，当前通过 allProfilesMockData.ts 进入 Runtime。

🔴 matchingMockData.ts 当前没有 Runtime Consumer。
它目前是一个孤立 Mock Data。
注意：不是说它没价值，而是目前没有证据证明它参与了当前 App Runtime。

🟡 Venturo AI 当前存在“页面直接消费 Mock Data”与“Service/Engine 消费 Mock Data”两种 Recommendation 架构并存的状态。
这不是现在要修的问题。
先记录，不重构。

🔴 intelligenceMockData.ts 当前是孤立数据源。

（归档提示：🟡 Risk C — MockData 直接消费与 Engine 消费并存；现在不能贸然“把所有 MockData 清掉”，
#21、#22、#24、#26 实际上已经构成了一组连续证据。）
#24、#25、#26 已经把这个问题逐渐暴露出来：
                    src/app
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
     Engine Runtime            MockData Runtime
          │                         │
 intelligence/project        investor/expert/
                              enterprise/matching

发现 #24：App Runtime Map 初步完成
src/app 当前存在三类页面：
A. Runtime / Engine 驱动页面
- intelligence.tsx
- project.tsx
- ai.tsx
- profile.tsx
- role.tsx
B. MockData 直连页面
- enterprise.tsx
- expert.tsx
- investor.tsx
- matching.tsx
C. Expo 默认/基础页面
- explore.tsx
- index.tsx
- login.tsx
当前项目存在 Runtime 数据链与 MockData 数据链并存 的状态，暂不进行重构，下一阶段先完成调用关系确认。


发现 #25：Matching / Recommendation 存在多引擎并存
当前至少存在：
- models/matchingEngine.ts
- services/matchingEngine.ts
- services/profileRecommendationEngine.ts
- services/projectMatchingEngine.ts
- services/recommendationEngine.ts
其中 calculateMatchScore、calculateProfileMatch、generateRecommendations 等 API 存在重复/平行实现。
当前阶段不删除、不合并，待 Runtime 使用链完整确认后再确定 Canonical Engine。


#26：Role Center 页面仍以 MockData 为主要 Runtime
记录：
matching.tsx / investor.tsx / expert.tsx / enterprise.tsx 当前均直接消费 MockData，没有进入统一 UserContext + Matching/Recommendation Engine Runtime。
- matching → recommendationMockData + expertMockData
- investor → investorRecommendationMockData
- expert → expertRecommendationMockData
- enterprise → enterpriseMockData
这些页面暂时标记为 Mock Runtime / 待接入真实 Runtime，不立即重构。


#27：Matching Center 存在 UI 与 Engine 命名不一致
记录：
matching.tsx 页面明确命名为 AI智能匹配中心 / AI Matching Engine，但当前没有调用 calculateMatchScore、calculateProfileMatch、generateRecommendations 或 generateProfileRecommendations。
页面实际使用 recommendationMockData 和 expertMockData。
因此当前“AI Matching Engine”属于 UI 产品定位名称，尚不能视为真实 Engine Runtime。

（归档提示：#28 → #30 → #31 → #32 → #33 已经形成一条很漂亮的架构证据链）
对应：
- #28：发现两层模型
- #29：发现两层模型之间存在 Runtime Bridge Gap
- #30：进一步确认两层模型的职责边界
- #31：发现 userId 潜在关联键
- #32：确认 allProfilesMock 是当前 Demo 的统一 Profile Registry
- #33：确认 UserProfile 已成为多个 Engine 的共同 Domain Contract
                    UserContext
                         │
                         ▼
                       User
                 Account / Identity
                         │
                         │  userId
                         ▼
                    UserProfile
               Business / Matching
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
   Matching Engine   Project Match   Intelligence
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                  allProfilesMock
                 Profile Registry
#28：User 与 UserProfile 双层模型确认
src/models/user.ts 定义 Account / Runtime Identity 层 User，负责 id / name / role / points / aiLevel / createdAt。
src/models/profile.ts 定义 Business / Matching 层 UserProfile，负责 industry / city / trackTags / needTags / skillTags / seekingRoles / resources 等生态匹配属性。
当前两个模型职责划分较清晰，暂不合并。

#29：UserContext → UserProfile 存在 Runtime Bridge 缺口
UserContext 当前只管理 User，通过 AsyncStorage 持久化用户身份与角色。
Matching / Recommendation / Project Matching Engine 主要使用 UserProfile。
当前尚未发现 UserContext → UserProfile 的统一 Runtime Bridge，因此真实用户画像与 Matching Engine 尚未完全打通。
该问题暂不修复，标记为未来核心 Runtime 架构工作项。
归档提示：#29 单独保留，不要并入 #28/#30
Status: 🟡 ARCHITECTURAL GAP / FUTURE RUNTIME WORK
Related Findings:
- #28 — User 与 UserProfile 双层模型
- #30 — User 与 UserProfile 双层模型深化

Important:
#29 is NOT a duplicate of #28 or #30.
It identifies the Runtime Bridge gap between the two layers.
（归档提示：🔴 Risk A — User → UserProfile Bridge）
UserContext
   ↓
User

   X

UserProfile
   ↓
Matching / Recommendation

发现 #30：User 与 UserProfile 是两层不同的数据模型
目前已经可以明确：
UserContext
   ↓
User
   ├── id
   ├── name
   ├── role
   ├── points
   ├── aiLevel
   └── createdAt

UserProfile
   ↓
   ├── userId
   ├── name
   ├── role
   ├── industry
   ├── city
   ├── trackTags
   ├── needTags
   ├── skillTags
   ├── seekingRoles
   └── resources
也就是说，目前架构实际上已经出现：
身份层 User → 生态画像层 UserProfile
这是后面把 Venturo AI 做成真正的「AI 创投生态」非常重要的一层。
（归档提示：#28 与 #30 建立“重复/深化”关系）
Status: 🟢 CONFIRMED — DEEPENING / DUPLICATE OF #28
Related Findings:
- #28 — User 与 UserProfile 双层模型确认

Archive Note:
Finding #30 confirms and expands Finding #28 with the explicit
UserContext → User → UserProfile conceptual structure and field-level evidence.
#28 remains the original finding; #30 is retained as a deeper elaboration.

发现 #31：userId 已经形成潜在关联键
目前存在：
profileMockData
├── user_001
├── user_002
├── user_003
└── user_004
同时：
enterpriseMockData
├── user_enterprise_001
└── user_enterprise_002
而 UserProfile 明确定义：
userId: string;
因此目前已经存在一个潜在的数据关系：
User.id
   ↓
UserProfile.userId
这意味着以后可以把：
User
和：
FounderProfile
InvestorProfile
ExpertProfile
EnterpriseProfile
从现在的 Mock Data 状态逐渐演化成真正的数据实体关系。
归档提示：#31 与 #32 建立上下游关系
Related Findings:
- #28 — User / UserProfile 双层模型
- #29 — UserContext → UserProfile Runtime Bridge Gap
- #30 — User / UserProfile 模型深化
- #32 — allProfilesMock 统一 Profile Registry

发现 #32：allProfilesMock 是当前匹配/智能关系层的统一 Profile 数据入口
现在已经确认：
allProfilesMockData.ts
        ↓
allProfilesMock
        ↓
┌──────────────────────────────┐
│ intelligenceRelationEngine   │
│ projectMatchingEngine        │
└──────────────────────────────┘
尤其值得注意：
intelligenceRelationEngine：
IntelligenceItem
      ↓
relatedInvestors
relatedExperts
relatedCompanies
      ↓
allProfilesMock
      ↓
UserProfile[]
而：
projectMatchingEngine：
Project
   ↓
allProfilesMock
   ↓
Project ↔ UserProfile
   ↓
score
所以 allProfilesMock 现在实际上已经承担了一个非常重要的角色：
Venturo AI 当前 Demo 阶段的统一生态 Profile Registry。
归档提示：Related Findings:
- #31 — userId 潜在关联键
- #33 — UserProfile 共同数据契约

发现 #33：UserProfile 已经成为多个 Engine 的共同数据契约
现在已经确认：
matchingEngine
profileRecommendationEngine
projectMatchingEngine
intelligenceRelationEngine
        ↓
   UserProfile
因此：
UserProfile 是目前 Venturo AI 智能匹配体系最核心的 Domain Model 之一。
这也意味着后面如果修改 UserProfile，影响面会比较大，需要谨慎处理。