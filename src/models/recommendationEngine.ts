import {
    calculateMatchScore
} from "@/models/matchingEngine";


import {
    Recommendation
} from "@/models/recommendation";


import {
    UserProfile
} from "@/models/profile";





export function generateRecommendations(


    source:UserProfile,


    targets:UserProfile[]


):Recommendation[]{



    return targets.map(
        target=>{


            const result =
            calculateMatchScore(
                source,
                target
            );



            return {


                id:
                `${source.id}_${target.id}`,


                type:
                "project",



                sourceId:
                source.id,



                targetId:
                target.id,



                title:
                `推荐 ${target.name}`,



                description:
                "AI根据用户画像和标签生成推荐",



                score:
                result.score,



                reasons:
                result.reasons,



                createdAt:
                new Date()
                .toISOString()


            };


        }

    );


}