import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyLoader from '../../../components/MyLoader'
import MyHeader from '../../../components/MyHeader';
import { navigate } from '../../../NavigationService';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { getFontSize } from '../../../config/Constants1';
import { SvgCssUri } from 'react-native-svg/css';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions'
import WebView from 'react-native-webview';
import { SvgXml } from 'react-native-svg';
import { Fonts, Sizes } from '../../../assets/style';
const Laganchart = ({ navigation, dispatch, laganChartNew }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(KundliActions.getlaganchart())
  }, [dispatch])


  console.log('checkLaganResponse:::', laganChartNew,)


  return (
    <View style={{ flex: 1, backgroundColor: 'white', gap: Sizes.fixPadding }}>
      <MyHeader title={'Lagan Chart'} navigation={navigation} />

      <Text style={{
        textAlign: 'center',
        ...Fonts.JostMediumBlack
      }}>LaganChart</Text>
      <WebView source={{ uri: laganChartNew || undefined }}
        style={{ width: SCREEN_WIDTH * 2.6, height: SCREEN_HEIGHT * 2.6, alignItems: 'center', }} />


    </View>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch })
const mapStateToProps = state => ({
  laganChartNew: state.kundli.laganChart

})

export default connect(mapStateToProps, mapDispatchToProps)(Laganchart);