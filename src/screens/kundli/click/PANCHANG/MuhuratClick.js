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

const MuhuratClick = ({ navigation, locationData, dispatch, isLoading, props }) => {
  const { t } = useTranslation();
  const [dob, setDob] = useState(null);
  const [dobVisible, setDobVisible] = useState(false);
  const [tob, setTob] = useState(null);
  const [tobVisible, setTobVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setvalue] = useState(null);


  const dropdownData = [
    { label: 'Grihpravesh', value: 'grihpravesh' },
    { label: 'Sampatti', value: 'sampatti' },
    { label: 'Vaahan', value: 'vaahan' },
    { label: 'Vivah', value: 'vivah' },
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

  console.log(selectedOption)

  const month = dob?.getMonth() + 1;
  const year = dob?.getFullYear();

  console.log(month, year, selectedOption);



  const handleFetchKundli = () => {
    if (!selectedOption) {
      warnign_toast('Please select Muhurat For');
      return false;
    }
    else if (!month || month < 1 || month > 12) {
      warnign_toast('Please Select Date');
      return false;
    }

    else if (!year || year < 1900 || year > new Date().getFullYear()) {
      warnign_toast('Please Select Date');
      return false;
    }
    else if (!locationData) {
      warnign_toast('Please enter birth place.');
      return false;

    }
    else {
      const payload = {
        muhurat: selectedOption,
        month: month,
        year: year,
        lat: locationData?.lat,
        lon: locationData?.lon,

      }
      console.log('payload::', payload)
      dispatch(KundliActions.getMuhurat(payload));
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
          {/* <TouchableOpacity onPress={() => setTobVisible(true)} style={styles.dateTimeInput}>
            <MaterialCommunityIcons name="clock-outline" color={colors.primary} size={getFontSize(2.5)} />
            <Text allowFontScaling={false} style={styles.inputText}>
              {tob == null ? t("time_of_birth") : moment(tob).format('HH:mm A')}
            </Text>
          </TouchableOpacity> */}
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
        <View style={styles.dropdownContainer}>
          <Dropdown
            data={dropdownData}
            labelField="label"
            valueField="value"
            placeholder={'Select'}
            value={selectedOption}
            onChange={item => setSelectedOption(item.value)}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={{ ...Fonts.JostMediumBlack, color: '#727272' }}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleFetchKundli}>
          <Text style={{ ...Fonts.JostSemiBoldBlack, fontSize: 20, color: 'white' }}>Show Muhurat</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MuhuratClick);

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
    ...Fonts.JostSemiBoldGray,
    marginLeft: 10,
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
    width: '100%',
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
    ...Fonts.JostSemiBoldGray
  },
  selectedTextStyle: {
    ...Fonts.JostSemiBoldGray
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
