import {
    FounderProfile,
    InvestorProfile,
    ExpertProfile,
    EnterpriseProfile
} from "@/models/profile";



export const founderProfileMock:FounderProfile = {


    id:"founder_001",


    userId:"user_001",


    name:"Alex",


    role:"创业者",



    industry:"人工智能",


    city:"深圳",



    trackTags:[

        "AI/大模型",

        "企业SaaS",

        "AI Agent"

    ],



    needTags:[

        "寻找天使投资",

        "技术合伙人",

        "融资顾问",

        "产业资源"

    ],



    skillTags:[

        "产品设计",

        "商业模式",

        "团队管理"

    ],


     seekingRoles:[

    "投资人",

    "专家/顾问",

    "企业/产业合作方"

    ],


    resources:[

    "AI产品经验",

    "创业团队",

    "商业模式设计"

    ],



    description:

    "专注AI应用方向的早期创业者",



    startupName:

    "Venturo AI",



    fundingStage:

    "pre_seed",



    fundingNeed:

    "500万元",



    createdAt:

    "2026-08-22"


};





export const investorProfileMock:InvestorProfile = {


    id:"investor_001",


    userId:"user_002",


    name:"David",


    role:"投资人",



    industry:"人工智能",



    city:"北京",



    trackTags:[

        "AI/大模型",

        "企业AI",

        "机器人"

    ],



    needTags:[

        "寻找优质项目"

    ],



    skillTags:[

        "投资分析",

        "行业研究"

    ],



    seekingRoles:[

    "创业者"

    ],


    resources:[

    "资金",

    "投资经验",

    "产业资源"

    ],



    description:

    "关注早期AI创新项目的投资人",



    investmentStages:[

        "pre_seed",

        "seed"

    ],



    ticketSize:

    "100-500万元",



    portfolio:[

        "AI SaaS",

        "机器人"

    ],



    createdAt:

    "2026-08-22"


};





export const expertProfileMock:ExpertProfile = {


    id:"expert_001",


    userId:"user_003",


    name:"Dr.Li",


    role:"专家/顾问",



    industry:"人工智能",



    city:"上海",



    trackTags:[

        "AI/大模型",

        "机器人",

        "智能制造"

    ],



    needTags:[

        "参与技术评估",

        "参与项目路演"

    ],



    skillTags:[

        "LLM",

        "算法",

        "机器学习"

    ],


    seekingRoles:[

    "创业者",

    "企业/产业合作方"

    ],


    resources:[

    "AI技术能力",

    "算法经验",

    "项目评估能力"
    
    ],



    description:

    "AI领域技术专家",



    expertise:[

        "大模型",

        "机器学习",

        "智能系统"

    ],



    background:

    "高校AI实验室负责人",



    patents:[

        "智能推理系统"

    ],



    canJoinStartup:

    true,



    availableForPitch:

    true,



    createdAt:

    "2026-08-22"


};





export const enterpriseProfileMock:EnterpriseProfile = {


    id:"enterprise_001",


    userId:"user_004",


    name:"Future Tech",


    role:"企业/产业合作方",



    industry:"智能制造",



    city:"广州",



    trackTags:[

        "工业AI",

        "智能制造"

    ],



    needTags:[

        "寻找技术合作",

        "产业投资"

    ],



    skillTags:[

        "产业资源",

        "供应链"

    ],


    seekingRoles:[

    "创业者",

    "专家/顾问"
    
    ],


    resources:[

    "产业场景",

    "供应链资源",

    "商业渠道"

    ],



    description:

    "寻找AI技术合作机会的产业方",



    companyName:

    "Future Tech",



    industryNeeds:[

        "工业AI",

        "自动化"

    ],



    cooperationTypes:[

        "技术合作",

        "产业投资"

    ],



    createdAt:

    "2026-08-22"


};