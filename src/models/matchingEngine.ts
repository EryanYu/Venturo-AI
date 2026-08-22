import { InvestmentMatch } from "./matching";


export interface MatchingRequest {

    userId:string;

    role:
    | "创业者"
    | "投资人"
    | "专家/顾问"
    | "企业/产业方";

    industry?:string;

    stage?:string;

}



export interface MatchingResult {

    matchId:string;

    targetId:string;

    targetType:
    | "project"
    | "investor"
    | "expert";

    score:number;

    reason:string;

}



export function calculateMatchScore(
    request:MatchingRequest
){

    let score = 70;


    if(request.industry){

        score += 10;

    }


    if(request.stage){

        score += 10;

    }


    return Math.min(score,100);

}



export function generateMatchingReason(
    role:string
){

    switch(role){

        case "创业者":

            return "根据项目方向匹配投资人和行业专家";


        case "投资人":

            return "根据投资偏好发现优质创业项目";


        case "专家/顾问":

            return "根据技术领域匹配创业团队和企业需求";


        case "企业/产业方":

            return "根据产业方向匹配创新项目";


        default:

            return "AI智能匹配";

    }

}