import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { Fonts } from '../../../../assets/style';

const DurMuhurat = ({ dispatch, durmuhurat, navigation }) => {


  console.log(durmuhurat, 'DurMuhurat:::');

  return (
    <View>
      <MyHeader title={'Dur-Muhurat'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>

        <View style={[styles.row, styles.row1]}>
          <Text style={styles.label}>Dinmaan:</Text>
          <Text style={styles.value}>{durmuhurat.dinmaan}</Text>
        </View>
        <View style={[styles.row, styles.row2]}>
          <Text style={styles.label}>Sunrise:</Text>
          <Text style={styles.value}>{durmuhurat.sunrise}</Text>
        </View>
        <View style={[styles.row, styles.row3]}>
          <Text style={styles.label}>Sunset:</Text>
          <Text style={styles.value}>{durmuhurat.sunset}</Text>
        </View>
        <View style={[styles.row, styles.row4]}>
          <Text style={styles.label}>Weekday:</Text>
          <Text style={styles.value}>{durmuhurat.weekday}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
  durmuhurat: state.kundli.durmuhurat,
});

export default connect(mapStateToProps, mapDispatchToProps)(DurMuhurat);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 10,
    elevation: 2,
    borderRadius: 15

  },
  label: {
    marginLeft: 10,
    ...Fonts.JostMediumBlack
  },
  value: {
    marginRight: 10,
    ...Fonts.JostMediumBlack
  },
  row1: {
    backgroundColor: '#F7F6FE'
  },
  row2: {
    backgroundColor: 'white'
  },
  row3: {
    backgroundColor: '#F7F6FE'
  },
  row4: {
    backgroundColor: 'white'
  },
});
