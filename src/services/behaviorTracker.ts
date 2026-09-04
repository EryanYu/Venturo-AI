export type BehaviorEventType =
  | "view_intelligence"
  | "view_project"
  | "view_profile"
  | "connection_intent";

export interface BehaviorEvent {
  type: BehaviorEventType;
  userId: string;
  targetId: string;
  tags?: string[];
  timestamp: string;
}

const behaviorEvents: BehaviorEvent[] = [];

export function trackBehavior(
  type: BehaviorEventType,
  userId: string,
  targetId: string,
  tags?: string[]
) {

  const event: BehaviorEvent = {
  type,
  userId,
  targetId,
  tags,
  timestamp: new Date().toISOString(),
};

  behaviorEvents.push(event);

  console.log("VENTURO BEHAVIOR:", event);

  return event;
}

export function getBehaviorEvents(): BehaviorEvent[] {
  return [...behaviorEvents];
}