# Venturo AI Development Guide


## 1. Project Overview


Venturo AI is an AI-driven venture ecosystem platform.


The project architecture follows:


User Role

↓

AI Capability

↓

Business Scenario

↓

Data Model

↓

Future AI Service



---

# 2. Development Principles


## 2.1 Keep Stable First


Do not rewrite working modules.

Prefer incremental upgrades.


Example:


Old:

Page + Data + UI


Upgrade:


Page

↓

Component

↓

Data Layer

↓

API



---

## 2.2 Component First


Reusable UI should be placed in:


src/components/


Example:


AI Card

Dashboard Card

Project Card



Do not duplicate UI code between pages.



---

# 3. Folder Structure


Current:


src/


app/

Application pages


components/

Reusable UI components


data/

Mock data and temporary datasets


models/

TypeScript interfaces


store/

Global state management


constants/

Global configuration



---

# 4. Naming Rules


## Files


Components:


PascalCase


Example:


FounderDashboard.tsx


AIAssistantCard.tsx



Data files:


camelCase


Example:


aiMockData.ts



Models:


camelCase


Example:


user.ts

project.ts



---

# 5. TypeScript Rules


All business data should define interfaces.


Example:


```ts
export interface User {

id:string;

name:string;

role:string;

}

Avoid using:
any
unless necessary.


6. Role System Rules
Current roles:
- 创业者
- 投资人
- 专家/顾问
- 企业/产业合作方
When adding new roles:
1. Update user model
2. Update role constants
3. Update role AI data
4. Update documentation


7. AI Module Rules
AI related files:
components:
src/components/ai/
data:
src/data/
models:
src/models/
Future:
API Layer
↓
AI Service
↓
Agent System


8. Data Flow
Current:
Mock Data
↓
Component
↓
Page
Future:
User Data
↓
AI Router
↓
LLM
↓
RAG Knowledge Base
↓
Personal AI Agent


9. Git Workflow
Before major changes:
git status
After testing:
git add .
git commit -m "description"
Version commits should represent:
Feature
Architecture
Bug Fix


10. Encoding Rules
Project uses:
UTF-8
All source files should maintain UTF-8 encoding.
Avoid GBK encoding issues.


11. Future Modules
Planned:
Project System
Funding System
Pitch System
Expert Network
AI Podcast
Web3 Data Layer
Development should reserve interfaces for future expansion.

---

当前 V0.2 文档体系：


产品设计
   |
   |
DATA_MODEL
   |
   |
ROLE_SYSTEM
   |
   |
AI_ARCHITECTURE
   |
   |
AI_DATA_FLOW
   |
   |
DEVELOPMENT_GUIDE