import { EnterpriseProfile } from "@/models/enterprise";


export const enterpriseMockData:EnterpriseProfile[] = [


{
 id:"enterprise_001",

 userId:"user_enterprise_001",

 companyName:"未来智能科技集团",

 industry:"智能制造",

 needTags:[
 "AI制造",
 "工业机器人",
 "数字化工厂"
 ],

 cooperationTypes:[
 "技术合作",
 "产业投资",
 "供应链合作"
 ],

 canInvest:true,

 canCooperate:true,

 createdAt:"2026-08-24"

},


{
 id:"enterprise_002",

 userId:"user_enterprise_002",

 companyName:"新能源产业集团",

 industry:"新能源",

 needTags:[
 "新能源技术",
 "储能",
 "智能能源管理"
 ],

 cooperationTypes:[
 "产业合作",
 "战略投资"
 ],

 canInvest:true,

 canCooperate:true,

 createdAt:"2026-08-24"

}


];