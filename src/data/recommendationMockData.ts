import {
    Recommendation
} from "@/models/recommendation";



export const recommendationMockData:
Recommendation[] = [



{
    id:"rec_001",

    type:"investor",

    sourceId:"founder_001",

    targetId:"investor_001",

    title:"推荐投资人 David",

    description:
    "该投资人关注AI早期项目，与创业方向高度匹配",


    score:92,


    reasons:[

        "AI赛道匹配",

        "Pre-Seed阶段匹配",

        "投资方向一致"

    ],


    createdAt:
    "2026-08-22"

},




{
    id:"rec_002",

    type:"expert",


    sourceId:"founder_001",

    targetId:"expert_001",


    title:"推荐AI技术专家",

    description:
    "专家具备大模型和机器学习背景，可参与项目评估",


    score:88,


    reasons:[

        "技术能力匹配",

        "支持项目路演"

    ],


    createdAt:
    "2026-08-22"

}


];