import {
    UserProfile
} from "@/models/profile";



export interface MatchResult {


    targetId:string;


    score:number;


    reasons:string[];


}





/**
 * 计算标签匹配数量
 */
function calculateTagMatch(
    sourceTags:string[],
    targetTags:string[]
):number{


    const intersection =
        sourceTags.filter(tag =>
            targetTags.includes(tag)
        );


    return intersection.length;

}





/**
 * Venturo AI Matching Engine V2.1
 *
 * Founder
 * Investor
 * Expert
 * Enterprise
 *
 * 多维度评分
 */
export function calculateMatchScore(
    source:UserProfile,
    target:UserProfile
):MatchResult{



    let score = 0;



    const reasons:string[] = [];




    // 1.赛道匹配 40%
    const trackScore =
        calculateTagMatch(
            source.trackTags,
            target.trackTags
        );


    if(trackScore > 0){

        score += 40;

        reasons.push(
            "赛道方向高度匹配"
        );

    }




    // 2.需求/能力匹配 30%
    const needScore =
        calculateTagMatch(
            source.needTags,
            target.skillTags
        );



    if(needScore > 0){

        score += 30;

        reasons.push(
            "资源能力匹配"
        );

    }




    // 3.地区匹配 15%

    if(
        source.city === target.city
    ){

        score +=15;

        reasons.push(
            "同城市生态连接"
        );

    }




    // 4.行业匹配 15%

    if(
        source.industry === target.industry
    ){

        score +=15;

        reasons.push(
            "行业方向一致"
        );

    }




    return {


        targetId:
        target.id,


        score,


        reasons


    };


}






/**
 * 批量生成推荐
 */
export function generateRecommendations(
    source:UserProfile,
    targets:UserProfile[]
):MatchResult[]{



    return targets

        .map(target =>
            calculateMatchScore(
                source,
                target
            )
        )


        .sort(
            (a,b)=>
            b.score-a.score
        );


}