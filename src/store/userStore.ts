import { User, UserRole } from "@/models/user";
import { ROLES } from "@/constants/role";
const currentUser: User = {

  id: "001",

  name: "Venturo Founder",

  role: ROLES.FOUNDER,

  points: 1000,

  aiLevel: 80,

};



export function getUser(){

  return currentUser;

}



export function updateRole(role:UserRole){

  currentUser.role = role;

}