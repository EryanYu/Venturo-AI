export interface ExpertProfile {

 id:string;


 userId:string;


 name:string;


 role:
 | "专家/顾问";


 field:string;


 avatar?:string;


 // 专业领域

 industry:string;


 // 技术方向

 expertise:string[];


// 经历

 experience:string;


 // 技能标签

 skillTags:string[];


 // 可参与方向

 availableFor:string;


// 专家评分

 score:number;



 // 专家背景

 background:string;


 // 所属机构

 organization?:string;


 // 专利/技术资产

 patents:string[];


 // 是否愿意加入创业团队

 canJoinStartup:boolean;


 // 是否参与项目路演

 availableForPitch:boolean;


 createdAt:string;

}
