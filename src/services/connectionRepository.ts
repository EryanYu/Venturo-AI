import AsyncStorage from "@react-native-async-storage/async-storage";

import { Connection } from "@/models/connection";

const CONNECTION_STORAGE_KEY = "connections";

export async function loadConnections(): Promise<Connection[]> {
  const data = await AsyncStorage.getItem(
    CONNECTION_STORAGE_KEY
  );

  if (!data) {
    return [];
  }

  return JSON.parse(data) as Connection[];
}

export async function saveConnections(
  connections: Connection[]
): Promise<void> {
  await AsyncStorage.setItem(
    CONNECTION_STORAGE_KEY,
    JSON.stringify(connections)
  );
}