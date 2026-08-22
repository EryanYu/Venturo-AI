import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';


export default function AppTabs() {

  const scheme = useColorScheme();

  const colors = Colors[
    scheme === 'unspecified' ? 'light' : scheme
  ];


  return (

    <NativeTabs

      backgroundColor={colors.background}

      indicatorColor={colors.backgroundElement}

      labelStyle={{
        selected:{
          color:colors.text
        }
      }}

    >


      {/* 首页 */}

      <NativeTabs.Trigger name="index">

        <NativeTabs.Trigger.Label>
          首页
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />

      </NativeTabs.Trigger>



      {/* AI助手 */}

      <NativeTabs.Trigger name="ai">

        <NativeTabs.Trigger.Label>
          AI助手
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />

      </NativeTabs.Trigger>



      {/* 项目 */}

      <NativeTabs.Trigger name="project">

        <NativeTabs.Trigger.Label>
          项目
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />

      </NativeTabs.Trigger>



      {/* 投资人 */}

      <NativeTabs.Trigger name="investor">

        <NativeTabs.Trigger.Label>
          资本
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />

      </NativeTabs.Trigger>



      {/* 我的 */}

      <NativeTabs.Trigger name="profile">

        <NativeTabs.Trigger.Label>
          我的
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />

      </NativeTabs.Trigger>


    </NativeTabs>

  );

}