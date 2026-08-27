# Venturo AI Architecture Map

## Intelligence System v1.0


## 1. User Layer

User
 |
 UserContext
 |
 UserProfile


支持角色：

 创业者
 投资人
 专家/顾问
 企业/产业合作方


---

## 2. Profile Layer


src/models/profile.ts


定义：

 UserProfile
 FounderProfile
 InvestorProfile
 ExpertProfile
 EnterpriseProfile


数据来源：

src/data/profileMockData.ts


---

## 3. Matching Engine


src/services/matchingEngine.ts


核心函数：

calculateProfileMatch()


输入：

source UserProfile

target UserProfile


输出：

MatchResult


---

## 4. Recommendation Engine


src/services/profileRecommendationEngine.ts


负责：

 用户画像匹配
 计算匹配度
 生成推荐理由


输出：

ProfileRecommendation[]


---

## 5. Intelligence Feed


src/app/intelligence.tsx


展示：

 AI趋势洞察
 AI机会洞察
 生态合作机会
 用户匹配推荐


组件：

ProfileRecommendationSection


---

## 6. Data Flow


User

↓

UserProfile

↓

Matching Engine

↓

Recommendation Engine

↓

Intelligence Feed

↓

生态连接