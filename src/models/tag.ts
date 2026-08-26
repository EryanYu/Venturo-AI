export type TagCategory =
    | "identity"
    | "track"
    | "need"
    | "skill"
    | "content";



export interface Tag {


    id:string;


    name:string;


    category:TagCategory;



    description:string;



    createdAt:string;


}



export interface UserTag {


    userId:string;


    tagId:string;



    weight:number;


}