import { Recommendation } from "@/models/recommendation";


export const investorRecommendationMockData: Recommendation[] = [

{
 id:"inv_rec_001",

 type:"project",

 sourceId:"investor_001",

 targetId:"project_001",

 title:"AI创业项目推荐",

 score:94,

 reasons:[
   "投资方向匹配",
   "AI赛道匹配",
   "早期项目阶段匹配"
 ]

}

];