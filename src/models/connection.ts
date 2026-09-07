export type ConnectionStatus =
  | "pending"
  | "accepted"
  | "rejected";

export type ConnectionSourceType =
  | "profile_match"
  | "project_match"
  | "investment_match";

export interface Connection {
  id: string;

  requesterId: string;
  receiverId: string;

  status: ConnectionStatus;

  sourceType: ConnectionSourceType;
  sourceId: string;

  tags?: string[];

  createdAt: string;
  updatedAt: string;
}