import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  PermissionsAndroid,
  Alert,
  Platform
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts, getFontSize } from '../config/Constants1';
import { openFacebook, openInstagram, openYoutube } from './Methods';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { Buffer } from 'buffer';
import { SCREEN_WIDTH } from '../config/Screen';
import { Sizes } from '../assets/style';
import LinearGradient from 'react-native-linear-gradient';



const MyHeader = ({ title, navigation, statusBar, socialIcons = false, download = false, id }) => {

  return (
    <LinearGradient
      colors={['#202020', '#424242']}
      start={{ x: 1, y: 1 }}
      end={{ x: 2, y: 0 }}
      // style={{ backgroundColor: colors.background_theme2 }}
      forceInset={{ top: 'always', bottom: 'never' }}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,

        }}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',

            width: SCREEN_WIDTH * 0.7

          }}>


          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              flex: 0,
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="arrow-back"
              color={colors.white_color}
              size={getFontSize(2.5)}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text allowFontScaling={false}
              numberOfLines={1}
              style={{
                fontSize: getFontSize(1.7),
                color: colors.white_color,
                fontFamily: fonts.medium,
              }}>
              {title}
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Image source={require('../assets/helloicon/helloKundliname.png')}
            style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.13, resizeMode: 'contain', }} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default MyHeader;
