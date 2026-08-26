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


interface UserContextType {

  user: User | null;

  updateRole:(role:UserRole)=>void;

  loading:boolean;

}


const defaultUser:User = {

  id:"001",

  name:"Venturo User",

  role:ROLES.FOUNDER,

  points:1000,

  aiLevel:80

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



  useEffect(()=>{


    async function loadUser(){


      try{


        const data =
        await AsyncStorage.getItem("user");



        if(data){

          setUser(
            JSON.parse(data)
          );


        }else{


          setUser(defaultUser);


        }


      }catch(error){


        console.log(
          "LOAD USER ERROR:",
          error
        );


        setUser(defaultUser);


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





  return (

    <UserContext.Provider

      value={{

        user,

        updateRole,

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