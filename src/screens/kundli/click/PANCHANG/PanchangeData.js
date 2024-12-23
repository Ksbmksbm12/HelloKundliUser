import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { Fonts } from '../../../../assets/style';

const PanchangeData = ({ navigation, panchangData, dispatch }) => {

 

  return (

    <View style={{flex:1}}>
         <MyHeader title={'Panchang'} navigation={navigation}/>
    <View style={styles.container}>
       
      {panchangData ? (
        <View style={styles.card}>
          <Text style={[styles.text, styles.karan]}>Karan: {panchangData.karanname}</Text>
          <Text style={[styles.text, styles.nakshatra]}>Nakshatra: {panchangData.nakshatraname}</Text>
          <Text style={[styles.text, styles.sunrise]}>Sunrise: {panchangData.sunrise}</Text>
          <Text style={[styles.text, styles.sunset]}>Sunset: {panchangData.sunset}</Text>
          <Text style={[styles.text, styles.tithi]}>Tithi: {panchangData.tithiname}</Text>
          <Text style={[styles.text, styles.vaarVedic]}>Vaar (Vedic): {panchangData.vaarVedic}</Text>
          <Text style={[styles.text, styles.vaarWestern]}>Vaar (Western): {panchangData.vaarWestern}</Text>
          <Text style={[styles.text, styles.yog]}>Yog: {panchangData.yogname}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
   
    backgroundColor: '#F0F8FF',
    
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  text: {
    ...Fonts.JostMediumBlack,
    marginBottom: 8,
    padding: 10,
    borderRadius: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  karan: {
    backgroundColor: '#F7F6FE',
  },
  nakshatra: {
    backgroundColor: 'white',
  },
  sunrise: {
    backgroundColor: '#F7F6FE',
  },
  sunset: {
    backgroundColor: 'white',
  },
  tithi: {
    backgroundColor: '#F7F6FE',
  },
  vaarVedic: {
    backgroundColor: 'white',
  },
  vaarWestern: {
    backgroundColor: '#F7F6FE',
  },
  yog: {
    backgroundColor: 'white',
  },
});

const mapDispatchToProps = (dispatch) => ({ dispatch });
const mapStateToProps = (state) => ({
  panchangData: state.kundli.panchangData,
});

export default connect(mapStateToProps, mapDispatchToProps)(PanchangeData);
