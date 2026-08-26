import { ExpertProfile } from "@/models/expert";


export interface ExpertRecommendation {


 id:string;


 expertId:string;


 projectId:string;


 matchScore:number;


 matchReason:string;


 recommendType:
 | "technical_review"
 | "industry_advisor"
 | "startup_partner";


}


export const expertRecommendationMockData:
ExpertRecommendation[] = [


{
 id:"expert_rec_001",

 expertId:"expert_001",

 projectId:"project_001",

 matchScore:92,

 matchReason:
 "AI大模型方向高度匹配，可提供技术架构评估",

 recommendType:
 "technical_review"

},


{
 id:"expert_rec_002",

 expertId:"expert_002",

 projectId:"project_001",

 matchScore:88,

 matchReason:
 "机器人行业经验丰富，可参与产业资源对接",

 recommendType:
 "industry_advisor"

},


{
 id:"expert_rec_003",

 expertId:"expert_003",

 projectId:"project_001",

 matchScore:85,

 matchReason:
 "具备创业经验，可提供商业模式优化建议",

 recommendType:
 "startup_partner"

}


];