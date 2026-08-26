import { ROLES } from "@/constants/role";


export interface User {


id:string;


name:string;


email?:string;


avatar?:string;



role:
typeof ROLES[keyof typeof ROLES];



points:number;


aiLevel:number;



createdAt:string;


}