export type RecommendationType =

    | "investor"
    | "expert"
    | "enterprise"
    | "project";




export interface Recommendation {


    id:string;


    type:RecommendationType;



    sourceId:string;



    targetId:string;



    title:string;



    description:string;



    score:number;



    reasons:string[];



    createdAt:string;



}