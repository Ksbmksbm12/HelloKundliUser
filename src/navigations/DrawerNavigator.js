import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  api2_logout,
  api_url,
  base_url,
  colors,
  fonts,
  getFontSize,
} from '../config/Constants1';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Share from 'react-native-share';
import { openFacebook, openInstagram, openLinkedIn } from '../components/Methods';
import { useEffect } from 'react';
const { width, height } = Dimensions.get('screen');
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Drawer = createDrawerNavigator();
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { img_url } from '../config/constants';
import { unRegisterZegoCall } from '../utils/zegoServices';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { showNumber, showNumber0 } from '../utils/services';
import { Colors, Fonts, Sizes } from '../assets/style';
import * as HomeActions from '../redux/actions/HomeActions';
import { SVGAstrolgerSignup, SVGAstroMall, SVGBlogs, SVGDateIcons, SVGDelete, SVGHowToUse, SVGLogout, SVGMyFollowing, SVGMyOrders, SVGPaymentHistory, SVGRateUs, SVGShare, SVGSupport, SVGWalletDrawer } from '../assets/svg';


function CustomDrawerContent(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const logout = () => {
    Alert.alert('Wait!', 'Do you want to log out?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: 'LOGOUT',
        onPress: () => on_logout(),
      },
    ]);
  };
  const deleteaccount = () => {
    Alert.alert('Wait!', 'Do you want to Delete Account?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: 'DELETE ACCOUNT',
        onPress: () => props.props.dispatch(HomeActions.getDeleteAccount()),
      },
    ]);
  };


  const openWhatsApp = () => {
    // Replace PHONE_NUMBER with the desired phone number (including the country code)
    const phoneNumber = ' ';

    // Replace YOUR_MESSAGE with the optional message (URL-encoded if necessary)
    const message = 'Hello%2C%20I%20have%20a%20question';

    // Create the WhatsApp link
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    // Open the link using the Linking module
    Linking.openURL(whatsappURL)
      .then(data => {
        console.log('WhatsApp opened successfully');
      })
      .catch(() => {
        console.error('An error occurred while opening WhatsApp');
      });
  };

  const openDialer = () => {
    const phoneNumber = '6388158576'

    const dialerURL = `tel:${phoneNumber}`;

    Linking.openURL(dialerURL)
      .then(() => {
        console.log('Dialer opened successfully');
      })
      .catch(() => {
        console.error('An error occurred while opening the dialer');
      });
  };

  //share
  const share_app = async () => {
    let options = {
      title: 'Share friend the app',
      url: 'https://play.google.com/store/apps/details?id=com.ksbm.hellokundli',
    };

    try {
      const res = await Share.open(options);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const on_logout = async () => {
    AsyncStorage.clear();
    GoogleSignin.revokeAccess();
    await unRegisterZegoCall();
    GoogleSignin.signOut();
    go_login();
  };




  const go_login = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'login' }],
      }),
    );
  };
  //  console.log('asdfimage', 'https://api.astrofriends.in/uploads/'+props.props?.customerData?.image)
  //  console.log("object",props?.props?.customerData?.image)
  let Imguri = `${img_url}${props.props?.customerData?.image}`;
  // console.log(Imguri,'image')
  const pic = `${img_url}${props.props?.customerData?.image}`.split('/')[5];
  if (pic === 'user_default.jpg') {
    Imguri = null;
  } else {
    Imguri = `${img_url}${props.props?.customerData?.image}`;
  }
  // console.log("fixxing-----",Imguri.split("/")[5])
  // console.log("-----------",pic)
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 20 }} />
      <DrawerContentScrollView {...props.props1}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            // flex: 1,
            // justifyContent: 'center',
            flexDirection: 'row',
            top: 0,
            borderRadius: 10,
            // marginLeft: -30,
            // width: '50%',
            alignSelf: 'center',
            alignItems: 'center'
          }}>
          <Image
            source={
              Imguri ? { uri: Imguri } : require('../assets/images/user_img.png')
              //   {
              //   uri: img_url + props.props?.customerData?.image,
              //   uri : props?.props?.customerData?.image
              // }
            }
            style={{
              width: width * 0.18,
              height: width * 0.18,
              paddingVertical: 12,
              paddingHorizontal: 14,
              marginRight: 12,
              borderRadius: (width * 0.25) / 2,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text
              allowFontScaling={false}
              style={{
                ...Fonts.JostRegularBlack,
                fontSize: 20
              }}>
              {props.props.customerData?.customerName}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}>
              <Text
                allowFontScaling={false}
                style={{
                  ...Fonts.JostRegularBlack,
                  color: '#4F4F4F',
                  fontSize: 16
                }}>
                {props.props.customerData?.phoneNumber != 0 &&
                  props.props.customerData?.phoneNumber}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('customerAccount')}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // position: 'absolute',
                  backgroundColor: '#D9D9D9',
                  right: 0,
                  // left: 140,
                  // zIndex: 1,
                }}>
                <Image
                  source={require('../assets/images/icon/edit.png')}
                  style={{ width: 10, height: 10, tintColor: 'white' }}
                />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
            alignSelf: 'center',
            backgroundColor: '#FEFEEF',
            marginTop: 20,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
          }}>

          <TouchableOpacity
            onPress={() => navigation.navigate('wallet')}
            style={styles.buttonContainer}>


            <View
              colors={[colors.background_theme2, colors.background_theme2]}
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>

              <SVGWalletDrawer />


            </View>

            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('wallet_balance')}{' '}

              {/* {showNumber0(props.props.customerData?.wallet_balance ?? 0)} */}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('liveChatCall')}
            style={styles.buttonContainer}>
            <View
              colors={[colors.background_theme2, colors.background_theme2]}
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGPaymentHistory />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('order_history')}
            </Text>
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => navigation.navigate('walletHistroy')}
            style={styles.buttonContainer}>
            <View
              // colors={[colors.background_theme2, colors.background_theme2]}
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGPaymentHistory />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('payment_bill')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('OrderHistory')}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGMyOrders />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              My Orders
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => navigation.navigate('productCategory')}
            style={styles.buttonContainer}>
            <View
              // colors={[colors.background_theme2, colors.background_theme2]}
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGAstroMall />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('Astro_Mall')}
            </Text>
          </TouchableOpacity>








          {/* <TouchableOpacity
            onPress={() => navigation.navigate('astromallCategory')}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={[colors.background_theme2 ,colors.background_theme2]}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/myicons/ASTROPUJA.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('Astro Puja')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('GiftOrderHistory')} style={styles.buttonContainer}>
            <LinearGradient
              colors={['#dc2f02', '#ff5400']}
              style={{
                borderRadius: 10,
                padding: 5,
              }}>
              <Image
                source={require('../assets/images/menu/orderhistory.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>{t("order_history_gift")}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('following')}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGMyFollowing />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('following')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('astroBlog')}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGBlogs />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('blogs')}
            </Text>
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => navigation.navigate('howUse')}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGHowToUse />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('How')}
            </Text>
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => navigation.navigate('astrologerSignUp')}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGAstrolgerSignup />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('astrologer_sign')}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            // onPress={openWhatsApp}
            onPress={openDialer}
            style={styles.buttonContainer}>
            <LinearGradient
              colors={[colors.background_theme2, colors.background_theme2]}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/myicons/help.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('help')}
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => share_app()}>

            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGShare />
            </View>



            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('share')}
            </Text>
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.ksbm.hellokundli')}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGRateUs />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('rate')}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.buttonContainer}
            // onPress={() => Linking.openURL('https://astrokunj.com/About-us.html')}
            // onPress={() => Linking.openURL('https://remedy.astrofriends.in/#/about-us')}
          >
            <LinearGradient
              colors={[colors.background_theme2, colors.background_theme2]}
              style={{
                borderRadius: 10,
                padding: 5,
                height: SCREEN_WIDTH * 0.085,
                width: SCREEN_WIDTH * 0.085,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                source={require('../assets/myicons/about.png')}
                style={styles.buttonImage}
              />
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('about')}
            </Text>
          </TouchableOpacity> */}





          <TouchableOpacity
            onPress={() => navigation.navigate('supportuser')}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGSupport />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('Customer Support')}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={logout} style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGLogout />
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {t('logout')}
            </Text>
          </TouchableOpacity>

          {/* <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={0.8}
              onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61552323625258')}>
              <Image source={require('../assets/images/facebook1.png')} style={styles.iconimg} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={0.8}
              onPress={() => Linking.openURL('https://www.instagram.com/astrokunjofficial?utm_source=qr&igshid=YTlmZjI0ZWMzOA==')}>
              <Image source={require('../assets/images/instagram1.png')} style={styles.iconimg} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 10 }} activeOpacity={0.8}
              onPress={() => Linking.openURL('https://www.youtube.com/@AstroKunjofficial')}>
              <Image source={require('../assets/images/youtube.png')} style={styles.iconimg} />
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity
            onPress={deleteaccount}
            style={styles.buttonContainer}>
            <View
              style={{
                padding: 8,
                height: SCREEN_WIDTH * 0.10,
                width: SCREEN_WIDTH * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 100,
              }}>
              <SVGDelete />
              {/* <AntDesign
              name='delete'
              color={"white"}
              size={19}
              
              /> */}
            </View>
            <Text allowFontScaling={false} style={styles.buttonText}>
              {/* {t('logout')} */}
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>

      </DrawerContentScrollView>
    </View>
  );
}

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      drawerContent={props1 => (
        <CustomDrawerContent props1={props1} props={props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.85,
          alignSelf: 'center',
          backgroundColor: '#FFFFFF',
          elevation: 8,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          shadowColor: colors.black_color6,
        },
      }}>
      {/* <Drawer.Screen name="home2" component={TabNavigator} /> */}
      <Drawer.Screen name="shivam" component={TabNavigator} />

    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  homeSimmer: state.home.homeSimmer,
  isRefreshing: state.setting.isRefreshing,
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0.5,
    padding: 8,
    gap: Sizes.fixPadding
  },
  buttonImage: {
    width: width * 0.09,
    height: width * 0.09,
    resizeMode: 'contain',
    // tintColor: colors.background_theme2,
  },
  circle: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    ...Fonts.JostRegularBlack,
    fontSize: 17
  },
  socialLogo: {
    width: width * 0.08,
    height: width * 0.08,
  },
  iconimg: {
    width: width * 0.1,
    height: height * 0.1,
    resizeMode: 'contain',
  },
});
