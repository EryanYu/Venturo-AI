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
(a,b)=>
(b.priority || 0)
-
(a.priority || 0)
);


return recommendations;

}