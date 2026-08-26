import {
 View,
 Text
} from "react-native";


import BusinessOpportunityCard
from "./BusinessOpportunityCard";


import {
 AIUserRecommendation
}
from "@/models/aiRecommendation";



interface Props{

items:
AIUserRecommendation[];

}



export default function OpportunitySection({
items
}:Props){


const opportunities =
items.filter(
item =>
item.type==="ecosystem"
);



if(
opportunities.length===0
){
return null;
}



return (

<View>


<Text
style={{
color:"#fff",
fontSize:18,
fontWeight:"600",
marginVertical:12
}}
>
🤝 生态合作机会
</Text>



{
opportunities.map(
item=>(

<BusinessOpportunityCard
key={item.id}
item={item}
/>

)
)
}


</View>

);


}