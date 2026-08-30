import {
  IntelligenceItem
} from "@/models/intelligence";


export const intelligenceCenterMockData:
IntelligenceItem[] = [

  {
    id:"insight_001",

    type:"insight",

    targetRoles:[
      "创业者",
      "投资人",
      "专家/顾问",
      "企业/产业合作方"
    ],

    title:"企业级 AI Agent 正进入规模化落地阶段",

    description:
      "越来越多企业开始从模型实验转向真实业务场景部署，垂直行业 AI Agent 正成为重要应用方向。",

    category:"AI行业洞察",

    reason:
      "AI Agent 正从技术探索逐步进入商业化和产业落地阶段。",

    relatedTags:[
      "AI Agent",
      "Enterprise AI",
      "SaaS"
    ],

    priority:"high",

    industry:"Enterprise AI",

    actionType:"learn",

    source:"Venturo AI Intelligence",

    createdAt:"2026-08-27"
  },


  {
    id:"founder_opp_001",

    relatedProjects:[
    "project_001"
    ],

    relatedExperts:[
    "expert_001"
    ],

    relatedCompanies:[
    "enterprise_001"
    ],

    type:"founder_opportunity",

    targetRoles:[
      "创业者"
    ],

    title:"垂直行业 AI Agent SaaS 创业机会",

    description:
      "企业自动化、知识管理和业务流程智能化正在形成新的垂直 SaaS 创业空间。",

    category:"创业机会",

    reason:
      "如果你的创业方向涉及 AI Agent、企业 SaaS 或自动化，该方向值得重点关注。",

    relatedTags:[
      "AI Agent",
      "SaaS",
      "Enterprise AI"
    ],

    priority:"high",

    industry:"Enterprise AI",

    actionType:"apply",

    source:"Venturo AI Intelligence",

    createdAt:"2026-08-27"
  },


  {
    id:"investor_opp_001",
    
    relatedProjects:[
    "project_001"
    ],

    relatedInvestors:[
    "investor_001"
    ],

    relatedExperts:[
    "expert_001"
    ],

    relatedCompanies:[
    "enterprise_001"
    ],

    type:"investor_opportunity",

    targetRoles:[
      "投资人"
    ],

    title:"企业 AI 基础设施与应用正在形成新的投资窗口",

    description:
      "AI Agent、企业 AI SaaS、模型基础设施和 AI 应用工具持续获得资本关注。",

    category:"投资机会",

    reason:
      "企业 AI 从模型能力向真实业务应用迁移，可能形成新的早期投资机会。",

    relatedTags:[
      "AI Infrastructure",
      "AI Agent",
      "Enterprise AI"
    ],

    priority:"high",

    industry:"AI Venture",

    actionType:"invest",

    source:"Venturo AI Intelligence",

    createdAt:"2026-08-27"
  }

];