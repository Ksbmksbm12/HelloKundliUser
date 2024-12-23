import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { SCREEN_HEIGHT } from '../../../../config/Screen';
import { Fonts } from '../../../../assets/style';

const Yogdata = ({ dispatch, yogdata, navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  ;

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderItem = ({ item, index }) => {
    const backgroundColor = index % 2 === 0 ? '#F7F6FE' : 'white'; // Alternate background colors
    const isExpanded = expandedIndex === index;

    return (
      <TouchableOpacity onPress={() => handlePress(index)} style={[styles.item, { backgroundColor }]}>
        {Object.entries(item).slice(0, isExpanded ? Object.entries(item).length : 3).map(([key, value], i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.key}>{capitalizeFirstLetter(key)}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
        {!isExpanded && (
          <Text style={styles.moreText}>Show more...</Text>
        )}
        {isExpanded && (
          <Text style={styles.lessText}>Show less...</Text>
        )}
      </TouchableOpacity>
    );
  };
  const _listEmpty = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: SCREEN_HEIGHT * 0.4 }}>
        <Text style={{ ...Fonts.gray14RobotoMedium, fontSize: 16 }}>No Yog Available</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <MyHeader title={'Yog'} navigation={navigation} />
      <FlatList
        data={yogdata}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={_listEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6FE',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4a148c',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  key: {
    ...Fonts.JostSemiBoldBlack
  },
  value: {
    ...Fonts.JostMediumBlack
  },
  moreText: {
    color: '#4a148c',
    marginTop: 8,
    textAlign: 'right',
  },
  lessText: {
    color: '#4a148c',
    marginTop: 8,
    textAlign: 'right',
  },
});

const mapDispatchToProps = (dispatch) => ({ dispatch });
const mapStateToProps = (state) => ({
  yogdata: state.kundli.yogdata,
});

export default connect(mapStateToProps, mapDispatchToProps)(Yogdata);
