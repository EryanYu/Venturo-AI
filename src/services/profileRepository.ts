import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserProfile } from "@/models/profile";

const PROFILE_STORAGE_PREFIX = "profile:";

function getProfileKey(userId: string): string {
  return `${PROFILE_STORAGE_PREFIX}${userId}`;
}

export async function loadProfile(
  userId: string
): Promise<UserProfile | null> {
  const key = getProfileKey(userId);

  const data = await AsyncStorage.getItem(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as UserProfile;
}

export async function saveProfile(
  profile: UserProfile
): Promise<void> {
  const key = getProfileKey(profile.userId);

  await AsyncStorage.setItem(
    key,
    JSON.stringify(profile)
  );
}

export async function deleteProfile(
  userId: string
): Promise<void> {
  const key = getProfileKey(userId);

  await AsyncStorage.removeItem(key);
}