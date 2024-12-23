import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

import { colors, fonts, api_url, getFontSize } from '../config/Constants1';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTranslation } from 'react-i18next';


import { connect } from 'react-redux';
import AstakSun from '../screens/kundli/click/ASTVARG/AstakSun';
import AstakMars from '../screens/kundli/click/ASTVARG/AstakMars';
import AstakMoon from '../screens/kundli/click/ASTVARG/AstakMoon';
import AstvargJupiter from '../screens/kundli/click/ASTVARG/AstvargJupiter';
import AstvargMercury from '../screens/kundli/click/ASTVARG/AstvargMercury';
import AstvargSaturn from '../screens/kundli/click/ASTVARG/AstvargSaturn';
import AstvargVenus from '../screens/kundli/click/ASTVARG/AstvargVenus';
import AstvargAscendant from '../screens/kundli/click/ASTVARG/AstvargAscendant';
import MyHeader from '../components/MyHeader';


const { height } = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();

const Ashtakvarga = ({ navigation, dispatch }) => {
  const { t } = useTranslation();



  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={'AstakVarga'} navigation={navigation} />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: false,
          tabBarLabelStyle: { fontSize: getFontSize(1.4), fontFamily: fonts.medium },
          tabBarGap: 0,
          tabBarStyle: { flex: 0 },
          tabBarInactiveTintColor: colors.background_theme1, 
          tabBarActiveTintColor: colors.black_color9, 
          tabBarIndicatorStyle: {
            backgroundColor: colors.background_theme1, 
            height: '100%', 
          },
          tabBarItemStyle: {
            width: 100,
            paddingHorizontal: 0,
            margin: 0,
            backgroundColor: colors.background_theme2,
          },
        }}>
        <Tab.Screen
          name={t("Ascendant")}
          component={AstvargAscendant}
        />
        <Tab.Screen
          name={t("sun")}
          component={AstakSun}
        />
        <Tab.Screen
          name={t("mars")}
          component={AstakMars}
        />
        <Tab.Screen
          name={t('moon')}
          component={AstakMoon}
        />
        <Tab.Screen
          name='Jupiter'
          component={AstvargJupiter}
        />
        <Tab.Screen
          name='Mercury'
          component={AstvargMercury}
        />
        <Tab.Screen
          name='Saturn'
          component={AstvargSaturn}
        />
        <Tab.Screen
          name='Venus'
          component={AstvargVenus}
        />

      </Tab.Navigator>
    </View>

  );
};


const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  isLoading: state.setting.isLoading,
  getAstakReports: state.kundli.getAstakReports

});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(Ashtakvarga);



const styles = StyleSheet.create({
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background_theme1,
  },
  rowText: {
    flex: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black_color9,
    textTransform: 'capitalize',
  },
});

