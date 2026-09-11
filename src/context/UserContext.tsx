import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  User,
  UserRole
} from "@/models/user";

import {
  ROLES
} from "@/constants/role";

import {
loadProfile,
saveProfile
} from "@/services/profileRepository";

import {
  UserProfile,
  FounderProfile,
  InvestorProfile,
  ExpertProfile,
  EnterpriseProfile
} from "@/models/profile";

function createProfileForRole(
  profile: UserProfile,
  role: UserRole
): UserProfile {
  const base = {
    id: profile.id,
    userId: profile.userId,
    name: profile.name,
    avatar: profile.avatar,
    industry: profile.industry,
    city: profile.city,
    trackTags: profile.trackTags ?? [],
    needTags: profile.needTags ?? [],
    skillTags: profile.skillTags ?? [],
    seekingRoles: profile.seekingRoles ?? [],
    resources: profile.resources ?? [],
    description: profile.description ?? "",
    createdAt: profile.createdAt,
  };

  switch (role) {
    case "创业者":
      return {
        ...base,
        role: "创业者",
        startupName: "",
        fundingStage: "idea",
        fundingNeed: "",
      } as FounderProfile;

    case "投资人":
      return {
        ...base,
        role: "投资人",
        investmentStages: [],
        ticketSize: "",
        portfolio: [],
      } as InvestorProfile;

    case "专家/顾问":
      return {
        ...base,
        role: "专家/顾问",
        expertise: [],
        background: "",
        patents: [],
        canJoinStartup: false,
        availableForPitch: false,
      } as ExpertProfile;

    case "企业/产业合作方":
      return {
        ...base,
        role: "企业/产业合作方",
        companyName: "",
        industryNeeds: [],
        cooperationTypes: [],
      } as EnterpriseProfile;

    default:
      return {
        ...base,
        role,
      };
  }
}

function normalizeLoadedProfile(
  profile: UserProfile
): UserProfile {
  switch (profile.role) {
    case "创业者":
      return {
        ...profile,
        trackTags: profile.trackTags ?? [],
        needTags: profile.needTags ?? [],
        skillTags: profile.skillTags ?? [],
        seekingRoles: profile.seekingRoles ?? [],
        resources: profile.resources ?? [],
        startupName:
          (profile as FounderProfile).startupName ?? "",
        fundingStage:
          (profile as FounderProfile).fundingStage ?? "idea",
        fundingNeed:
          (profile as FounderProfile).fundingNeed ?? "",
      } as FounderProfile;

    case "投资人":
      return {
        ...profile,
        trackTags: profile.trackTags ?? [],
        needTags: profile.needTags ?? [],
        skillTags: profile.skillTags ?? [],
        seekingRoles: profile.seekingRoles ?? [],
        resources: profile.resources ?? [],
        investmentStages:
          (profile as InvestorProfile).investmentStages ?? [],
        ticketSize:
          (profile as InvestorProfile).ticketSize ?? "",
        portfolio:
          (profile as InvestorProfile).portfolio ?? [],
      } as InvestorProfile;

    case "专家/顾问":
      return {
        ...profile,
        trackTags: profile.trackTags ?? [],
        needTags: profile.needTags ?? [],
        skillTags: profile.skillTags ?? [],
        seekingRoles: profile.seekingRoles ?? [],
        resources: profile.resources ?? [],
        expertise:
          (profile as ExpertProfile).expertise ?? [],
        background:
          (profile as ExpertProfile).background ?? "",
        patents:
          (profile as ExpertProfile).patents ?? [],
        canJoinStartup:
          (profile as ExpertProfile).canJoinStartup ?? false,
        availableForPitch:
          (profile as ExpertProfile).availableForPitch ?? false,
      } as ExpertProfile;

    case "企业/产业合作方":
      return {
        ...profile,
        trackTags: profile.trackTags ?? [],
        needTags: profile.needTags ?? [],
        skillTags: profile.skillTags ?? [],
        seekingRoles: profile.seekingRoles ?? [],
        resources: profile.resources ?? [],
        companyName:
          (profile as EnterpriseProfile).companyName ?? "",
        industryNeeds:
          (profile as EnterpriseProfile).industryNeeds ?? [],
        cooperationTypes:
          (profile as EnterpriseProfile).cooperationTypes ?? [],
      } as EnterpriseProfile;

    default:
      return profile;
  }
}

interface UserContextType {

user: User | null;

profile: UserProfile | null;

updateRole:(role:UserRole)=>void;

updateProfile:(profile:UserProfile)=>void;

loading:boolean;

}






const UserContext =
createContext<UserContextType | null>(null);



export function UserProvider({
  children
}:{
  children:React.ReactNode
}){


  const [user,setUser] =
  useState<User | null>(null);


  const [loading,setLoading] =
  useState(true);

  const [profile,setProfile] =
  useState<UserProfile | null>(null);

  useEffect(()=>{


    async function loadUser(){


      try{


        const data =
        await AsyncStorage.getItem("user");



       if(data){

        const loadedUser =
         JSON.parse(data) as User;

       setUser(loadedUser);

        let loadedProfile =
  await loadProfile(loadedUser.id);

const normalizedProfile =
  loadedProfile
    ? normalizeLoadedProfile(loadedProfile)
    : null;

if (
  normalizedProfile &&
  JSON.stringify(normalizedProfile) !==
  JSON.stringify(loadedProfile)
) {
  await saveProfile(normalizedProfile);
}

if (
  normalizedProfile &&
  normalizedProfile.role !== loadedUser.role
) {
  const syncedUser: User = {
    ...loadedUser,
    role: normalizedProfile.role,
  };

  setUser(syncedUser);

  await AsyncStorage.setItem(
    "user",
    JSON.stringify(syncedUser)
  );
}

setProfile(normalizedProfile);

}else{
  setUser(null);
  setProfile(null);
}


      }catch(error){

        console.log(
          "LOAD USER ERROR:",
          error
        );

        setUser(null);
        setProfile(null);

      }finally{


        setLoading(false);


      }


    }



    loadUser();


  },[]);





  function updateRole(role: UserRole) {
  if (!user) return;

  const currentUser = user;

  const newUser: User = {
    ...currentUser,
    role,
  };

  setUser(newUser);

  AsyncStorage.setItem(
    "user",
    JSON.stringify(newUser)
  );

  const currentProfile = profile;

  if (currentProfile) {
    const updatedProfile =
      createProfileForRole(
        currentProfile,
        role
      );

    setProfile(updatedProfile);

    saveProfile(updatedProfile);
  }

  console.log(
    "UPDATE ROLE:",
    role
  );
}


  function updateProfile(profile: UserProfile) {
  if (!user) return;

  const currentUser = user;

  const normalizedProfile: UserProfile = {
    ...profile,
    userId: currentUser.id,
    role: profile.role,
  };

  const updatedUser: User = {
  ...currentUser,
  name: profile.name,
  role: profile.role,
};

  setProfile(normalizedProfile);
  setUser(updatedUser);

  saveProfile(normalizedProfile);

  AsyncStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  console.log(
    "UPDATE PROFILE:",
    normalizedProfile.id
  );
}

return (
  <UserContext.Provider
    value={{
      user,
      profile,
      updateRole,
      updateProfile,
      loading,
    }}
  >
    {children}
  </UserContext.Provider>
);

}


export function useUser() {
  const context =
    useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must inside UserProvider"
    );
  }

  return context;
}