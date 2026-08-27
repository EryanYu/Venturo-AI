import { ROLES } from "@/constants/role";

export type UserRole =
| "创业者"
| "投资人"
| "专家/顾问"
| "企业/产业合作方";


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