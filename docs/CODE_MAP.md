# Venturo AI Code Map

Version:
V0.1 Prototype

Date:
2026-08


# Project Overview

Venturo AI is an AI-driven venture ecosystem platform.

Core users:

1. Founder 创业者
2. Investor 投资人
3. Expert/Advisor 专家顾问
4. Enterprise/Industry 企业产业方



# Project Structure


src/

├── app

页面入口


├── components

可复用业务组件


├── constants

系统常量


├── models

数据模型


├── store

状态管理



# Application Flow


User

↓

Role Selection

(src/app/role.tsx)


↓

Update User Role

(src/store/userStore.ts)


↓

Profile Center

(src/app/profile.tsx)


↓

Dashboard Router


↓

FounderDashboard

InvestorDashboard

ExpertDashboard

EnterpriseDashboard



# Core Files


## role.tsx

Location:

src/app/role.tsx


Function:

User identity selection


## profile.tsx

Location:

src/app/profile.tsx


Function:

User control center


## userStore.ts

Location:

src/store/userStore.ts


Function:

Current user state management



# Dashboard Modules


## FounderDashboard

Function:

Founder operating system


## InvestorDashboard

Function:

Investment workspace


## ExpertDashboard

Function:

Expert service center


## EnterpriseDashboard

Function:

Industry cooperation center



# Future Expansion


Backend API

Database

AI Agent

Digital Avatar

Web3 Data Asset

Token System