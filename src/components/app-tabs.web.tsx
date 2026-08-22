import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';

import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {
  ThemedText
} from './themed-text';

import {
  ThemedView
} from './themed-view';

import {
  Colors,
  MaxContentWidth,
  Spacing
} from '@/constants/theme';

import { useColorScheme } from 'react-native';



export default function AppTabs() {


return (

<Tabs>

<TabSlot style={{height:"100%"}}/>


<TabList asChild>

<CustomTabList>


<TabTrigger name="index" href="/" asChild>

<TabButton>
首页
</TabButton>

</TabTrigger>



<TabTrigger name="ai" href="/ai" asChild>

<TabButton>
AI助手
</TabButton>

</TabTrigger>



<TabTrigger name="project" href="/project" asChild>

<TabButton>
项目
</TabButton>

</TabTrigger>



<TabTrigger name="investor" href="/investor" asChild>

<TabButton>
资本
</TabButton>

</TabTrigger>



<TabTrigger name="profile" href="/profile" asChild>

<TabButton>
我的
</TabButton>

</TabTrigger>


</CustomTabList>


</TabList>


</Tabs>

);

}





export function TabButton(
{
children,
isFocused,
...props
}:TabTriggerSlotProps
){


return (

<Pressable {...props}>

<ThemedView
type={
isFocused
?
"backgroundSelected"
:
"backgroundElement"
}
style={styles.tabButton}
>


<ThemedText
type="small"
themeColor={
isFocused
?
"text"
:
"textSecondary"
}
>

{children}

</ThemedText>


</ThemedView>

</Pressable>


);


}




export function CustomTabList(
props:TabListProps
){


const scheme=useColorScheme();

const colors =
Colors[
scheme==="unspecified"
?
"light"
:
scheme
];



return (

<View
{...props}
style={styles.container}
>


<ThemedView
type="backgroundElement"
style={styles.inner}
>


<ThemedText
type="smallBold"
style={styles.brand}
>

Venturo AI

</ThemedText>


{props.children}


</ThemedView>


</View>

);

}




const styles=StyleSheet.create({


container:{
position:"absolute",
width:"100%",
padding:Spacing.three,
alignItems:"center",
},


inner:{
paddingVertical:Spacing.two,
paddingHorizontal:Spacing.five,
borderRadius:Spacing.five,
flexDirection:"row",
alignItems:"center",
gap:Spacing.two,
maxWidth:MaxContentWidth,
},


brand:{
marginRight:"auto",
},


tabButton:{
paddingVertical:Spacing.one,
paddingHorizontal:Spacing.three,
borderRadius:Spacing.three,
},


});