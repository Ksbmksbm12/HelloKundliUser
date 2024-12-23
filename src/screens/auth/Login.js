import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Linking,
  Alert,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, { useEffect } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { api_url, colors, fonts, signup_google, api2_get_profile, getFontSize } from '../../config/Constants1';
import { useState } from 'react';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CustomerActions from '../../redux/actions/CustomerActions';
import { connect } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import {
  GoogleSignin,

} from '@react-native-google-signin/google-signin';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import * as AuthActions from '../../redux/actions/AuthActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { logo, mainlogo } from '../../assets/images/Images';
import { Colors, Fonts, Sizes } from '../../assets/style';

const { width, height } = Dimensions.get('screen');

GoogleSignin.configure();

const Login = props => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [code, setCode] = useState({ callingCode: '91', cca2: 'IN' });

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const login = async () => {
    try {
      const phoneRegex = /^\d{10}$/
      if (phoneNumber.length == 0) {
        warnign_toast('Please Enter Mobile Number');
      } else if (!phoneRegex.test(phoneNumber)) {
        warnign_toast('Please Enter Correct Mobile Number');
      } else {
        props.dispatch(AuthActions.onLogin({ phoneNumber: phoneNumber, }))
      }
    } catch (e) {
      console.log(e)
    }
  };

  const handleSelectCountry = (country) => {
    setCode({
      callingCode: country.callingCode[0],
      cca2: country.cca2,
    });
    setCountryModalOpen(false);
  };

  return (


    // <View style={{ flex: 1, backgroundColor: colors.background_theme2 }}>
    //   <MyStatusBar
    //   backgroundColor='#202020'
    //     barStyle="light-content"
    //   />
    //   <MyLoader isVisible={isLoading} />
    //   <Image source={require('../../assets/images/LoginDesign.png')}
    //     style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT*0.45,borderWidth:1,borderColor:'red',bottom:172}} resizeMode='contain'/>

    // <ScrollView showsVerticalScrollIndicator={false}>
    //   <View
    //     style={{
    //       backgroundColor: 'white',
    //       borderTopLeftRadius: 40,
    //       borderTopRightRadius: 40,
    //       shadowColor: "#000000",
    //       shadowOffset: {
    //         width: 0,
    //         height: 5,
    //       },
    //       shadowOpacity: 0.20,
    //       shadowRadius: 5.62,
    //       elevation: 7,
    //       height: SCREEN_HEIGHT
    //     }}>

    //     <Text allowFontScaling={false}
    //       style={{
    //         textAlign: 'center',
    //         fontSize: getFontSize(2.5),

    //         paddingTop: 20,
    //         color: colors.black_color8,
    //         fontFamily: fonts.bold,
    //         // ...Fonts.black18RobotoMedium
    //       }}>
    //       Login
    //     </Text>
    //     {/* <Text allowFontScaling={false}
    //       style={{
    //         textAlign: 'center',
    //         fontSize: getFontSize(2.5),
    //         color: colors.background_theme2,
    //         fontFamily: fonts.bold,
    //         marginTop: 2,
    //         marginBottom: 2,
    //       }}>
    //       {/* {isAstrodate ? 'Astrodate' : 'Astrokunj'} */}


    //     <Text allowFontScaling={false}
    //       style={{
    //         textAlign: 'center',
    //         fontSize: getFontSize(1.5),
    //         // fontSize:15
    //         // ,
    //         color: colors.black_color8,
    //         fontFamily: fonts.medium,
    //         marginTop: 10,
    //       }}>
    //       Enter Your Mobile Number To Continue
    //     </Text>
    //     <KeyboardAvoidingView
    //       behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
    //       <View
    //         style={{
    //           flex: 0,
    //           width: '85%',
    //           alignSelf: 'center',
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           borderWidth: 1,
    //           borderColor: colors.background_theme2,
    //           borderRadius: 25,
    //           marginBottom: 5,
    //           marginTop: 30
    //         }}>

    //         <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.4), fontWeight: 'bold', paddingRight: 5, paddingLeft: 10, color: colors.black_color7, fontFamily: fonts.medium }}>
    //           {` +${code.callingCode}`}
    //         </Text>
    //         <View>
    //           <Text allowFontScaling={false} style={{ borderRightWidth: 1, borderColor: colors.background_theme2, height: getFontSize(1.8) }}></Text>
    //         </View>
    //         <TextInput
    //           placeholder="Enter Your Mobile Number"
    //           placeholderTextColor={colors.black_color6}
    //           keyboardType="numeric"
    //           onChangeText={text => {

    //             if (text.length > 0 && text[0] === '0') {

    //               setPhoneNumber(text.slice(1));
    //             } else {
    //               setPhoneNumber(text);
    //             }

    //             if (text.length >= 10) {
    //               Keyboard.dismiss();
    //             }
    //           }}
    //           style={{ width: '80%', fontSize: getFontSize(1.4), padding: 8, color: 'black' }}
    //           maxLength={10}
    //           onTouchEndCapture={() => console.log('bye')}
    //           underlineColorAndroid='transparent'
    //           onSubmitEditing={() => login()}
    //           cursorColor={colors.background_theme2}
    //           disableFullscreenUI={false}
    //         />
    //       </View>
    //     </KeyboardAvoidingView>
    //     <View style={{ marginVertical: Sizes.fixPadding }}>
    //       <Text style={{ fontFamily: fonts.medium, textAlign: 'center', color: colors.black_color8, }}>We Will Send You An One Time Password</Text>
    //       <Text style={{ fontFamily: fonts.medium, textAlign: 'center', color: colors.black_color8, marginTop: 5 }}>Carrier Rates May Apply</Text>
    //     </View>
    //     <View
    //       style={{
    //         flex: 0,
    //         flexDirection: 'row',
    //         width: '75%',
    //         alignSelf: 'center',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         marginVertical: 8
    //       }}>
    //       {/* <BouncyCheckbox
    //         size={getFontSize(1.8)}
    //         fillColor={colors.background_theme4}
    //         onPress={() => setIsChecked(!isChecked)}
    //         innerIconStyle={{
    //           borderRadius: 5,
    //           backgroundColor: isChecked
    //             ? colors.background_theme4
    //             : colors.background_theme1,
    //         }}
    //       /> */}
    //       <Text allowFontScaling={false}
    //         style={{
    //           fontSize: getFontSize(1.2),
    //           color: 'black',
    //           fontFamily: fonts.medium, textAlign: 'center', color: colors.black_color8,
    //           marginTop: 2,
    //         }}>
    //         By Signing up, you agree to our{' '}
    //         <Text allowFontScaling={false}
    //           style={{ color: 'red', paddingTop: 10, fontFamily: fonts.medium }}
    //           onPress={() => Linking.openURL('https://hellokundli.com/term-conditions.html')}
    //         >
    //           Terms And Conditions
    //         </Text>{' '}
    //         and{' '}
    //         <Text allowFontScaling={false}
    //           style={{ fontSize: getFontSize(1.2), color: 'red', fontFamily: fonts.medium }}
    //           onPress={() => Linking.openURL('https://hellokundli.com/Privacy-Policy.html')}

    //         >
    //           Privacy Policy
    //         </Text>
    //       </Text>
    //     </View>

    //     <TouchableOpacity
    //       activeOpacity={0.8}
    //       onPress={login}
    //       style={{
    //         flex: 0,
    //         width: '80%',
    //         alignSelf: 'center',
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         borderRadius: 25,
    //         marginBottom: height * 0.02,
    //         paddingVertical: 10,
    //         backgroundColor: colors.background_theme2,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         marginTop: 10,
    //         // borderWidth:1
    //       }}>
    //       <Text allowFontScaling={false} style={{ fontSize: getFontSize(2), paddingRight: 20, fontWeight: 'bold', color: colors.white_color }}>
    //         GET OTP
    //       </Text>
    //       <AntDesign
    //         name="arrowright"
    //         color={colors.white_color}
    //         size={20}
    //       />
    //     </TouchableOpacity>
    //     <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: Sizes.fixPadding }}>
    //       <Text style={{ ...Fonts.black16RobotoMedium }}>OR</Text>
    //     </View>
    //     <View style={{ flex: 0, alignItems: 'center' }}>
    //       <TouchableOpacity onPress={() => { props.dispatch(AuthActions.onGoogleLogin()) }} style={{
    //         borderWidth: 1,
    //         borderColor: colors.background_theme2,
    //         borderRadius: 50, padding: 10, flexDirection: 'row', marginBottom: 10
    //       }}>
    //         <Image source={require('../../assets/images/icon/google.png')} style={{ width: 20, height: 20 }} />
    //         <Text allowFontScaling={false} style={{ color: 'black', paddingLeft: 10, fontSize: getFontSize(1.5) }}>Google Login</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </ScrollView>


    // </View>





    <View style={{ flex: 1, backgroundColor: '#FFCC00', }}>
      <MyStatusBar
        backgroundColor='#202020'
        barStyle="light-content"
      />
      <MyLoader isVisible={isLoading} />

      <View style={{ flex: 1, gap: SCREEN_WIDTH * 0.1 }}>
        <View style={{
          width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.55, backgroundColor: '#202020', borderBottomLeftRadius: 190,
          borderBottomRightRadius: 190, alignItems: 'center', justifyContent: 'center'
        }}>
          <Image source={require('../../assets/images/HelloKundliNewLogo.png')} resizeMode='contain' style={{ width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.4 }} />
        </View>

        <ScrollView style={{}}>

          <View style={{ alignSelf: 'center', gap: SCREEN_WIDTH * 0.06 }}>

            <View style={{ gap: Sizes.fixPadding }}>
              <Text style={{ ...Fonts.JostSemiBoldBlack, fontSize: 30, textAlign: 'center' }}>Login</Text>
              <Text style={{ ...Fonts.JostMediumBlack, textAlign: 'center', fontSize: 18 }}>Enter your mobile number to continue</Text>
            </View>

            <View style={{ gap: 10 }}>
              <View style={{ gap: SCREEN_WIDTH * 0.06 }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
                  <View
                    style={{
                      flex: 0,
                      width: '92%',
                      paddingVertical: SCREEN_HEIGHT * 0.0045,
                      paddingHorizontal: SCREEN_WIDTH * 0.02,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#FD5900',
                      borderRadius: 36,
                      backgroundColor: Colors.white
                    }}>

                    <TouchableOpacity onPress={() => setCountryModalOpen(true)}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Image
                          style={{
                            width: 25,
                            height: 20,


                          }}
                          source={{
                            uri: `https://flagcdn.com/w320/${code.cca2.toLowerCase()}.png`,
                          }}
                        />
                        <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.3), fontWeight: "500", color: colors.black_color9 }}>
                          {`(${code.cca2}) +${code.callingCode}`}
                        </Text>
                      </View>


                    </TouchableOpacity>


                    <View style={{ paddingLeft: 1.1 }}>
                      <AntDesign name='caretdown' size={8} style={{ color: 'black' }} />
                    </View>

                    <TextInput
                      placeholder="Phone number"
                      placeholderTextColor={colors.black_color6}
                      keyboardType="numeric"
                      onChangeText={text => {

                        if (text.length > 0 && text[0] === '0') {

                          setPhoneNumber(text.slice(1));
                        } else {
                          setPhoneNumber(text);
                        }

                        if (text.length >= 10) {
                          Keyboard.dismiss();
                        }
                      }}
                      style={{ width: '80%', padding: 10, ...Fonts.JostMediumBlack }}
                      maxLength={10}
                      onTouchEndCapture={() => console.log('bye')}
                      underlineColorAndroid='transparent'
                      onSubmitEditing={() => login()}
                      cursorColor={colors.background_theme2}
                      disableFullscreenUI={false}
                    />
                  </View>
                </KeyboardAvoidingView>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={login}
                  style={{
                    width: '92%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 36,
                    marginBottom: height * 0.02,
                    paddingVertical: 18,
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{ ...Fonts.JostMediumBlack }}>
                    GET OTP
                  </Text>

                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '75%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 8
                }}>

                <Text allowFontScaling={false}
                  style={{
                    ...Fonts.JostRegularBlack,
                    textAlign: 'center', color: colors.black_color8,
                    marginTop: 2,
                  }}>
                  By signing up, you agree to our{' '}
                  <Text allowFontScaling={false}
                    style={{ paddingTop: 10, ...Fonts.JostRegularBlack, color: 'red' }}
                    onPress={() => Linking.openURL('https://hellokundli.com/term-conditions.html')}
                  >
                    Terms & Conditions
                  </Text>{' '}
                  and{' '}
                  <Text allowFontScaling={false}
                    style={{ color: 'red', ...Fonts.JostRegularBlack, color: 'red' }}
                    onPress={() => Linking.openURL('https://hellokundli.com/Privacy-Policy.html')}

                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>

              <View>
                <Text style={{ ...Fonts.JostSemiBoldBlack, textAlign: 'center' }}>OR</Text>
              </View>

              <View style={{ flex: 0, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { props.dispatch(AuthActions.onGoogleLogin()) }} style={{
                  backgroundColor: 'white',
                  borderRadius: 35, padding: 16, flexDirection: 'row', marginBottom: 10
                }}>
                  <Image source={require('../../assets/images/icon/google.png')} style={{ width: 20, height: 20 }} />
                  <Text allowFontScaling={false} style={{ color: 'black', paddingLeft: 10, fontSize: getFontSize(1.5) }}>Google Login</Text>
                </TouchableOpacity>
              </View>

            </View>





          </View>
        </ScrollView>

        <View>
          <CountryPicker
            visible={countryModalOpen}
            withFlag
            withCallingCode
            withFilter
            withCountryNameButton={false}
            renderFlagButton={() => null}
            onSelect={handleSelectCountry}
            onClose={() => setCountryModalOpen(false)}
            modalProps={{}}
          />
        </View>



      </View>


    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  loginButtonContainer: {
    flex: 0,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderWidth: 1,
    borderColor: colors.background_theme4
  },
  loginButtonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme4,
    fontFamily: fonts.medium,
  },
});
