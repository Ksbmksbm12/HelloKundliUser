import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import { connect } from 'react-redux';
import MyHeader from '../../../../components/MyHeader';
import { Fonts } from '../../../../assets/style';

const Muhurat = ({ dispatch, muhuratData, navigation }) => {



  console.log('muhuratData', muhuratData?.maasa);

  return (
    <ScrollView>
      <MyHeader title={'Muhurat'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>

        {muhuratData && muhuratData.length > 0 ? (
          muhuratData.map((data, index) => (
            <View key={index} style={styles.card}>
              <Text style={[styles.text, styles.karana]}>Karana: {data.karana}</Text>
              {/* {muhuratData?.maasa === undefined ? null :   <Text style={[styles.text, styles.maasa]}>Maasa: {data.maasa}</Text>} */}

              <Text style={[styles.text, styles.nakshatra]}>Nakshatra: {data.nakshatra}</Text>
              <Text style={[styles.text, styles.paksha]}>Paksha: {data.paksha}</Text>
              <Text style={[styles.text, styles.rashi]}>Rashi: {data.rashi}</Text>
              <Text style={[styles.text, styles.sunrise]}>Sunrise: {data.sunrise}</Text>
              <Text style={[styles.text, styles.sunset]}>Sunset: {data.sunset}</Text>
              <Text style={[styles.text, styles.tithi]}>Tithi: {data.tithi}</Text>
              <Text style={[styles.text, styles.vaar]}>Vaar: {data.vaar}</Text>
              <Text style={[styles.text, styles.yoga]}>Yoga: {data.yoga}</Text>
              <Text style={[styles.text, styles.muhurat]}>Muhurat: {data.muhurat}</Text>
              <Text style={[styles.text, styles.muhurat]}>Muhurat Start: {data.muhuratstart}</Text>
              <Text style={[styles.text, styles.muhurat]}>Muhurat End: {data.muhuratend}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0F8FF',
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginBottom: 10,
  },
  text: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 5,
    ...Fonts.JostMediumBlack
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  karana: {
    backgroundColor: '#F7F6FE',
  },
  maasa: {
    backgroundColor: 'white',
  },
  nakshatra: {
    backgroundColor: '#F7F6FE',
  },
  paksha: {
    backgroundColor: 'white',
  },
  rashi: {
    backgroundColor: '#F7F6FE',
  },
  sunrise: {
    backgroundColor: 'white',
  },
  sunset: {
    backgroundColor: '#F7F6FE',
  },
  tithi: {
    backgroundColor: 'white',
  },
  vaar: {
    backgroundColor: '#F7F6FE',
  },
  yoga: {
    backgroundColor: 'white',
  },
  muhurat: {
    backgroundColor: '#F7F6FE',
  },
});

const mapDispatchToProps = (dispatch) => ({ dispatch });
const mapStateToProps = (state) => ({
  muhuratData: state.kundli.muhuratData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Muhurat);
