import AsyncStorage from "@react-native-async-storage/async-storage";

import type { BehaviorEvent } from "@/services/behaviorTracker";

const BEHAVIOR_STORAGE_KEY = "behavior_events";

function isWeb(): boolean {
  return typeof window !== "undefined";
}

export async function loadBehaviorEvents(): Promise<BehaviorEvent[]> {
  if (isWeb()) {
    const data = window.localStorage.getItem(
      BEHAVIOR_STORAGE_KEY
    );

    if (!data) {
      return [];
    }

    return JSON.parse(data) as BehaviorEvent[];
  }

  const data = await AsyncStorage.getItem(
    BEHAVIOR_STORAGE_KEY
  );

  if (!data) {
    return [];
  }

  return JSON.parse(data) as BehaviorEvent[];
}

export async function saveBehaviorEvents(
  events: BehaviorEvent[]
): Promise<void> {
  const data = JSON.stringify(events);

  if (isWeb()) {
    window.localStorage.setItem(
      BEHAVIOR_STORAGE_KEY,
      data
    );

    return;
  }

  await AsyncStorage.setItem(
    BEHAVIOR_STORAGE_KEY,
    data
  );
}