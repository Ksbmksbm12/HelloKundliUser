import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as KundliActions from '../../../redux/actions/KundliActions';
import MyHeader from '../../../components/MyHeader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../config/Screen';
import { getFontSize } from '../../../config/Constants1';
import { Fonts, Sizes } from '../../../assets/style';
import SideBar from '../../live/components/SideBar';


const MoonChartScreen = ({ navigation, dispatch, moonchart }) => {

  useEffect(() => {
    dispatch(KundliActions.getmoonchart());
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', gap: Sizes.fixPadding }}>
      <MyHeader title={'Moon Chart'} navigation={navigation} />
      <Text style={{
        ...Fonts.JostSemiBoldBlack,
        textAlign: 'center'
      }}>MoonChart</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: moonchart }}
          style={{ height: SCREEN_WIDTH, width: SCREEN_WIDTH, resizeMode: 'contain' }}
        />
      </View>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
  moonchart: state.kundli?.moonchart
})

export default connect(mapStateToProps, mapDispatchToProps)(MoonChartScreen);