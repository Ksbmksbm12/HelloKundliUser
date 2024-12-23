import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import MyHeader from '../components/MyHeader';
import Yoghome from '../screens/kundli/click/PANCHANG/Yoghome';
import { colors } from '../config/Constants1';
import { SCREEN_WIDTH } from '../config/Screen';
import Panchangeclick from '../screens/kundli/click/PANCHANG/Panchangeclick';
import MuhuratClick from '../screens/kundli/click/PANCHANG/MuhuratClick';
import DurMuhuratclick from '../screens/kundli/click/PANCHANG/DurMuhuratclick';
import MyStatusBar from '../components/MyStatusbar';
import { Fonts } from '../assets/style';

const Tab = createMaterialTopTabNavigator();

const Pnachang = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <>
          <MyHeader
            title={t("Panchang")}
            navigation={props.navigation}

          />
          <MyStatusBar />
        </>

      ),
    });
  }, [props.navigation, t]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.background_theme2 },
        tabBarLabelStyle: { backgroundColor: 'white', padding: 10, borderRadius: 10, textTransform: 'capitalize', ...Fonts.JostSemiBoldBlack, color: colors.background_theme2 },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: 'white' },
        animationEnabled: false,
        tabBarPressOpacity: 0,
      }}
    >
      <Tab.Screen name="Yog" component={Yoghome} />
      <Tab.Screen name="Panchang" component={Panchangeclick} />
      <Tab.Screen name="Muhurat" component={MuhuratClick} />
      <Tab.Screen name='DurMuhurat' component={DurMuhuratclick} />
    </Tab.Navigator>
  );
};

export default Pnachang;
