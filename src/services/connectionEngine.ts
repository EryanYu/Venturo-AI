import {
  getBehaviorEvents,
} from "@/services/behaviorTracker";

export type ConnectionStatus =
  | "none"
  | "interested"
  | "mutual"
  | "connected";

export function hasMutualConnectionIntent(
  userAId: string,
  userBId: string
): boolean {

  const events =
    getBehaviorEvents();

  const aInterested =
    events.some(
      event =>
        event.type === "connection_intent" &&
        event.userId === userAId &&
        event.targetId === userBId
    );

  const bInterested =
    events.some(
      event =>
        event.type === "connection_intent" &&
        event.userId === userBId &&
        event.targetId === userAId
    );

  return (
    aInterested &&
    bInterested
  );


}

export function getConnectionStatus(
  userAId: string,
  userBId: string
): ConnectionStatus {

  const events =
    getBehaviorEvents();

  const aInterested =
    events.some(
      event =>
        event.type === "connection_intent" &&
        event.userId === userAId &&
        event.targetId === userBId
    );

  const bInterested =
    events.some(
      event =>
        event.type === "connection_intent" &&
        event.userId === userBId &&
        event.targetId === userAId
    );

  if (aInterested && bInterested) {
    return "mutual";
  }

  if (aInterested) {
    return "interested";
  }

  return "none";
  }