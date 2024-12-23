import { View, Text, TouchableOpacity, ImageBackground, Image, SwitchComponent } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { colors, fonts, getFontSize } from '../../config/Constants1';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as BlogActions from '../../redux/actions/BlogActions'
import MyStatusBar from '../../components/MyStatusbar';
import { SCREEN_WIDTH } from '../../config/Screen';
import { Sizes } from '../../assets/style';

const HowUse = ({ navigation, dispatch }) => {
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(BlogActions.getTutorials())
  }, [dispatch])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1, }}>
      <MyStatusBar />
      <MyHeader title={'How to Use app'} navigation={navigation} />
      <ImageBackground source={require('../../assets/images/HowToUseBackground.png')} style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 0, width: '93%', alignSelf: 'center', padding: 15, borderRadius: 10, marginTop: SCREEN_WIDTH * 0.2, gap: Sizes.fixPadding }}>
          <TouchableOpacity onPress={() => navigation.navigate('HowToScreenshots')}>
            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: colors.background_theme1, borderRadius: 8, borderColor: colors.black_color8, marginBottom: 15 }}>
              <Image source={require('../../assets/images/ScreenShots.png')} style={{ height: 40, width: 40 }} resizeMode='contian' />
              <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.7), color: colors.black_color8, fontFamily: fonts.medium, marginLeft: 10 }}>{t("screenshots")}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HowToVideo')}>
            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: colors.background_theme1, borderRadius: 8, borderColor: colors.black_color8, }}>
              <Image source={require('../../assets/images/AppVideo.png')} style={{ height: 40, width: 40 }} resizeMode='contian' />

              <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.7), color: colors.black_color8, fontFamily: fonts.medium, marginLeft: 10 }}>{t("app_video")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    </View>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(HowUse) 