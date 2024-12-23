import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import { useTranslation } from 'react-i18next';

const AstakMars = ({ dispatch, astamars }) => {
  useEffect(() => {
    dispatch(KundliActions.getAstakmars());
  }, [dispatch]);

  const { t } = useTranslation();

  if (!astamars || Object.keys(astamars).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  // Define different color combination for each column
  const columnColors = ['#E8F0FF', '#FFE8E8', '#E8FFED', '#FFFAE8', '#F4E8FF', '#FFF1E8', '#E8F4FF', '#E8FFF8', '#FFF8E8', '#F0E8FF', '#FFEFF8', '#E8FEFF', '#FFF8F2'];

  return (
    <ScrollView style={{ backgroundColor: 'white', marginHorizontal:15, marginTop:10 }} horizontal>
      <View style={styles.table}>
        {/* Top row */}
        {/* <View style={[styles.row, styles.topRow]}>
          <Text style={[styles.cell, styles.topCell, { width: 100 }]}>Attributes</Text>
          {Object.keys(astamars).slice(1).map((key, index) => (
            <Text key={index} style={[styles.cell, styles.topCell, { width: 80 }]}>{t(astamars[key][0])}</Text>
          ))}
        </View> */}
        
        {/* Header row */}
        <View style={[styles.row, styles.headerRow]}>
          
          {Object.keys(astamars).slice(1).map((key, index) => (
            <Text key={index} style={[styles.cell, styles.headerCell, { width: 80 }]}>{t(astamars[key][0])}</Text>
          ))}
        </View>
        
        {/* Data rows */}
        {astamars.house.slice(1).map((house, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {/* <Text style={[styles.cell, styles.houseCell, { width: 100 }]}>{house}</Text> */}
            {Object.keys(astamars).slice(1).map((key, cellIndex) => (
              <Text key={cellIndex} style={[styles.cell, { backgroundColor: columnColors[cellIndex], width: 80 }]}>{astamars[key][rowIndex + 1]}</Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  astamars: state.kundli.astamars,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstakMars);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  table: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topRow: {
    backgroundColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cell: {
    paddingVertical: 5,
    paddingHorizontal: 3,
    textAlign: 'center',
    fontSize: 16,
  },
  topCell: {
    fontWeight: 'bold',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  houseCell: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0', // Ensure house column has consistent background
  },
});
