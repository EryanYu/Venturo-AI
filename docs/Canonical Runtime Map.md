Venturo AI · Canonical Runtime Map v1.0
审计基准：2026-08-29
核心原则：
Canonical Runtime ≠ 文件存在 ≠ 内部有调用关系。
只有能够追溯到当前 App Runtime Entry 的链路，才进入 Canonical Runtime。

# Canonical Runtime Map

> Status: FROZEN — MVP Architecture Baseline
>
> Findings: #1–#19
>
> Finding IDs: Verified, no duplicates
>
> Purpose:
> This document records the current runtime/data architecture discovered during the MVP audit.
>
> Important:
> This is an architecture baseline, not a final production architecture.
> Code changes and runtime consolidation should be based on this document.
>
> Next Phase:
> 1. Determine MVP Canonical Runtime
> 2. Classify MockData
> 3. Establish real Profile / Project data entry
> 4. Transition Matching Runtime toward User Data
> 5. Code cleanup
> 6. GitHub checkpoint

1. 当前已经确认的 Runtime 主干
目前可以确定的主结构是：
                    Venturo AI
                         │
                         ▼
                     src/app
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     User Runtime   Business Runtime   UI Runtime
          │              │              │
          ▼              ▼              ▼
     UserContext      Services        Components
          │              │              │
          ▼              ▼              │
         User          Engines ◄────────┘
                         │
                    ┌────┴────┐
                    ▼         ▼
                  Models      Data
                              │
                           MockData
其中当前最明确的两条业务 Runtime 是：
Intelligence
app/intelligence.tsx
        │
        ├── UserContext
        │
        ▼
intelligenceEngine
        │
        ▼
intelligenceCenterMockData
        │
        ▼
Intelligence Components
        │
        ▼
intelligenceRelationEngine
        │
        ▼
allProfilesMock
        │
        ▼
UserProfile
这条链已经被文档明确确认。
Project Matching
app/project.tsx
        │
        ├── projectMockData
        │
        └── ProjectCard
                │
                ▼
        ProjectMatchSection
                │
                ▼
    projectMatchingEngine
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
     Project UserProfile allProfilesMock
其中：
Project
   ↓
Project Matching Engine
   ↓
UserProfile
   ↓
ProjectMatchResult
   ↓
Investor / Expert / Enterprise
已经属于当前实际产品功能链路。

2. User Runtime：当前真正的状态入口
这一部分现在可以正式定为：
_layout.tsx
     │
     ▼
UserProvider
     │
     ▼
UserContext
     │
     ▼
useUser()
     │
 ┌───┼───────────────┐
 ▼   ▼               ▼
AI  Intelligence   Profile
 │
 └────────────── Role
文档已经确认 UserContext 是当前 User Runtime 的主状态系统，而 UserProvider 位于 Expo Router Stack 上层。
因此：
🟢 Canonical
src/context/UserContext.tsx
⚪ 暂不进入 Canonical Runtime
src/store/userStore.ts
因为目前没有发现其它文件 import 它。

3. User → UserProfile：目前最大的架构桥梁
这里非常重要。
当前模型实际上是：
UserContext
     │
     ▼
   User
 Identity / Account
     │
     │   userId
     ▼
 UserProfile
 Business / Matching
     │
     ├──────────────┐
     ▼              ▼
Matching        Project Matching
     │              │
     └──────┬───────┘
            ▼
      Intelligence
文档已经把它确认成两个不同层次：
- User：身份层
- UserProfile：生态业务/匹配层
而 userId 已经形成潜在关联键。
但是：
UserContext → UserProfile 目前仍然没有统一 Runtime Bridge。

