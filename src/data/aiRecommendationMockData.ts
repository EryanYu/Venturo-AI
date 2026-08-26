import { AIUserRecommendation } from "@/models/aiRecommendation";


export const aiRecommendationMockData:
AIUserRecommendation[] = [



{
id:"ai_rec_001",

type:"opportunity",

targetRoles:["创业者"],

title:"AI Agent SaaS创业机会",

description:
"企业级AI Agent正在快速落地，垂直行业SaaS成为创业热点。",

category:"创业机会",

reason:
"你的创业方向与AI SaaS赛道高度匹配，建议关注企业自动化场景。",

relatedTags:[
"AI Agent",
"SaaS",
"Enterprise AI"
],

priority:"high",

industry:"Enterprise AI",

actionType:"apply",

source:"Venturo AI Intelligence",

createdAt:"2026-08-24"

},



{
id:"ai_rec_002",

type:"intelligence",

targetRoles:["投资人"],

title:"AI基础设施投资趋势",

description:
"模型基础设施、AI算力和开发工具成为资本关注方向。",

category:"投资趋势",

reason:
"符合AI科技投资方向，建议关注早期基础设施项目。",

relatedTags:[
"AI Infrastructure",
"LLM",
"Cloud"
],

priority:"high",

industry:"AI Infrastructure",

actionType:"invest",

createdAt:"2026-08-24"

},



{
id:"ai_rec_003",

type:"ecosystem",

targetRoles:["专家/顾问"],

title:"机器人智能化技术突破",

description:
"机器人视觉、多模态模型推动智能制造升级。",

category:"技术趋势",

reason:
"与你的技术能力标签匹配，可参与项目评估。",

relatedTags:[
"Robotics",
"Computer Vision",
"AI"
],

priority:"medium",

industry:"Robotics",

actionType:"contact",

createdAt:"2026-08-24"

},



{
id:"ai_rec_004",

type:"ecosystem",

targetRoles:["企业/产业合作方"],

title:"产业AI升级机会",

description:
"制造、能源、医疗等行业正在加速AI应用。",

category:"产业机会",

reason:
"符合产业数字化需求，可寻找技术合作项目。",

relatedTags:[
"Industrial AI",
"Digital Transformation"
],

priority:"high",

industry:"Industrial AI",

actionType:"contact",

relatedCompanies:[
"智能制造企业"
],

createdAt:"2026-08-24"

},


{
id:"ai_rec_005",

type:"ecosystem",

targetRoles:[
 "创业者"
],

title:"AI创业生态合作机会",

description:
"寻找AI技术伙伴、产业资源与投资机构，共同推进创业项目落地。",

category:
"生态合作",

reason:
"你的创业方向适合连接技术专家、产业伙伴和投资资源。",

industry:
"AI Startup",

actionType:
"connect",

relatedCompanies:[
"AI技术团队",
"产业合作企业",
"投资机构"
],

createdAt:
"2026-08-24",

priority:
"high"

},


{
id:"ai_rec_006",

type:"ecosystem",

targetRoles:[
 "投资人"
],

title:"AI项目生态发现机会",

description:
"连接优质AI创业项目、技术专家和产业资源。",

category:
"生态合作",

reason:
"帮助投资人发现早期AI创新项目并建立产业网络。",

industry:
"AI Venture",

actionType:
"connect",

relatedCompanies:[
"AI创业团队",
"产业资本"
],

createdAt:
"2026-08-24",

priority:
"high"

}


];