import {
 IntelligenceItem
} from "@/models/intelligence";



export function getIntelligenceFeed(

 items:IntelligenceItem[],

 role:string

){



 return items

 .filter(

 item =>

 item.targetRoles.includes(role)

 )


 .sort(

 (a,b)=>{

 const priorityMap={

 high:3,

 medium:2,

 low:1

 };


 return (

 priorityMap[b.priority]

 -

 priorityMap[a.priority]

 );

 }

 );


}