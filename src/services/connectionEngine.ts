import {
  getBehaviorEvents,
  trackBehavior,
} from "@/services/behaviorTracker";

import {
  Connection,
  ConnectionSourceType,
  ConnectionStatus as DomainConnectionStatus,
} from "@/models/connection";

import {
  loadConnections,
  saveConnections,
} from "@/services/connectionRepository";

export type ConnectionStatus =
  | "none"
  | "interested"
  | "mutual"
  | "connected";

export interface CreateConnectionInput {
  requesterId: string;
  receiverId: string;
  sourceType: ConnectionSourceType;
  sourceId: string;
  tags?: string[];
}

export async function createConnection(
  input: CreateConnectionInput
): Promise<Connection> {
  const connections = await loadConnections();

  const existing = connections.find(
    (connection) =>
      connection.requesterId === input.requesterId &&
      connection.receiverId === input.receiverId &&
      connection.sourceType === input.sourceType &&
      connection.sourceId === input.sourceId &&
      connection.status === "pending"
  );

  if (existing) {
    return existing;
  }

  const now = new Date().toISOString();

  const connection: Connection = {
    id: `connection_${input.requesterId}_${input.receiverId}_${Date.now()}`,
    requesterId: input.requesterId,
    receiverId: input.receiverId,
    status: "pending",
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    tags: input.tags,
    createdAt: now,
    updatedAt: now,
  };

  connections.push(connection);

  await saveConnections(connections);

  trackBehavior(
  "connection_intent",
  input.requesterId,
  input.receiverId,
  input.tags
);

  return connection;
}

export async function getConnections(
  userId: string
): Promise<Connection[]> {
  const connections = await loadConnections();

  return connections.filter(
    (connection) =>
      connection.requesterId === userId ||
      connection.receiverId === userId
  );
}

export async function updateConnectionStatus(
  connectionId: string,
  status: Extract<
  DomainConnectionStatus,
  "accepted" | "rejected"
>
): Promise<Connection | null> {
  const connections = await loadConnections();

  const index = connections.findIndex(
    (connection) => connection.id === connectionId
  );

  if (index === -1) {
    return null;
  }

  const connection = connections[index];

  if (connection.status !== "pending") {
    return connection;
  }

  const updatedConnection: Connection = {
    ...connection,
    status,
    updatedAt: new Date().toISOString(),
  };

  connections[index] = updatedConnection;

  await saveConnections(connections);

  const behaviorType =
    status === "accepted"
      ? "connection_accepted"
      : "connection_rejected";

  trackBehavior(
  behaviorType,
  connection.receiverId,
  connection.requesterId,
  connection.tags
);

  return updatedConnection;
}

export function hasMutualConnectionIntent(
  userAId: string,
  userBId: string
): boolean {
  const events = getBehaviorEvents();

  const aInterested = events.some(
    (event) =>
      event.type === "connection_intent" &&
      event.userId === userAId &&
      event.targetId === userBId
  );

  const bInterested = events.some(
    (event) =>
      event.type === "connection_intent" &&
      event.userId === userBId &&
      event.targetId === userAId
  );

  return aInterested && bInterested;
}

export function getConnectionStatus(
  userAId: string,
  userBId: string
): ConnectionStatus {
  const events = getBehaviorEvents();

  const aInterested = events.some(
    (event) =>
      event.type === "connection_intent" &&
      event.userId === userAId &&
      event.targetId === userBId
  );

  const bInterested = events.some(
    (event) =>
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