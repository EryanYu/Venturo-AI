export type InterestSignalSource =
  | "view_intelligence"
  | "view_project"
  | "view_profile"
  | "connection_intent";

export type IntentSignalType = "connection_intent";

export interface InterestSignal {
  userId: string;
  tag: string;
  score: number;
  source: InterestSignalSource;
}

export interface IntentSignal {
  userId: string;
  type: IntentSignalType;
  targetId: string;
  tags?: string[];
  timestamp: string;
  strength: number;
}

export interface UserInterestProfile {
  userId: string;
  interests: {
    tag: string;
    score: number;
  }[];
  intentSignals: IntentSignal[];
}