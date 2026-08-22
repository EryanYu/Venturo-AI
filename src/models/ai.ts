export interface AIInsight {

  id:string;

  title:string;

  description:string;

  category:
| "创业趋势"
| "投资机会"
| "行业分析"
| "技术趋势";

  createdAt:string;

}



export interface AIRecommendation {

  id:string;

  title:string;

  description:string;


  targetRole:
| "创业者"
| "投资人"
| "专家/顾问"
| "企业/产业方";


}



export interface AIAssistantMessage {

  id:string;

  role:
  | "user"
  | "assistant";


  content:string;


  createdAt:string;

}