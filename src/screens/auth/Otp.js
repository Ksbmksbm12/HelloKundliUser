import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import MyStatusBar from '../../components/MyStatusbar';
import {
  add_or_update_device_token,
  api2_get_profile,
  api_url,
  call_app_id,
  call_app_sign,
  colors,
  fonts,
  user_web_api_login,
  user_web_api_verification_otp,
  vedic_images,
  getFontSize
} from '../../config/Constants1';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import MyLoader from '../../components/MyLoader';
import CountDown from './components/CountDown';
import * as AuthActions from '../../redux/actions/AuthActions'
import { getFcmToken } from '../../utils/services';
import { Colors, Fonts } from '../../assets/style';
import { SCREEN_HEIGHT } from '../../config/Screen';


const { width, height } = Dimensions.get('screen');
const CELL_COUNT = 4;

const Otp = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [otp, setOtp] = useState(null);
  const [counter, setCounter] = useState(59);
  const [otpprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
    setOtp(props.route.params.otp)
    // Alert.alert('Alert', `Your otp is ${props.route.params.otp}`)
  }, [props.route.params.otp]);


  const handle_otp = async () => {
    try {
      if (otp != value) {
        warnign_toast('Please enter correct OTP.');

      } else {
        const payload = {

          data: {
            phoneNumber: props.route.params.phoneNumber,
            fcmToken: await getFcmToken(),
            device_id: 'sdfsdfsdf'
          },
          dispatch: props.dispatch

        }
        // console.log(payload,'pauload data::')
        props.dispatch(AuthActions.onOtpVerification(payload))
      }
    } catch (e) {
      console.log(e, 'this error')
    }
  };

  const updateState = useCallback(() => {
    setCounter(0)
    setOtp('')
  }, [counter])

  return (
    <View style={{ flex: 1, backgroundColor: '#FFCC00' }}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <MyLoader isVisible={isLoading} />
      <KeyboardAvoidingView
        // behavior={Platform.OS == 'android' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback>
          <ScrollView style={{ flex: 0 }} showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                margin: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.08,
              }}>
              <Image
                source={require('../../assets/images/HelloKundliOtp.png')}
                style={{ width: width * 0.55, height: width * 0.55, resizeMode: 'contain', }}
              />
              <KeyboardAvoidingView
                // behavior={Platform.OS == 'android' ? 'height' : 'padding'}
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: '#00000050',
                }}>
                <View
                  style={{
                    flex: 0,
                    backgroundColor: '#FFCC00',
                    padding: 15,
                  }}>
                  <View
                    style={{
                      gap: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text allowFontScaling={false}
                      style={{
                        ...Fonts.JostSemiBoldBlack,
                        fontSize: 20
                      }}>
                      Verify Your Number
                    </Text>

                    <Text allowFontScaling={false}
                      style={{
                        ...Fonts.JostMediumBlack
                      }}>
                      Enter the OTP sent to +91-{props.route.params.phoneNumber}
                    </Text>


                    {/* <View style={{ marginVertical: 25, alignItems: 'center' }}>
                      <View style={{ flex: 0 }}>
                        <CodeField
                          ref={ref}
                          {...otpprops}
                          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                          value={value}
                          onChangeText={setValue}
                          cellCount={CELL_COUNT}
                          rootStyle={styles.codeFieldRoot}
                          keyboardType="number-pad"
                          textContentType="oneTimeCode"
                          renderCell={({ index, symbol, isFocused }) => (
                            <Text allowFontScaling={false}
                              key={index}
                              style={[
                                styles.cell,
                                isFocused && styles.focusCell,
                              ]}
                              onLayout={getCellOnLayoutHandler(index)}>
                              {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                          )}
                        />
                      </View>
                      <View
                        style={{
                          flex: 0,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 15,
                        }}>
                        <Text allowFontScaling={false}
                          style={{
                            fontSize: getFontSize(1.4),
                            color: colors.black_color7,
                            fontWeight: 'normal',
                          }}>
                          Resend OTP in{' '}
                        </Text>
                        {counter != 0 && (
                          <Text allowFontScaling={false}
                            style={{
                              fontSize: getFontSize(1.4),
                              color: colors.black_color7,
                              fontWeight: 'normal',
                            }}>
                            <CountDown duration={counter} updateState={updateState} /> Seconds{' '}
                          </Text>
                        )}

                        {counter == 0 && (
                          <TouchableOpacity
                            onPress={() => {
                              setCounter(60)
                              props.dispatch(AuthActions.onLogin({ phoneNumber: props.route?.params?.phoneNumber }))
                            }}
                          >
                            <Text allowFontScaling={false}
                              style={{
                                fontSize: 14,
                                color: colors.background_theme2,
                                fontFamily: fonts.medium,
                              }}>
                              Resend
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View> */}

                    <View style={{ alignItems: 'center', gap: 16 }}>
                      <CodeField
                        ref={ref}
                        {...otpprops}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                          <View
                            key={index}
                            style={[
                              styles.cellRoot,
                              isFocused && styles.focusCell,
                            ]}
                            onLayout={getCellOnLayoutHandler(index)}
                          >
                            <Text style={styles.cellText}>
                              {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                            <View style={styles.underline} />
                          </View>
                        )}
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 15,
                          gap: 16
                        }}>
                        <Text allowFontScaling={false}
                          style={{
                            ...Fonts.JostMediumBlack,
                            color: 'white'
                          }}>
                          Didn’t you receive the OTP?
                        </Text>
                        {counter != 0 && (
                          <Text allowFontScaling={false}
                            style={{
                              ...Fonts.JostMediumBlack
                            }}>
                            <CountDown duration={counter} updateState={updateState} /> Seconds{' '}
                          </Text>
                        )}

                        {counter == 0 && (
                          <TouchableOpacity
                            onPress={() => {
                              setCounter(60)
                              props.dispatch(AuthActions.onLogin({ phoneNumber: props.route?.params?.phoneNumber }))
                            }}
                          >
                            <Text allowFontScaling={false}
                              style={{
                                ...Fonts.JostMediumBlack,
                                color: '#F85801'
                              }}>
                              Resend
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>




                    </View>


                    <TouchableOpacity
                      onPress={handle_otp}
                      style={{
                        flex: 0,
                        width: width * 0.75,
                        alignItems: 'center',
                        borderWidth: 1,
                        justifyContent: 'center',
                        paddingVertical: 13,
                        backgroundColor: '#F85801',
                        marginTop: SCREEN_HEIGHT * 0.04,
                        borderRadius: 24,
                        borderColor: 'white'
                      }}>
                      <Text allowFontScaling={false}
                        style={{
                          ...Fonts.JostSemiBoldBlack,
                          color: 'white',
                          fontSize: 20
                        }}>
                        Verify
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => props.navigation.goBack()}
                      style={{ flex: 0, alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                      <Text allowFontScaling={false}
                        style={{
                          fontSize: getFontSize(1.6),
                          color: colors.background_theme2,
                          fontFamily: fonts.bold,
                          paddingRight: 5
                        }}>
                        Change Number
                      </Text>
                      <FontAwesome
                        name="edit"
                        color={colors.background_theme2}
                        size={getFontSize(1.8)}
                      />
                    </TouchableOpacity>


                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(Otp);

const styles = StyleSheet.create({
  // root: { flex: 1, padding: 20 },
  // title: { textAlign: 'center', fontSize: 30, fontFamily: fonts.medium },
  // codeFieldRoot: { marginTop: 20 },




  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    alignSelf: 'center',
  },
  cellRoot: {
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderBottomColor: 'blue',
  },
  cellText: {
    fontSize: 24,
    textAlign: 'center',
  },
  underline: {
    height: 2,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 5,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },



});