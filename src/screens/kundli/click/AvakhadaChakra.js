import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import MyHeader from '../../../components/MyHeader';
import { colors } from '../../../config/Constants1';

const AvakhadaChakra = ({navigation, dispatch, avakhadachakra}) => {
    useEffect(() => {
        dispatch(KundliActions.getavakhadachakra())
    },[])

    console.log(avakhadachakra,'this is response')
  return (
    <View style={{flex:1, backgroundColor:colors.background_theme1}}>
        <MyHeader title={'Avakhada Chakra'} navigation={navigation}/>
          <Text style={{color:'black'}}>Coming Soon...</Text>
    </View>
  )
}
const mapDispatchToProps = dispatch => ({dispatch});
const mapStateToProps = state => ({
    avakhadachakra : state.kundli.avakhadachakra
});

export default connect (mapStateToProps, mapDispatchToProps)(AvakhadaChakra);