export interface UserProfile {


    id:string;


    userId:string;


    name:string;


    role:
    | "创业者"
    | "投资人"
    | "专家/顾问"
    | "企业/产业合作方";



    avatar?:string;



    // 基础信息

    industry:string;


    city:string;



    // 第二层：赛道标签

    trackTags:string[];



    // 第三层：需求/能力标签

    needTags:string[];


    skillTags:string[];


    // 希望匹配的生态角色
    seekingRoles:string[];


    // 用户拥有的资源
    resources:string[];


    description:string;



    createdAt:string;


}





export interface FounderProfile extends UserProfile {


    role:"创业者";


    startupName:string;


    fundingStage:
    | "idea"
    | "pre_seed"
    | "seed"
    | "pre_a"
    | "series_a"
    | "series_b_plus"
    | "listed";



    fundingNeed:string;



}





export interface InvestorProfile extends UserProfile {


    role:"投资人";


    investmentStages:string[];



    ticketSize:string;



    portfolio:string[];



}





export interface ExpertProfile extends UserProfile {


    role:"专家/顾问";



    expertise:string[];



    background:string;



    patents:string[];



    canJoinStartup:boolean;



    availableForPitch:boolean;



}





export interface EnterpriseProfile extends UserProfile {


    role:"企业/产业合作方";



    companyName:string;



    industryNeeds:string[];



    cooperationTypes:string[];



}