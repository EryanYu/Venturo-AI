export interface EnterpriseProfile {

 id:string;


 userId:string;


 companyName:string;


 // 企业行业

 industry:string;


 // 企业需求标签

 needTags:string[];


 // 合作类型

 cooperationTypes:string[];


 // 是否投资项目

 canInvest:boolean;


 // 是否产业合作

 canCooperate:boolean;


 createdAt:string;

}