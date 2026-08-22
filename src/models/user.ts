import { ROLES } from "@/constants/role";

export interface User {

  id:string;

  name:string;

  role:
    typeof ROLES[keyof typeof ROLES];

  points:number;

  aiLevel:number;

}