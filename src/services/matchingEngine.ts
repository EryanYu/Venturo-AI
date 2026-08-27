import {
 UserProfile
} from "@/models/profile";


export interface MatchResult {

score:number;

reasons:string[];

}


export function calculateProfileMatch(
source:UserProfile,
target:UserProfile
):MatchResult{


let score = 0;

let reasons:string[]=[];



// 行业匹配

if(
source.industry === target.industry
){

score +=30;

reasons.push(
"行业方向高度匹配"
);

}



// 赛道标签匹配

const trackMatch =
source.trackTags.filter(
tag =>
target.trackTags.includes(tag)
);


if(trackMatch.length>0){

score +=30;

reasons.push(
`共同关注领域:${trackMatch.join(",")}`
);

}



// 能力需求匹配

const skillMatch =
source.skillTags.filter(
tag =>
target.needTags.includes(tag)
);


if(skillMatch.length>0){

score +=20;

reasons.push(
"能力与需求匹配"
);

}



// 城市匹配

if(
source.city===target.city
){

score +=10;

reasons.push(
"地域资源匹配"
);

}



return {

score,

reasons

};


}