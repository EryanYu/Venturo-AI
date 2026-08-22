import { InvestmentMatch } from "@/models/matching";


export const matchingMockData:InvestmentMatch[] = [


{
id:"match001",


projectId:"001",


investorId:"investor001",


score:92,


category:"行业匹配",


reason:
"投资人关注人工智能方向，与项目AI SaaS领域高度匹配。",


createdAt:"2026-08-22"

},



{
id:"match002",


projectId:"002",


investorId:"investor002",


score:86,


category:"阶段匹配",


reason:
"投资人关注早期科技项目，符合当前Growth阶段融资需求。",


createdAt:"2026-08-22"

},



{
id:"match003",


projectId:"001",


investorId:"investor003",


score:88,


category:"投资偏好",


reason:
"投资机构重点关注企业AI应用方向。",


createdAt:"2026-08-22"

}


];