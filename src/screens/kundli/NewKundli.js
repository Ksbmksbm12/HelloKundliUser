import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  api2_create_kundali,
  api_url,
  colors,
  fonts,
  getFontSize
} from '../../config/Constants1';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { connect } from 'react-redux';
import DatePicker from 'react-native-date-picker'
import { useTranslation } from 'react-i18next';
import * as SettingActions from '../../redux/actions/SettingActions'
import * as KundliActions from '../../redux/actions/KundliActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import scheduleReminderNotification from '../../Notifications/scheduleReminderNotification';

import { Colors, Fonts, Sizes } from '../../assets/style';
import { SVGDateIcons, SVGMaleIcons, SVGMapIcons, SVGUserIcons, SVGVideoIcons } from '../../assets/svg';

const { width, height } = Dimensions.get('window');


const genderData = [
  { id: 1, title: "male", icon: "male" }, // Specify the icon name
  { id: 2, title: "female", icon: "female" },
];





const NewKundli = ({ customerData, navigation, locationData, dispatch, isLoading }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [dobVisible, setDobVisible] = useState(false);
  const [tob, setTob] = useState(null);
  const [tobVisible, setTobVisible] = useState(false);
  const [gender, setGender] = useState("male");

  // console.log('customerData==',locationData?.lat);

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: t("new_kundli"),
    });
    return () => {
      dispatch(SettingActions.setLocationData(null))
    }
  }, []);

  const date_handle = (event, selectedDate) => {
    if (event.type == 'set') {
      setDob(selectedDate);
    }
    setDobVisible(false);

  };

  const time_handle = (event, selectedTime) => {
    if (event.type == 'set') {
      setTob(selectedTime);
    }
    setTobVisible(false);
  };


  // String Validation 
  const isStringInValid = (string) => {
    return !string || !string?.trim() || !/^[a-zA-Z ]+$/.test(string)
  }

  const create_kundli = async () => {
    if (name.length == 0) {
      warnign_toast('Please enter name.');

    }
    else if (isStringInValid(name)) {
      warnign_toast('Please enter correct name.');

    }
    else if (dob == null) {
      warnign_toast('Please select date of birth.');

    } else if (tob == null) {
      warnign_toast('Please select time of birth.');

    } else {
      const payload = {
        name: name,
        gender: gender,
        dob: dob,
        tob: tob,
        place: locationData?.address,
        lat: locationData?.lat,
        lon: locationData?.lon,
      }
      console.log(payload, 'payload kundli')
      setName('')
      setDob(null)
      setGender('male')
      setTob(null)
      dispatch(SettingActions.setLocationData(null))
      dispatch(KundliActions.createKundli(payload))

    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      <View style={styles.container}>

        <View style={[styles.inputContainer, { padding: 5 }]}>

          <SVGUserIcons />

          <TextInput
            value={name}
            placeholder={t("enter_name")}
            placeholderTextColor={colors.black_color7}
            onChangeText={setName}
            style={{
              flex: 1,
              ...Fonts.JostRegularBlack,


            }}
          />
        </View>

        {/* place of birth  */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('placeOfBirth',);
          }}
          style={[styles.inputContainer, { padding: 5, paddingVertical: 16 }]}>

          <SVGMapIcons />
          <Text allowFontScaling={false} style={{ ...Fonts.JostRegularBlack }}>
            {locationData ? locationData?.address : t("place_of_birth")}
          </Text>
        </TouchableOpacity>


        <View
          style={{
            flex: 0,
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => setDobVisible(true)}
            style={[styles.inputContainer, { width: '48%', paddingHorizontal: 10, paddingVertical: 16 }]}>

            <SVGDateIcons />
            <Text allowFontScaling={false}
              style={{
                ...Fonts.JostRegularBlack
              }}>
              {dob == null ? t("date_of_birth") : moment(dob).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTobVisible(true)}
            style={[styles.inputContainer, { width: '48%', paddingHorizontal: 10, paddingVertical: 16 }]}>
            <MaterialCommunityIcons
              name="clock-outline"
              color={colors.black_color8}
              size={getFontSize(2)}
            />
            <Text allowFontScaling={false}
              style={{
                ...Fonts.JostRegularBlack
              }}>
              {tob == null ? t("time_of_birth") : moment(tob).format('HH:mm A')}
            </Text>
          </TouchableOpacity>
        </View>
        {dobVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob != null ? dob : new Date()}
            mode={'date'}
            display='spinner'
            maximumDate={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            onChange={date_handle}
          />
        )}
        {tobVisible && (

          <DateTimePicker
            testID="dateTimePicker"
            value={tob != null ? tob : new Date()}
            mode={'time'}
            display='spinner'
            is24Hour={false}
            timeZoneName={'Asia/Kolkata'}
            onChange={time_handle}
          />
        )}

        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          {/* <Image source={require('../../assets/images/gender.png')}
            style={{ width: getFontSize(3), height: getFontSize(3), marginTop: getFontSize(2), resizeMode: 'contain' }} /> */}


          <View
            style={{
              flex: 0,
              borderRadius: 10,
              // borderWidth: 1,
              borderColor: colors.black_color6,
              flexDirection: 'row',
              alignSelf: 'center',
              backgroundColor: '#F1F1F1'
            }}>

            {genderData.map((item, index) => (

              <TouchableOpacity
                key={index}
                onPress={() => setGender(item.title)}
                style={{
                  flexDirection: 'row',
                  width: '50%',
                  alignSelf: 'center',
                  backgroundColor:
                    item.title == gender
                      ? colors.background_theme2
                      : '#F1F1F1',
                  height: height * 0.07,
                  borderRadius: 10,
                  borderWidth: item.title == gender ? 1 : 0,
                  borderColor: colors.background_theme2,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
              >
                {/* Vector Icon Section */}
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={
                    item.title == gender
                      ? colors.background_theme1
                      : colors.black_color7
                  }
                />

                {/* Text Section */}
                <Text
                  allowFontScaling={false}
                  style={{
                    color:
                      item.title != gender
                        ? colors.black_color7
                        : '#F1F1F1',
                    ...Fonts.JostRegularBlack,
                    marginLeft: 10,
                  }}
                >
                  {t(item.title)}
                </Text>
              </TouchableOpacity>


            ))}


          </View>
        </View>


        <TouchableOpacity onPress={create_kundli} style={styles.buttonContainer}>
          <Text allowFontScaling={false} style={styles.buttonText}>{t("get_kundli")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  locationData: state.setting.locationData,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NewKundli);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: colors.black_color4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 15,
    elevation: 8,

  },
  buttonContainer: {
    width: SCREEN_WIDTH * 0.6,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    alignSelf: 'center',
    backgroundColor: '#F85801',
    marginTop: height * 0.04,
  },
  buttonText: {
    ...Fonts.JostRegularBlack,
    color: Colors.white
  },
  inputContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    borderRadius: 13,
    borderColor: colors.black_color6,
    marginBottom: height * 0.02,
    backgroundColor: '#F1F1F1',
    gap: 5
  },
  checkBoxText: {
    fontSize: 14,
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
  },
});
