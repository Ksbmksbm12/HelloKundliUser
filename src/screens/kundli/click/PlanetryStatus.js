import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as KundliAction from '../../../redux/actions/KundliActions';
import MyHeader from '../../../components/MyHeader';
import { colors, getFontSize } from '../../../config/Constants1';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from 'react-native-gifted-charts/src/LineChart/styles';
import { calendarFormat } from 'moment';
import { Fonts } from '../../../assets/style';

const PlanetryStatus = ({ navigation, dispatch, planetstatus }) => {
  // console.log(planetstatus,'p-lanrt dta ')
  useEffect(() => {
    dispatch(KundliAction.getPlanetStatus())
  }, [dispatch])

  const calculateColor = (value) => {
    // Example: Assign colors based on a range (adjust as needed)
    if (value >= 0 && value <= 0) {
      return '#ffc8dd';
    } else if (value >= 1 && value <= 1) {
      return '#bde0fe';
    } else if (value >= 2 && value <= 2) {
      return '#d6ccc2';
    } else if (value >= 3 && value <= 3) {
      return '#fcf6bd';
    } else if (value >= 4 && value <= 4) {
      return '#c9ada7';
    } else if (value >= 5 && value <= 5) {
      return '#f6bd60';
    } else if (value >= 6 && value <= 6) {
      return '#f7c59f';
    } else if (value >= 7 && value <= 7) {
      return '#ccff33';
    } else if (value >= 8 && value <= 8) {
      return '#d3d3d3';
    } else {
      return '#f4e409';
    }
  };



  return (
    <View>
      <MyHeader title={'Planetary Status'} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} >

        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: 'white',
            marginVertical: 10,
            borderRadius: 15,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            marginTop: SCREEN_HEIGHT * 0.04
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: '#F7F6FE', padding: 10 }}>
            <Text style={style.headText}>Planet</Text>
            <Text style={style.headText}>Ras</Text>
            <Text style={{ width: '25%', ...Fonts.JostMediumBlack }}>Degree</Text>
            <Text style={{ width: '28%', ...Fonts.JostMediumBlack }}>Nakshatra</Text>
            <Text style={{ ...Fonts.JostMediumBlack, fontSize: 14, width: '20%', fontSize: 16, right: 12 }}>Pada</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: 'white' }}>
            <Text style={style.headText}>ASC</Text>
            <Text style={style.headText}>{planetstatus?.ASCENDENT?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.ASCENDENT?.ansh}</Text>
            <Text style={{ width: '28%', ...Fonts.JostMediumBlack, fontSize: 14, }}>{planetstatus?.ASCENDENT?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.ASCENDENT?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: '#F7F6FE',
            padding: 10
          }}>
            <Text style={style.headText}>JUP</Text>
            <Text style={style.headText}>{planetstatus?.JUPITER?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.JUPITER?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, fontSize: 14, width: '28%', }}>{planetstatus?.JUPITER?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.JUPITER?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: 'white', padding: 10
          }}>
            <Text style={style.headText}>KETU</Text>
            <Text style={style.headText}>{planetstatus?.KETU?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.KETU?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, fontSize: 14, width: '28%', }}>{planetstatus?.KETU?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.KETU?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: '#F7F6FE', padding: 10
          }}>
            <Text style={style.headText}>MARS</Text>
            <Text style={style.headText}>{planetstatus?.MARS?.nakshatralord}</Text>
            <Text style={{ color: colors.black_color, fontWeight: '400', width: '25%', fontSize: 16 }}>{planetstatus?.MARS?.ansh}</Text>
            <Text style={{ color: colors.black_color, fontWeight: '400', width: '28%', fontSize: 16 }}>{planetstatus?.MARS?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.MARS?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: 'white', padding: 10
          }}>
            <Text style={style.headText}>MER</Text>
            <Text style={style.headText}>{planetstatus?.MERCURY?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.MERCURY?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack,fontSize:14, width: '28%',}}>{planetstatus?.MERCURY?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.MERCURY?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: '#F7F6FE',padding:10
          }}>
            <Text style={style.headText}>MOON</Text>
            <Text style={style.headText}>{planetstatus?.MOON?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.MOON?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack,fontSize:14, width: '28%',  }}>{planetstatus?.MOON?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.MOON?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: 'white',padding:10
          }}>
            <Text style={style.headText}>RAHU</Text>
            <Text style={style.headText}>{planetstatus?.RAHU?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.RAHU?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack,fontSize:14, width: '28%',  }}>{planetstatus?.RAHU?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.RAHU?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: '#F7F6FE', padding: 10
          }}>
            <Text style={style.headText}>SAT</Text>
            <Text style={style.headText}>{planetstatus?.SATURN?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.SATURN?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack,fontSize:14,width: '28%', }}>{planetstatus?.SATURN?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.SATURN?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: 'white',padding:10
          }}>
            <Text style={style.headText}>SUN</Text>
            <Text style={style.headText}>{planetstatus?.SUN?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%',  }}>{planetstatus?.SUN?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack,fontSize:16, width: '28%', }}>{planetstatus?.SUN?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.SUN?.nakshatracharan}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
            , marginTop: SCREEN_HEIGHT * 0.009, backgroundColor: '#F7F6FE',padding:10
          }}>
            <Text style={style.headText}>VEN</Text>
            <Text style={style.headText}>{planetstatus?.VENUS?.nakshatralord}</Text>
            <Text style={{ ...Fonts.JostMediumBlack, width: '25%', }}>{planetstatus?.VENUS?.ansh}</Text>
            <Text style={{ ...Fonts.JostMediumBlack ,fontSize:14,width: '28%', }}>{planetstatus?.VENUS?.nakshatra}</Text>
            <Text style={style.headText}>{planetstatus?.VENUS?.nakshatracharan}</Text>
          </View>
        </View>

      </ScrollView>




    </View>

  )
}

const mapDispatchToProps = dispatch => ({ dispatch })
const mapStateToProps = state => ({
  planetstatus: state.kundli.planetstatus

})
export default connect(mapStateToProps, mapDispatchToProps)(PlanetryStatus);
const style = StyleSheet.create({
  headText: {
    width: '20%',
    ...Fonts.JostMediumBlack
  }
});