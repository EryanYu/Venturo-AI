export interface PitchSession {


 id:string;


 projectId:string;


 founderId:string;


 investorIds:string[];


 expertIds:string[];


 status:
 | "draft"
 | "scheduled"
 | "running"
 | "completed";


 pitchType:
 | "online"
 | "offline";


 topic:string;


 createdAt:string;

}