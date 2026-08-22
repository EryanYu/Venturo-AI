export interface Expert {

  id:string;

  name:string;


  field:
  | "AI"
  | "机器人"
  | "新能源"
  | "智能制造";


  expertise:string;


  experience:string;


  availableFor:
  | "技术评估"
  | "创业加入"
  | "投资顾问"
  | "路演支持";


  score:number;

}