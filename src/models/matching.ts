export interface InvestmentMatch {


  id:string;


  // 项目ID
  projectId:string;


  // 投资人ID
  investorId:string;


  // 匹配分数
  score:number;


  // 匹配原因
  reason:string;


  // 匹配方向
  category:
  | "行业匹配"
  | "阶段匹配"
  | "投资偏好"
  | "技术匹配";


  createdAt:string;


}