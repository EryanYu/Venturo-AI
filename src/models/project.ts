export interface Project {


  id:string;


  // 项目名称
  name:string;


  // 项目简介
  description:string;


  // 行业方向
  industry:string;


  // 项目阶段
  stage:
  | "Idea"
  | "MVP"
  | "Growth"
  | "Scale";


  // 创业者ID
  founderId:string;


  // 团队信息
  team:string;


  // 融资状态
  fundingStatus:
  | "未融资"
  | "融资中"
  | "已完成融资";


  // 融资需求
  fundingAmount?:string;


  // AI评分
  aiScore?:number;


  // 创建时间
  createdAt:string;

}