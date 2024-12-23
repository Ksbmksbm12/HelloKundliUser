import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts } from '../../config/Constants1';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as HomeActions from '../../redux/actions/HomeActions';
import { img_url } from '../../config/constants';
import { Fonts } from '../../assets/style';
import { SCREEN_HEIGHT } from '../../config/Screen';
import moment from 'moment';
import MyStatusBar from '../../components/MyStatusbar';

const { width, height } = Dimensions.get('screen');

const Notifications = props => {
  console.log("first---", props.notificationData);

  useEffect(() => {
    props.dispatch(HomeActions.getNotificationData())
  }, [props.dispatch])

  const { t } = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <>
         <MyHeader
          title={t('Notifications')}
          socialIcons={false}
          navigation={props.navigation}
         
        />
        <MyStatusBar/>
        </>
       
      ),
    });
  }, []);
  
  const handle = (item) => {
    const payload = {
      data: {
      customerId: props.customerData._id,
      notificationId: item?._id
      },
      onComplete: () => props.navigation.navigate('notificationDetailes', {
        notificationData: item,
      })
    }
    props.dispatch(HomeActions.updateCustomerNotification(payload));
  }


  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          // props.navigation.navigate('notificationDetailes', {
          //   notificationData: item,
          // })
          handle(item)
        }
        style={{
          flex: 0,
          padding: 15,
          backgroundColor:
            item.read == 0
              ? colors.background_theme2
              : colors.background_theme1,
          marginBottom: 15,
          borderRadius: 10,
          shadowColor: colors.black_color8,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          //   shadowRadius: 5
        }}>
        <View style={{ flex: 0, flexDirection: 'row' }}>
          <Image
            source={item?.image?.length != 0 ? { uri: img_url + item?.image } : require('../../assets/images/AstroRemedyLogoN.png')}
            style={{
              width: width * 0.18,
              height: width * 0.18,
              borderRadius: 1000,
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text allowFontScaling={false}
              style={{
                fontSize: 16,
                color:
                  item.read == 0
                    ? colors.background_theme1
                    : colors.black_color7,
                fontFamily: fonts.semi_bold,
                marginBottom: 5,
              }}>
              {item?.title}
            </Text>
            <Text allowFontScaling={false}
              numberOfLines={3}
              style={{
                fontSize: 12,
                color:
                  item.read == 0
                    ? colors.background_theme1
                    : colors.black_color6,
                fontFamily: fonts.medium,
              }}>
              {item?.description}
            </Text>
            <Text allowFontScaling={false}
              numberOfLines={3}
              style={{
                fontSize: 12,
                color:
                  item.read == 0
                    ? colors.background_theme1
                    : colors.black_color6,
                fontFamily: fonts.medium,
                textAlign:'right',
                top:10
              }}>
              {moment(item?.createdAt).format('MM-DD-YYYY HH:mm')}
            </Text>
          </View>
        </View>
        {/* <Text allowFontScaling={false}
          style={{
            textAlign: 'right',
            fontSize: 12,
            color:
              item.read == 0 ? colors.background_theme1 : colors.black_color6,
            fontFamily: fonts.medium,
          }}>
          {item.created_date}
        </Text> */}
      </TouchableOpacity>

    );
  };
  const _listEmpty = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: SCREEN_HEIGHT * 0.4 }}>
        <Text style={{ ...Fonts.gray14RobotoMedium, fontSize: 16 }}>No Data Found</Text>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <FlatList
        ListEmptyComponent={_listEmpty}
        data={props.notificationData}
        renderItem={renderItem}
        keyExtractor={item => item.id}

        style={{ padding: 10 }}
      />

    </View>
  );
};

const mapStateToProps = state => ({
  notificationData: state.home.notificationData,
  customerData: state.customer.customerData,
});
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
