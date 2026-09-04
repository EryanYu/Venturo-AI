import { useRouter } from "expo-router";

import ProfileEditor from "@/components/profile/ProfileEditor";
import { useUser } from "@/context/UserContext";

export default function ProfileEditScreen() {
  const router = useRouter();

  const {
    user,
    profile,
    updateProfile,
    loading,
  } = useUser();

  if (loading || !user) {
    return null;
  }

  function handleSave(
  nextProfile: Parameters<typeof updateProfile>[0]
) {
  updateProfile(nextProfile);

  if (router.canGoBack()) {
    router.back();
  }
}

  return (
    <ProfileEditor
      profile={profile}
      role={user.role}
      onSave={handleSave}
    />
  );
}