export type OpportunityType =
  | "融资"
  | "产业合作"
  | "专家支持"
  | "市场拓展"
  | "人才招募";

export type OpportunityStatus =
  | "开放"
  | "进行中"
  | "已完成";

export interface Opportunity {
  id: string;
  projectId: string;
  type: OpportunityType;
  title: string;
  description: string;
  targetRoles: string[];
  status: OpportunityStatus;
  createdAt: string;
}