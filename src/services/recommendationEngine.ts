import {
  aiRecommendationMockData
} from "@/data/aiRecommendationMockData";

import {
  User
} from "@/models/user";


export function getRecommendations(
 user:User
){

const recommendations =
aiRecommendationMockData
.filter(
 item =>
 item.targetRoles.includes(user.role)
)
.sort(
(a,b)=>{

const priorityMap:any={

high:3,

medium:2,

low:1

};

return (
priorityMap[b.priority || "low"]
-
priorityMap[a.priority || "low"]
);

}
);


return recommendations;

}