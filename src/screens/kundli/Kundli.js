import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AstroCallList from '../customer/AstroCallList';
import AstroChatList from '../customer/AstroChatList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useEffect } from 'react';
import { colors, fonts } from '../../config/Constants1';
import MyStatusBar from '../../components/MyStatusbar';
import OpenKundli from './OpenKundli';
import NewKundli from './NewKundli';
import MyHeader from '../../components/MyHeader';
import { useTranslation } from 'react-i18next';
import * as SettingActions from '../../redux/actions/SettingActions'
import { connect } from 'react-redux';
import { Fonts } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';

const Tab = createMaterialTopTabNavigator();

const Kundli = props => {
  const { t } = useTranslation()
  // useEffect(() => {
  //   props.navigation.setOptions({
  //     headerShown: true,
  //     header: () => (
  //       <MyHeader
  //         title={t("kundli")}
  //         navigation={props.navigation}
  //         statusBar={{
  //           backgroundColor:'red',
  //           barStyle: 'light-content',
  //         }}
  //       />
  //     ),
  //   });
  //   return () => {
  //     props.dispatch(SettingActions.setLocationData(null))
  //   }
  // }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <>
          <MyStatusBar
            barStyle="light-content"
          />

          <MyHeader
            title={t("kundli")}
            navigation={props.navigation}
          />
        </>
      ),
    });

    return () => {
      props.dispatch(SettingActions.setLocationData(null));
    };
  }, []);

  return (
    <Tab.Navigator

      tabBarOptions={{
        tabStyle: { width:SCREEN_WIDTH*0.5},
        scrollEnabled: true,
        indicatorStyle: {
          backgroundColor: colors.background_theme2,
          height: 4,
        },
        style: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        labelStyle: {
       ...Fonts.JostSemiBoldBlack
        },
      }}
    >
      <Tab.Screen name="newKundli" component={NewKundli} />
      <Tab.Screen name="openKundli" component={OpenKundli} />
    </Tab.Navigator>


  );
};

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(Kundli);
