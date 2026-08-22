interface PitchEvent {

id:string;

projectId:string;

founderId:string;

investorIds:string[];

expertIds:string[];

status:

"draft"
|
"scheduled"
|
"completed";

}