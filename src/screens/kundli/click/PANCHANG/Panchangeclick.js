import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import MyHeader from '../../../../components/MyHeader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../config/Screen';
import * as SettingActions from '../../../../redux/actions/SettingActions';
import * as KundliActions from '../../../../redux/actions/KundliActions'
import { colors, getFontSize } from '../../../../config/Constants1';
import { Colors, Fonts } from '../../../../assets/style';
import { warnign_toast } from '../../../../components/MyToastMessage';

const { width, height } = Dimensions.get('window');

const Panchangeclick = ({ navigation, locationData, dispatch, isLoading, props }) => {
  const { t } = useTranslation();
  const [dob, setDob] = useState(null);
  const [dobVisible, setDobVisible] = useState(false);
  const [tob, setTob] = useState(null);
  const [tobVisible, setTobVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setvalue] = useState(null);


  const dropdownData = [
    { label: 'Amritsiddhi', value: 'amritsiddhi' },
    { label: 'Sarvarthsiddhi', value: 'sarvarthsiddhi' },
    { label: 'Gurupushya', value: 'gurupushya' },
    { label: 'Ravipushya', value: 'ravipushya' },
    { label: 'Dwipushkar', value: 'dwipushkar' },
    { label: 'Tripushkar', value: 'tripushkar' },
    { label: 'Ravi', value: 'ravi' },
  ];


  useEffect(() => {
    return () => {
      dispatch(SettingActions.setLocationData(null));
    };
  }, []);

  const date_handle = (event, selectedDate) => {
    if (event.type === 'set') {
      setDob(selectedDate);
    }
    setDobVisible(false);
  };

  const time_handle = (event, selectedTime) => {
    if (event.type === 'set') {
      setTob(selectedTime);
    }
    setTobVisible(false);
  };


  const year = dob?.getUTCFullYear();
  const month = dob?.getUTCMonth() + 1; // Months are zero-indexed, so we add 1
  const day = dob?.getUTCDate();
  const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;

  const hours = tob?.getUTCHours();
  const minutes = tob?.getUTCMinutes();
  const seconds = tob?.getUTCSeconds();

  // Formatting components as HH:MM:SS
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;



  const handleFetchKundli = () => {


    if (!formattedDate) {
      warnign_toast('Please Select Date');
      return false;
    }

    else if (!formattedTime) {
      warnign_toast('Please Select Time');
      return false;
    }
    else if (!locationData) {
      warnign_toast('Please enter birth place.');
      return false;

    }
    else {
      const payload = {
        d: formattedDate,
        t: formattedTime,
        lat: locationData?.lat,
        lon: locationData?.lon,

      }
      console.log('payload::', payload)
      dispatch(KundliActions.getpanchdata(payload));


    }


  };





  return (
    <View style={styles.container}>

      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('placeOfBirth', { title: 'location' });
          }}
          style={styles.inputContainer}
        >
          <MaterialCommunityIcons name="map-marker" color={colors.grey_color} size={getFontSize(2.5)} />
          <Text allowFontScaling={false} style={styles.inputText}>
            {locationData ? locationData?.address : 'Select your location'}
          </Text>
        </TouchableOpacity>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity onPress={() => setDobVisible(true)} style={styles.dateTimeInput}>
            <MaterialCommunityIcons name="calendar-month-outline" color={colors.grey_color} size={getFontSize(2.5)} />
            <Text allowFontScaling={false} style={styles.inputText}>
              {dob == null ? t("Select Date") : moment(dob).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTobVisible(true)} style={styles.dateTimeInput}>
            <MaterialCommunityIcons name="clock-outline" color={colors.grey_color} size={getFontSize(2.5)} />
            <Text allowFontScaling={false} style={styles.inputText}>
              {tob == null ? t("Select Time") : moment(tob).format('HH:mm A')}
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
        {/* <View style={styles.dropdownContainer}>
          <Dropdown
            data={dropdownData}
            labelField="label"
            valueField="value"
            placeholder={t("select_an_option")}
            value={selectedOption}
            onChange={item => setSelectedOption(item.value)}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
          />
        </View> */}
        <TouchableOpacity style={styles.button} onPress={handleFetchKundli}>
          <Text style={{ ...Fonts.JostSemiBoldBlack, color: 'white', fontSize: 20 }}>Show Panchang</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Panchangeclick);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    marginTop: SCREEN_HEIGHT * 0.1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    padding: 15,
    marginBottom: 20,
    backgroundColor: colors.lightBackground,
  },
  inputText: {
    marginLeft: 10,
    ...Fonts.JostSemiBoldGray
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateTimeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    padding: 15,
    width: '48%',
    backgroundColor: colors.lightBackground,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    padding: 10,
    backgroundColor: colors.lightBackground,
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    color: "#727272",
    ...Fonts.JostSemiBoldBlack,
  },
  selectedTextStyle: {
    fontSize: getFontSize(1.4),
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.background_theme2,
    padding: 16,
    width: SCREEN_WIDTH * 0.7,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: SCREEN_WIDTH * 0.1,
    borderRadius: 15,
    elevation: 2,
  },
});
