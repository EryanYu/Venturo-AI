export type RecommendationType =
  | "intelligence"
  | "opportunity"
  | "ecosystem"
  | "promotion";


export type RecommendationPriority =
  | "high"
  | "medium"
  | "low";


export interface AIUserRecommendation {


  id:string;


  /**
   * 内容类型
   *
   * intelligence:
   * AI行业情报
   *
   * opportunity:
   * 商业机会
   *
   * ecosystem:
   * 生态合作
   *
   * promotion:
   * 生态推荐
   */
  type:RecommendationType;



  /**
   * 推荐角色
   */
  targetRoles:string[];



  title:string;


  description:string;


  category:string;


  reason:string;



  /**
   * 行业标签
   */
  relatedTags:string[];



  /**
   * 优先级
   */
  priority?:RecommendationPriority;



  /**
   * 所属行业
   */
  industry?:string;



  /**
   * 用户行为入口
   */
  actionType?:
| "learn"
| "contact"
| "apply"
| "invest"
| "connect";



  /**
   * 数据来源
   */
  source?:string;



  createdAt:string;



  /**
   * 生态关联
   */
  relatedProjects?: string[];


  relatedInvestors?: string[];


  relatedExperts?: string[];


  /**
   * 企业需求
   */
  relatedCompanies?:string[];


}