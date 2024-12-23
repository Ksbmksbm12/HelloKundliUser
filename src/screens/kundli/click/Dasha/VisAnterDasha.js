import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';

const VisAnterDasha = ({ dispatch, visAntardasha }) => {

  useEffect(() => {
    dispatch(KundliActions.getvisantar());
  }, [dispatch]);
  console.log(visAntardasha)

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { backgroundColor: '#e0f7fa' }]}>{item.from}</Text>
      <Text style={[styles.cell, { backgroundColor: '#e8f5e9' }]}>{item.planet}</Text>
      <Text style={[styles.cell, { backgroundColor: '#fff9c4' }]}>{item.to}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Vinshottari Antardasha</Text>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerText, { backgroundColor: '#b2ebf2' }]}>From</Text>
        <Text style={[styles.cell, styles.headerText, { backgroundColor: '#c8e6c9' }]}>Planet</Text>
        <Text style={[styles.cell, styles.headerText, { backgroundColor: '#fff59d' }]}>To</Text>
      </View>
      <FlatList
        data={visAntardasha?.ad}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
  visAntardasha: state.kundli.visAntardasha,
});

export default connect(mapStateToProps, mapDispatchToProps)(VisAnterDasha);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    padding: 10,
    borderRadius: 4,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
