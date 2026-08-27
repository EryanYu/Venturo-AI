import {
 UserProfile
} from "@/models/profile";

import {
 ProfileRecommendation
} from "@/models/profileRecommendation";

import {
 calculateProfileMatch
} from "@/services/matchingEngine";

export function generateProfileRecommendations(

source:UserProfile,

targets:UserProfile[]

):ProfileRecommendation[]{


return targets.map(
 target => {

 const result = calculateProfileMatch(
   source,
   target
);


 return {

   id:`${source.id}_${target.id}`,

   title:`推荐 ${target.name}`,

   description:
   "AI根据用户画像、行业方向和标签生成匹配建议。",

   category:
   target.role,

   reason:
   result.reasons.join("、"),

   score:
   result.score,

   createdAt:
   new Date().toISOString()

 };

})

.sort(

(a,b)=>
b.score-a.score

);


}