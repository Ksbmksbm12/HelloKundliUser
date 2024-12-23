import { View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import React, { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts, getFontSize } from '../config/Constants1';
import { connect } from 'react-redux';
import { openFacebook, openInstagram, openYoutube } from './Methods';
import { useTranslation } from 'react-i18next';
import { showNumber, showNumber0 } from '../utils/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Fonts, Sizes } from '../assets/style';
import { mainlogo } from '../assets/images/Images';
import * as HomeActions from '../redux/actions/HomeActions';
import { SVGBellIcons, SVGHameBurger, SVGWalletIcons } from '../assets/svg';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen');
const HomeHeader = props => {
  const { t } = useTranslation();
  console.log("KKkK:::", props?.notificationCounts)

  const unreadNotificationCount = Array.isArray(props?.notificationData)
    ? props.notificationData.filter((item) => item?.notificationStatus === false).length
    : 0;


  useEffect(() => {
    props.dispatch(HomeActions.getNotificationData())
  }, [props.dispatch])



  useEffect(() => {
    console.log("cus-data", props?.customerData)
    if (props?.customerData?.banned_status) {
      Alert.alert("HelloKundli", "You are banned, Please contact administrator")
      props.navigation.navigate('login')
    }
  }, [])

  return (
    <LinearGradient
      colors={['#202020', '#424242']}
      start={{ x: 1, y: 1 }}
      end={{ x: 2, y: 0 }}
      style={{
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: colors.background_theme2,


      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>


        <TouchableOpacity
          activeOpacity={0.8}
          // style={{}}
          onPress={() => props.navigation.openDrawer()}
          style={{ elevation: 3, zIndex: 4, }}>
          {/* <FontAwesome name="bars"  color={colors.black_color} size={35} /> */}
          <SVGHameBurger />
        </TouchableOpacity>

        <Image source={require('../assets/images/HelloKundliLogo.png')}
          style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.13, resizeMode: 'contain', marginLeft: Sizes.fixPadding }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>


        <TouchableOpacity
          onPress={() => props.navigation.navigate('notifications')}
          style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding }}>
          {
            unreadNotificationCount != 0 && <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: getFontSize(1.2),
                justifyContent: 'center',
                position: 'absolute',
                left: getFontSize(1.3),
                bottom: getFontSize(1.3),
                zIndex: 1,
                backgroundColor: colors.green_color1,
                width: 15
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: getFontSize(1),
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  color: colors.white_color,

                }}>
                {unreadNotificationCount ?? ''}
              </Text>
            </View>
          }
          <SVGBellIcons />


        </TouchableOpacity>





        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('wallet')}
          >
            <Ionicons name="wallet" color={colors.white_color} size={32} />
          </TouchableOpacity>

          <View>
            <Text style={{ ...Fonts.JostMediumBlack, color: 'white' }}>{showNumber0(props.customerData?.wallet_balance ?? 0)}</Text>

          </View>
        </View>


      </View>
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  notificationData: state.home.notificationData,
  notificationCounts: state.customer.notificationCounts,
});

export default connect(mapStateToProps)(HomeHeader);
