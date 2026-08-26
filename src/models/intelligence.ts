export type IntelligenceType =
  | "trend"
  | "opportunity"
  | "project"
  | "business"
  | "funding";


export type IntelligenceActionType =
  | "follow"
  | "apply"
  | "invest"
  | "contact";


export interface IntelligenceItem {


  id:string;


  type:IntelligenceType;


  title:string;


  description:string;


  category:string;


  industry:string;


  priority:
  | "high"
  | "medium"
  | "low";


  targetRoles:string[];


  actionType:IntelligenceActionType;



  reason?:string;



  relatedTags?:string[];



  relatedCompanies?:string[];



  createdAt:string;



  source?:string;



}