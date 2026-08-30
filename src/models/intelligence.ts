export type IntelligenceType =
  | "insight"
  | "opportunity"
  | "founder_opportunity"
  | "investor_opportunity"
  | "funding"
  | "trend"
  | "business";

export type IntelligencePriority =
  | "high"
  | "medium"
  | "low";


export interface IntelligenceItem {

  id:string;

  type:IntelligenceType;

  targetRoles:string[];

  title:string;

  description:string;

  category:string;

  reason:string;

  relatedTags:string[];

  relatedCompanies?:string[];

  relatedProjects?:string[];

  relatedInvestors?:string[];
  
  relatedExperts?:string[];

  priority:IntelligencePriority;

  industry?:string;

  actionType?:
  | "learn"
  | "view"
  | "apply"
  | "invest"
  | "contact";

  source?:string;

  createdAt:string;

}