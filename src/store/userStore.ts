import { User, UserRole } from "@/models/user";
import { ROLES } from "@/constants/role";
console.log(
"LOAD USER STORE MODULE",
Math.random()
);

declare global {
  var __VENTURO_USER__: User | undefined;
}


if(!globalThis.__VENTURO_USER__){

  globalThis.__VENTURO_USER__ = {

    id:"001",

    name:"Venturo Founder",

    role:ROLES.FOUNDER,

    points:1000,

    aiLevel:80,

  };

}


const currentUser = globalThis.__VENTURO_USER__;



export function updateRole(role:UserRole){

  console.log("BEFORE UPDATE:", currentUser.role);

  currentUser.role = role;

  console.log("AFTER UPDATE:", currentUser.role);

}


export function getUser(){

  console.log("GET USER ROLE:", currentUser.role);

  return currentUser;

}