export type RecommendationType =
  | "investor"
  | "expert"
  | "enterprise"
  | "project"
  | "opportunity";

export interface Recommendation {
  id: string;

  type: RecommendationType;

  sourceId: string;

  targetId: string;

  title: string;

  description: string;

  category?: string;

  score: number;

  reasons: string[];

  createdAt: string;
}