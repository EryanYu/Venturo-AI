# AI Intelligence v0.3 Runtime Map

## 1. Status
当前版本、分支、审计状态

## 2. Canonical Runtime
/intelligence
↓
intelligenceEngine
↓
intelligenceCenterMockData
↓
IntelligenceItem
↓
UI Sections

## 3. Intelligence Engine
getIntelligenceFeed
getDailyInsights
getFounderOpportunities
getInvestorOpportunities

## 4. Relation Layer
intelligenceRelationEngine
↓
Projects / Investors / Experts / Companies
↓
allProfilesMock
↓
UserProfile

明确标记：
PREPARED / NOT YET CONNECTED TO /intelligence

## 5. Runtime Boundary
明确排除：
Matching
Recommendation
AI Agent

## 6. Architecture Principle
Intelligence → Relation → Matching → Recommendation → Agent

## 7. v0.3 Development Status
ACTIVE
PREPARED
SEPARATE
FUTURE

v0.3 当前真正运行的是 Intelligence Core；Relation Layer 已建立但尚未接入 /intelligence 页面 Runtime
/intelligence
      │
      ▼
intelligenceEngine
      │
      ▼
intelligenceCenterMockData
      │
      ▼
IntelligenceItem
      │
      ▼
UI Sections
      │
      └─────── 当前 ACTIVE


intelligenceRelationEngine
      │
      ▼
allProfilesMock
      │
      ▼
UserProfile
      │
      └─────── PREPARED