import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';
import MyHeader from '../../components/MyHeader';
import { useEffect } from 'react';
import {
  colors,
  fonts,
  getFontSize
} from '../../config/Constants1';
import { useState, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShowPachang from './ShowPachang';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { connect } from 'react-redux';
import { warnign_toast } from '../../components/MyToastMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
const { config, fs } = RNFetchBlob;
import { useTranslation } from 'react-i18next';
import { getPlanets } from '../../config/apiService';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { captureRef } from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import ShowKundliBasic from './ShowKundliBasic';
import { SCREEN_WIDTH } from '../../config/Screen';
import ShowKundliPlanets from './ShowKundliPlanets';
import ShowKundliCharts from './ShowKundliCharts';
import * as KundliActions from '../../redux/actions/KundliActions'
import { Colors, Fonts, Sizes } from '../../assets/style';
import moment from 'moment';
import MyStatusBar from '../../components/MyStatusbar';


const ShowKundli = ({ navigation, route, dispatch, isLoading, basicDetails }) => {
  const { t } = useTranslation();
  const viewRef = useRef(null);

  useEffect(() => {
    if (typeof route?.params?.type == 'undefined') {
      dispatch(KundliActions.getKundliData(route?.params?.kundliId))
    }
    return () => {
      dispatch(KundliActions.resetKundliData())
    }
  }, [dispatch]);

  console.log('this is basic details', basicDetails)

  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }} ref={viewRef}>
      <MyStatusBar />
      <MyLoader isVisible={isLoading} />
      <MyHeader title={'Kundli'} navigation={navigation} />

      <FlatList
        ListHeaderComponent={<>
          {basicDetails && kundliInfo()}
          {tabsInfo()}
        </>}
        contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
      />
      {/* <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { fontSize: getFontSize(1.5), fontFamily: fonts.medium, },
        tabBarGap: 2,
        tabBarStyle: { flex: 0, justifyContent: 'center' },
        tabBarItemStyle: { width: 200 },
        tabBarContentContainerStyle: {}
      }}
    >


      <Tab.Screen name={t("ascendant")} component={ShowPachang} />

      <Tab.Screen name={t("rashi_report")} component={RashiReport} initialParams={{
          navigation: navigation,
          data: route.params.data, planetData: planetData
        }} /> 
      <Tab.Screen name={t("download")} component={DownloadKundali} initialParams={{
          navigation: navigation,
          data: route.params.data, planetData: planetData
        }} />
    </Tab.Navigator> */}

    </View>
  );

  function tabsInfo() {
    return (
      // <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: Sizes.fixPadding, justifyContent: 'space-between' }}>
      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('laganchart')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Lagan Chart</Text>
      //   </TouchableOpacity>


      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('devisonChart')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Divisonal Chart</Text>
      //   </TouchableOpacity>

      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('moonChart')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Moon Chart</Text>
      //   </TouchableOpacity>

      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('planetstatus')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Planetary Status</Text>
      //   </TouchableOpacity>

      //   {/* <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('avakhadachakra')} style={styles.buttonContainer}>
      //   <Text style={styles.buttonText}>Avakhada Chakra</Text>
      // </TouchableOpacity> */}
      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ghatchkara')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Ghat Chakra</Text>
      //   </TouchableOpacity>

      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('sravadata')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>SarvAstak</Text>
      //   </TouchableOpacity>

      //   {/* <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('astakvarga')} style={styles.buttonContainer}>
      //   <Text style={styles.buttonText}>AstakVarga</Text>
      // </TouchableOpacity> */}
      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('kalsarp')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Kalsarp Yog</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('manglik')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Manglik</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('sadesati')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Sadesati</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('remediesdata')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Remedies</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('vismotriDasha')} style={styles.buttonContainer}>
      //     <Text style={styles.buttonText}>Vimsottrai Dasha</Text>
      //   </TouchableOpacity>
      // </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: 6, marginTop: SCREEN_WIDTH * 0.1 }}>
        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('laganchart')}
        >
          <Image source={require('../../assets/images/LaganChart.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }} onPress={() => navigation.navigate('devisonChart')}>
          <Image source={require('../../assets/images/DivisonalChart.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('moonChart')}>

          <Image source={require('../../assets/images/MoonChart.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('planetstatus')}
        >
          <Image source={require('../../assets/images/PlanetaryStatus.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('ghatchkara')}
        >
          <Image source={require('../../assets/images/GhatChakra.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('sravadata')}
        >
          <Image source={require('../../assets/images/SarvAstak.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('kalsarp')}
        >
          <Image source={require('../../assets/images/KalsarpYog.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('manglik')}
        >
          <Image source={require('../../assets/images/ManglikKundli.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('sadesati')}
        >
          <Image source={require('../../assets/images/Sadesati.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('remediesdata')}
        >
          <Image source={require('../../assets/images/Remedies.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>

        <TouchableOpacity style={{ height: SCREEN_WIDTH * 0.30, width: SCREEN_WIDTH * 0.30, }}
          onPress={() => navigation.navigate('vismotriDasha')}
        >
          <Image source={require('../../assets/images/Vimsottrai.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </TouchableOpacity>






      </View>
    )
  }

  function kundliInfo() {
    return (
      <View
        style={{
          backgroundColor: '#FBFFEB',
          borderRadius: 6,
          padding: Sizes.fixPadding,
          shadowColor: colors.black_color5,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 6,
          gap: 10
        }}>
        <View style={styles.itmeContainer}>
          <Text allowFontScaling={false} style={styles.itemText}>{t("name")}</Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.name}
          </Text>
        </View>

        <View
          style={{
            ...styles.itmeContainer,
          }}>
          <Text style={styles.itemText}>
            {t("date")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {moment(basicDetails?.dob).format('DD MMM YYYY')}
          </Text>
        </View>

        <View style={styles.itmeContainer}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {t("time")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {moment(basicDetails?.tob).format('hh:mm A')}
          </Text>
        </View>

        <View
          style={{
            ...styles.itmeContainer,
          }}>
          <Text style={styles.itemText}>
            {t("place")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.place}
          </Text>
        </View>

        <View style={styles.itmeContainer}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {t("lat")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.lat?.toFixed(4)}
          </Text>
        </View>

        <View
          style={{
            ...styles.itmeContainer,
          }}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {t("long")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.lon?.toFixed(4)}
          </Text>
        </View>

        {/* <View style={styles.itmeContainer1}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {t("time_zone")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>GMT+05:30</Text>
        </View> */}
      </View>
    )
  }

};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(ShowKundli);

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
  buttonContainer: {
    width: '45%',
    backgroundColor: colors.background_theme2,
    borderRadius: Sizes.fixPadding,
    height: SCREEN_WIDTH * 0.3,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: Sizes.fixPadding * 2
  },
  buttonText: {
    ...Fonts.white16RobotoMedium,
    textAlign: 'center'
  },
  itmeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Sizes.fixPadding,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#CBCBCB'
  },
  itmeContainer1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

  },
  itemText: {
    ...Fonts.JostRegularBlack,
    fontSize: 16
  },
});




