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
UserProfile
} from "@/models/profile";

interface UserContextType {

user: User | null;

profile: UserProfile | null;

updateRole:(role:UserRole)=>void;

updateProfile:(profile:UserProfile)=>void;

loading:boolean;

}


const defaultUser:User = {

  id:"001",

  name:"Venturo User",

  role:ROLES.FOUNDER,

  points:1000,

  aiLevel:80,

  createdAt:
  "2026-08-27"

};



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

        const loadedProfile =
       await loadProfile(loadedUser.id);

       setProfile(loadedProfile);

       }else{

       setUser(defaultUser);

        const loadedProfile =
       await loadProfile(defaultUser.id);

       setProfile(loadedProfile);

      }


      }catch(error){


        console.log(
          "LOAD USER ERROR:",
          error
        );


        setUser(defaultUser);
        
        setProfile(null);

      }finally{


        setLoading(false);


      }


    }



    loadUser();


  },[]);





  function updateRole(role:UserRole){


    const newUser:User = {


      ...(user ?? defaultUser),


      role


    };



    setUser(newUser);



    AsyncStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );



    console.log(
      "UPDATE ROLE:",
      role
    );


  }

  function updateProfile(profile: UserProfile) {
  const currentUser = user ?? defaultUser;

  const normalizedProfile: UserProfile = {
    ...profile,
    userId: currentUser.id,
  };

  setProfile(normalizedProfile);

  saveProfile(normalizedProfile);

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

      loading

     }}

    >

      {children}

    </UserContext.Provider>


  );


}





export function useUser(){


  const context =
  useContext(UserContext);



  if(!context){


    throw new Error(
      "useUser must inside UserProvider"
    );


  }



  return context;


}