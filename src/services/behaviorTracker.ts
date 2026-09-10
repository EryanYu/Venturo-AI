import {
  loadBehaviorEvents,
  saveBehaviorEvents,
} from "@/services/behaviorRepository";

export type BehaviorEventType =
  | "view_intelligence"
  | "view_project"
  | "view_profile"
  | "connection_intent"
  | "connection_accepted"
  | "connection_rejected";

export interface BehaviorEvent {
  type: BehaviorEventType;
  userId: string;
  targetId: string;
  tags?: string[];
  timestamp: string;
}

type VenturoGlobal = typeof globalThis & {
  __VENTURO_BEHAVIOR_EVENTS__?: BehaviorEvent[];
};

const venturoGlobal = globalThis as VenturoGlobal;

const behaviorEvents =
  venturoGlobal.__VENTURO_BEHAVIOR_EVENTS__ ??
  (venturoGlobal.__VENTURO_BEHAVIOR_EVENTS__ =
    []);

let initialized = false;

async function ensureBehaviorEventsLoaded(): Promise<void> {
  if (initialized) {
    return;
  }

  const storedEvents = await loadBehaviorEvents();

  if (behaviorEvents.length === 0) {
    behaviorEvents.push(...storedEvents);
  }

  initialized = true;
}

export function trackBehavior(
  type: BehaviorEventType,
  userId: string,
  targetId: string,
  tags?: string[]
): BehaviorEvent {
  const event: BehaviorEvent = {
    type,
    userId,
    targetId,
    tags,
    timestamp: new Date().toISOString(),
  };

  behaviorEvents.push(event);

  console.log("VENTURO BEHAVIOR RUNTIME:", {
  environment:
    typeof window === "undefined"
      ? "server"
      : "browser",
  globalEvents: behaviorEvents,
});

  console.log("VENTURO BEHAVIOR:", event);

  void saveBehaviorEvents(behaviorEvents);

  return event;
}

export function getBehaviorEvents(): BehaviorEvent[] {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(
      "behavior_events"
    );

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data) as BehaviorEvent[];
    } catch {
      return [];
    }
  }

  return [...behaviorEvents];
}