这是 #29，而且文档特别明确要求它不能与 #28/#30 合并。
所以 Canonical Map 中必须保留这个断点：
UserContext
    │
    ▼
   User
    │
    │
    X  ← Runtime Bridge Gap (#29)
    │
    ▼
UserProfile
🟡 当前状态
ARCHITECTURAL GAP / FUTURE RUNTIME WORK
这个问题现在不修。

4. Matching Domain：我们现在终于可以划清边界
当前 Canonical Domain 应该是：
                Matching Domain
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
UserProfile ↔ UserProfile    Project ↔ UserProfile
          │                     │
          ▼                     ▼
matchingEngine       projectMatchingEngine
这是非常重要的架构边界。
文档明确记录：
matchingEngine
UserProfile ↔ UserProfile

projectMatchingEngine
Project ↔ UserProfile
两者属于不同业务领域，不应该简单合并。

5. Matching Engine：现在不能简单说“两个都是 ACTIVE”
这里我特别帮你做一个历史结论纠偏。
旧的 #03 曾经记录：
两套 Matching Engine 均属于 ACTIVE。

但文档后来已经明确把这个结论标记为 HISTORICAL / SUPERSEDED。
原因是：
“代码内部有调用关系”不等于“进入当前 App Runtime”。

所以现在 Canonical Map 应该写成：
src/models/matchingEngine.ts
        │
        └── calculateMatchScore()
                  ▲
                  │
        models/recommendationEngine.ts

        ⚠️ Historical / Unverified
而：
src/services/matchingEngine.ts
        │
        └── calculateProfileMatch()
                  ▲
                  │
        services/profileRecommendationEngine.ts

        ⚠️ Indirect / No App Entry Confirmed
因此目前：
🟡 Canonical Candidate
services/matchingEngine.ts
⚠️ Legacy / Historical Candidate
models/matchingEngine.ts
❗ 尚未允许最终定案
Canonical Matching Engine

6. Recommendation：现在必须保持“三层模型”
目前不能把 Recommendation 粗暴合并。
已经确认存在：
Recommendation
     │
     ├── Generic Recommendation
     │
     ├── ProfileRecommendation
     │
     └── AIUserRecommendation
它们目前表达的是不同业务语义。
因此：
🟢 暂时保留
models/recommendation.ts
models/profileRecommendation.ts
models/aiRecommendation.ts
🟡 待继续审计
services/recommendationEngine.ts
services/profileRecommendationEngine.ts
models/recommendationEngine.ts
特别是：
profileRecommendationEngine
       ↓
matchingEngine
这是内部 Service 链，但目前还不能把它称作当前 App 的 Canonical Runtime。CodeMapNew.mdMD

7. Intelligence：目前最完整的 Canonical Runtime
这一条我建议正式冻结：
                 Intelligence
                      │
                      ▼
             app/intelligence.tsx
                      │
              ┌───────┴────────┐
              ▼                ▼
       UserContext      intelligenceEngine
                                │
                                ▼
                    intelligenceCenterMockData
                                │
                                ▼
                    Intelligence Components
                                │
                                ▼
                 intelligenceRelationEngine
                                │
                                ▼
                       allProfilesMock
                                │
                                ▼
                          UserProfile
其中：
🟢 Core Runtime
- intelligenceEngine
- intelligenceRelationEngine
- intelligenceCenterMockData
- allProfilesMock
- UserProfile
而 Intelligence Engine 当前本质上仍然是：
Mock Data
    ↓
Role Filter
    ↓
Type Filter
    ↓
UI
还不是未来真正的：
Real Data
    ↓
AI Processing
    ↓
Personalized Ranking
    ↓
Intelligence Feed
这对应 #16。

8. allProfilesMock：正式放入 Runtime 核心节点
这一点现在可以非常明确：
profileMockData
       ↓
allProfilesMockData
       ↓
   allProfilesMock
       │
       ├───────────────┐
       ▼               ▼
Intelligence       Project Matching
Relations
allProfilesMock 当前承担的是：
Venturo AI Demo 阶段的统一生态 Profile Registry

所以它不是普通的 MockData。
🟢 Runtime Shared Data Registry
allProfilesMock
这是我们后面做真实后端数据层迁移时非常重要的锚点。

9. App 层最终形成三类 Runtime
按照文档当前状态：
🟢 A — Runtime / Engine 驱动
intelligence.tsx
project.tsx
ai.tsx
profile.tsx
role.tsx
🟡 B — MockData Runtime
enterprise.tsx
expert.tsx
investor.tsx
matching.tsx
这些页面现在仍然直接消费 MockData。
⚪ C — Expo / 基础页面
explore.tsx
index.tsx
login.tsx
所以我们现在不要误以为整个 App 已经进入统一 Engine 架构。
实际上是：
                 src/app
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 Engine Runtime             Mock Runtime
        │                       │
 Intelligence                Investor
 Project                     Expert
 AI                          Enterprise
 Profile                     Matching
 Role
这就是目前真正的 Runtime Reality。

10. Canonical Runtime Map：最终压缩版
以后我们查代码，我建议直接以这一张为准：
                         VENTURO AI
                             │
                             ▼
                         src/app
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   User Runtime         Business Runtime       Mock Runtime
        │                    │                    │
        ▼                    ▼                    ▼
   UserContext          Services/Engine       MockData
        │                    │                    │
        ▼            ┌───────┼────────┐          │
       User          ▼       ▼        ▼          │
        │       Intelligence Project Matching    │
        │            │       │        │           │
        │            ▼       ▼        ▼           │
        │       Intelligence Project UserProfile │
        │            │       │        │           │
        │            └───────┼────────┘           │
        │                    ▼                    │
        │             allProfilesMock             │
        │                                         │
        └─────────────── X ───────────────────────┘
                         │
                  User → UserProfile
                    Bridge Gap #29

11. 现在的架构等级
我建议从现在开始正式采用：
模块	当前等级
UserContext	🟢 Core Runtime
User	🟢 Core Domain
UserProfile	🟢 Core Domain
allProfilesMock	🟢 Core Demo Registry
intelligenceEngine	🟢 Canonical Runtime
intelligenceRelationEngine	🟢 Canonical Runtime
projectMatchingEngine	🟢 Canonical Runtime
services/matchingEngine	🟡 Canonical Candidate
profileRecommendationEngine	🟡 Unverified Runtime
recommendationEngine	🟡 Unverified Runtime
models/matchingEngine	🟠 Legacy / Historical
models/recommendationEngine	🟠 Legacy / Historical
userStore	⚪ Unused / Future
matchingMockData	🔴 Orphan MockData
intelligenceMockData	🔴 Orphan MockData
Role Center MockData	🟡 Mock Runtime

其中 matchingMockData 和 intelligenceMockData 已有明确的孤立数据证据。

12. 这一版最重要的结论
我认为现在可以冻结 5 个架构事实：
① UserContext 是当前 User Runtime 主入口
不用再怀疑。
② User 与 UserProfile 是两个不同 Domain Layer
暂时不要合并。
③ Project Matching 是独立 Engine
不要塞进普通 Matching Engine。
④ allProfilesMock 是当前 Demo 的共享 Profile Registry
后面会非常有价值。
⑤ 真正的核心问题不是“代码乱”
而是：
Runtime 已经形成，但仍存在 Engine 双轨、Mock Runtime 双轨，以及 User → UserProfile Bridge Gap。

这与当前 Findings 的证据链是一致的。尤其 #28 → #29 → #30 → #31 → #32 → #33 已经形成非常完整的一条架构演进链。


13. Matching / Recommendation Engine 存在多套 Runtime 实现
搜索结果显示，目前项目中至少存在以下两套相关 Runtime：
Models 层：
- src/models/matchingEngine.ts
  - calculateMatchScore
  - generateRecommendations
- src/models/recommendationEngine.ts
  - generateRecommendations
Services 层：
- src/services/matchingEngine.ts
  - calculateProfileMatch
- src/services/profileRecommendationEngine.ts
  - generateProfileRecommendations
- src/services/recommendationEngine.ts
  - getRecommendations
初步判断：
项目目前存在 models/*Engine 与 services/*Engine 两套不同职责/实现体系，且函数名称存在明显重叠，例如：
- generateRecommendations
- calculateMatchScore
- calculateProfileMatch
- generateProfileRecommendations
- getRecommendations
目前不能直接判断哪些应该删除或合并。
下一步必须检查这些函数的实际实现以及调用方，建立真正的 Runtime Call Graph 后再决定 Canonical Runtime。

14. Dual Matching Runtime
当前项目存在两套独立的 UserProfile Matching Runtime：
Runtime A
models/matchingEngine.ts
→ calculateMatchScore()
→ models/recommendationEngine.ts
→ Recommendation
Runtime B
services/matchingEngine.ts
→ calculateProfileMatch()
→ services/profileRecommendationEngine.ts
→ ProfileRecommendation
两套 Runtime 均以 UserProfile 为输入并产生 0–100 匹配分数，但评分维度、权重及部分标签匹配方向存在差异。
当前不能认定其中任何一套为 Canonical Runtime。
Action: 暂不删除、暂不合并。继续追踪实际调用方（Call Sites），确认生产 UI 当前实际使用哪一套 Runtime，再决定 Canonical Matching Engine。

15. Matching Runtime Call-Site Isolation
对 calculateProfileMatch、calculateMatchScore、generateProfileRecommendations、generateRecommendations 进行全项目调用检索后：
Runtime B
services/matchingEngine.ts
→ calculateProfileMatch()
→ services/profileRecommendationEngine.ts
→ generateProfileRecommendations()
当前仅发现 profileRecommendationEngine.ts 调用 calculateProfileMatch()；未发现 generateProfileRecommendations() 的其他调用方。
Runtime A
models/matchingEngine.ts
→ calculateMatchScore()
→ models/recommendationEngine.ts
→ generateRecommendations()
当前搜索结果未发现 App/UI 层直接调用上述 Matching Runtime。
Conclusion:
两套 Matching Runtime 均已实现，但目前尚未通过 Call-Site 证据确认其为当前 App 的实际 Canonical Runtime。
Status: UNRESOLVED / CALL-SITE ISOLATION
Action: 暂不删除、暂不合并。继续向上追踪 app/*.tsx → components/* → services/* / models/* 的实际调用链。

🚨 新的核心发现
现在至少可以确认：
MatchCard 并不是 Matching Engine
matching.tsx 使用：
recommendationMockData
        ↓
MatchCard

而不是：
UserProfile
        ↓
Matching Engine
        ↓
Recommendation
        ↓
MatchCard
也就是说，当前 matching.tsx 的“AI智能匹配中心”实际上仍然是：
MockData 驱动的 UI。

investor.tsx 也是类似情况
之前已经看到：
investorRecommendationMockData
        ↓
MatchCard
所以目前不能把它视为真正的 Recommendation Runtime。
project.tsx 是目前比较不同的一条链
之前已经发现：
project.tsx
      ↓
generateProjectMatches()
      ↓
services/projectMatchingEngine.ts
      ↓
Project ↔ UserProfile
并且这次结果再次确认：
ProjectMatchSection
      ↓
services/projectMatchingEngine
而 projectMatchingEngine.ts 自己明确写着：
matchingEngine.ts 专门负责 UserProfile ↔ UserProfile
本文件专门负责 Project ↔ UserProfile

因此这里实际上形成了明确的职责边界：
UserProfile ↔ UserProfile
        ↓
matchingEngine.ts

Project ↔ UserProfile
        ↓
projectMatchingEngine.ts
这是目前非常有价值的一条架构证据。

16. Current UI Matching Is Predominantly MockData-Driven
Call-site 检索结果显示：
- src/app/matching.tsx 未直接调用 calculateProfileMatch、calculateMatchScore、generateRecommendations 或 generateProfileRecommendations。
- src/components 中未发现 matchingEngine、recommendationEngine 或 profileRecommendationEngine 的直接 import。
- MatchCard 当前主要由 App 层直接传入 MockData 结果进行渲染。
- investor.tsx 使用 investorRecommendationMockData → MatchCard。
- matching.tsx 使用 recommendationMockData → MatchCard。
- project.tsx / ProjectMatchSection.tsx 则已经连接 services/projectMatchingEngine.ts。
Conclusion:
当前产品 UI 中，“Matching / Recommendation”相关页面并未整体接入前面发现的两套 UserProfile Matching Runtime。
当前至少存在：
MockData Runtime
与
Actual Project Matching Runtime
两种不同状态。
Status: PARTIALLY_CONNECTED
Action: 暂不删除 Matching / Recommendation Engine。继续建立完整 Runtime Map，确认哪些 Runtime 是当前产品真实运行路径，哪些属于预备/历史实现。

17. Project Matching Runtime Is Actively Wired to Project UI
src/app/project.tsx actively imports and invokes generateProjectMatches() from src/services/projectMatchingEngine.ts.
Runtime flow:
projectMockData[0]
→ generateProjectMatches()
→ ProjectMatchResult[]
→ <ProjectMatchSection matches={projectMatches} />
→ Project Matching UI.
generateProjectMatches() internally consumes allProfilesMockData.
Therefore, Project Matching is not dead code or an isolated service; it is an active UI-connected runtime, but its current data source remains MockData-driven.

18. Project/User/Profile Identity and Role Taxonomy Are Not Yet Canonicalized
projectMockData currently uses founderId values "001" and "002", while UserContext.defaultUser.id is "001" and "profileMockData" uses userId values such as "user_001".
Therefore, Project → User and Profile → User currently appear to use different identifier conventions and should not yet be treated as one canonical identity system.
Additionally, Project resourceNeeds contains values such as "AI专家" and "企业客户", while canonical UserProfile.role values are "专家/顾问" and "企业/产业合作方". Current calculateProjectProfileMatch() compares project.resourceNeeds against profile.seekingRoles, not directly against profile.role.
This indicates that identity IDs and ecosystem-role vocabulary are not yet fully canonicalized.

19. allProfilesMock Is an Aggregation Layer Over Role-Specific Mock Profiles
src/data/allProfilesMockData.ts does not define independent profile records. It imports founderProfileMock, investorProfileMock, expertProfileMock, and enterpriseProfileMock from profileMockData.ts, then aggregates them into allProfilesMock: UserProfile[].
Therefore, allProfilesMockData.ts should be treated as a Mock Profile Registry/Aggregation Layer rather than an independent data source.
Current Project Matching data flow is:
projectMockData → generateProjectMatches() → allProfilesMock → role-specific profiles from profileMockData.ts → calculateProjectProfileMatch() → ProjectMatchSection.

20. MVP Matching Runtime Is Currently Project-Centric

### Status
Confirmed

### Evidence

The currently verified active Matching UI runtime is:

ProjectScreen
→ generateProjectMatches()
→ services/projectMatchingEngine.ts
→ calculateProjectProfileMatch()
→ allProfilesMock
→ ProjectMatchSection

### Conclusion

The current MVP Matching Runtime is Project ↔ UserProfile centric.

Profile ↔ Profile matching capabilities exist in:

- models/matchingEngine.ts
- services/matchingEngine.ts

However, no App/UI call-site has currently been identified for:

- generateProfileRecommendations()
- calculateProfileMatch()
- generateRecommendations()
- calculateMatchScore()

Therefore Profile ↔ Profile matching is currently classified as implemented capability / non-active runtime rather than confirmed active MVP runtime.

### Architecture Decision

Do not delete either Profile ↔ Profile matching implementation yet.

The Project Matching Runtime remains the only currently verified active Matching Runtime.

### Next Step

Classify MockData according to the verified MVP runtime before making runtime consolidation or code cleanup decisions.


21. MockData Classification

### Status
Confirmed

### Classification

#### ① MVP 必须保留

- src/data/projectMockData.ts
- src/data/profileMockData.ts
- src/data/allProfilesMockData.ts

These files currently provide data required by the verified MVP Project Matching Runtime.

Runtime relationship:

projectMockData
→ project.tsx
→ generateProjectMatches()
→ projectMatchingEngine.ts

profileMockData
→ allProfilesMockData.ts
→ allProfilesMock
→ projectMatchingEngine.ts

allProfilesMock
→ projectMatchingEngine.ts
→ Project Matching UI

allProfilesMock
→ intelligenceRelationEngine.ts

---

#### ② MVP 暂时保留，但未来必须接真实数据

- src/data/recommendationMockData.ts
- src/data/investorRecommendationMockData.ts
- src/data/expertRecommendationMockData.ts
- src/data/aiRecommendationMockData.ts

Current usage:

recommendationMockData
→ matching.tsx

investorRecommendationMockData
→ investor.tsx

expertRecommendationMockData
→ expert.tsx

aiRecommendationMockData
→ services/recommendationEngine.ts

These files remain useful during the MVP stage but should eventually be replaced by real recommendation/runtime data.

---

#### ③ 仅 Demo / UI Mock

No currently confirmed file.

No MockData file should be classified as pure UI Mock without evidence that it has no runtime or business-data dependency.

---

#### ④ Legacy / 可以最终删除

No currently confirmed file.

Deletion requires explicit evidence of replacement or confirmed absence of runtime/business usage.

### Architecture Principle

MockData is not automatically Legacy.

Classification is based on runtime dependency and business responsibility, not filename.

### Next Step

Establish the real Profile / Project data entry layer.


22. Canonical Identity Is Not Yet Established

### Status
Confirmed

### Finding

Venturo AI currently contains multiple identity namespaces and multiple user-state sources.

### 1. User Identity

`src/context/UserContext.tsx`

Current default user:

- id: "001"

`src/store/userStore.ts`

Current global runtime user:

- id: "001"

`src/data/userMockData.ts`

Current mock user:

- id: "user_001"

Therefore User identity is currently inconsistent.

---

### 2. Profile Identity

`src/data/profileMockData.ts`

Founder:

- id: "founder_001"
- userId: "user_001"

Investor:

- id: "investor_001"
- userId: "user_002"

Expert:

- id: "expert_001"
- userId: "user_003"

Enterprise:

- id: "enterprise_001"
- userId: "user_004"

Profile therefore has its own profile-level ID plus a user-level ID.

---

### 3. Project Identity

`src/data/projectMockData.ts`

Project 001:

- id: "001"
- founderId: "001"

Project 002:

- id: "002"
- founderId: "002"

No verified canonical relationship currently exists between:

Project.founderId

and

Profile.userId / Profile.id.

---

### 4. Investor Identity

`src/data/matchingMockData.ts`

Investor IDs include:

- "investor001"
- "investor002"
- "investor003"

while Profile identity uses:

- "investor_001"

Therefore investor identity naming is also inconsistent.

---

### 5. Multiple User State Sources

The application currently contains at least:

UserContext + AsyncStorage

and

userStore + globalThis.VENTURO_USER

and

userMockData

These should not be treated as equivalent sources.

A future canonical user state/data layer must explicitly define the authoritative source.

---

### Architectural Conclusion

The MVP must establish a Canonical Identity Contract before introducing the real Profile / Project data entry layer.

The identity relationship should eventually be explicitly defined as:

User
→ Profile
→ Project

with stable IDs and explicit foreign-key relationships.

No ID renaming or data migration should be performed yet.

### Rule

Do not fix individual IDs opportunistically.

First define the Canonical Identity Contract, then perform one controlled migration.

### Next Step

Define the MVP Canonical Identity Contract and determine the authoritative User state source.


23. MVP Canonical Identity Contract

### Status
Confirmed — MVP Architecture Decision

### Decision

The MVP adopts `User.id` as the canonical user identity.

The identity relationship is:

User
→ Profile
→ Project

with explicit user-level ownership relationships.

---

### 1. Canonical User Identity

`User.id` is the authoritative identity of a platform user.

Example:

user_001

The following should NOT become independent canonical user identities:

- "001"
- "user_001" as an alternative representation of the same User
- runtime-generated temporary IDs

The MVP should converge on one stable User ID namespace.

---

### 2. Profile Identity

A Profile represents a user's ecosystem role / capability profile.

Profile has its own entity ID:

profile.id

and references the canonical user through:

profile.userId → User.id

Example:

User
id = "user_001"

FounderProfile
id = "founder_001"
userId = "user_001"

Therefore:

User.id ≠ Profile.id

but:

Profile.userId = User.id

---

### 3. Project Ownership

A Project belongs to a User.

Therefore:

Project.founderId → User.id

Example:

User
id = "user_001"

Project
id = "project_001"
founderId = "user_001"

Project ownership should NOT depend on the Profile entity ID.

---

### 4. Identity Layers

The MVP identity model is therefore:

User
│
├── Profile
│   └── Profile.userId → User.id
│
└── Project
    └── Project.founderId → User.id

This establishes a stable ownership boundary between identity, profile, and project.

---

### 5. Role Is Not Identity

A user's role is an attribute of the User / Profile relationship.

Role changes must not require changing:

- User.id
- Profile.id
- Project.id
- Project ownership identity

The identity remains stable while role-related information may change.

---

### 6. Current Legacy State

The current codebase contains older identity/state implementations, including:

`src/store/userStore.ts`

which currently uses:

id = "001"

and

`src/context/UserContext.tsx`

which also contains a default user using:

id = "001"

while:

`src/data/userMockData.ts`

uses:

id = "user_001"

These are considered legacy/inconsistent representations during the MVP transition.

No immediate deletion or migration is required at this stage.

---

### 7. Migration Rule

Do NOT individually rename IDs during ongoing development.

When the real data layer is introduced, identity migration should be performed as one controlled change.

The migration target is:

User.id
→ Profile.userId

User.id
→ Project.founderId

---

### 8. Canonical Identity Example

Canonical MVP example:

User
{
  id: "user_001"
}

Profile
{
  id: "founder_001",
  userId: "user_001"
}

Project
{
  id: "project_001",
  founderId: "user_001"
}

This is the reference model for future data-entry and persistence work.

---

### Architectural Consequence

Future Profile / Project Data Services must use the Canonical Identity Contract.

Matching Runtime should consume UserProfile / Project entities and should not contain responsibility for resolving legacy identity formats.

Identity resolution belongs to the Data Layer.

---

### Next Step

Proceed to:

④-1 Profile Data Entry Layer

using the Canonical Identity Contract defined above.

Do not perform broad code cleanup yet.
Do not delete legacy files yet.
Do not migrate all IDs yet.

24. Profile Data Entry Runtime Boundary
核心结论：
UserContext + AsyncStorage 已经构成 MVP 的 User Runtime；Profile 不应继续直接依赖 MockData，而应建立独立的 Profile Repository，以 User.id → Profile.userId 建立关系。第一版 Repository 使用 AsyncStorage，未来可以无痛替换为 API/Database。