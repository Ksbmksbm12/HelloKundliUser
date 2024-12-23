import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import { useSSR } from 'react-i18next';
import { navigate } from '../../../../NavigationService';

const VisMahadasha = ({ dispatch, vismahadas ,visAntardasha,visPayantardasha,vsiSukshama,pratyantraDasha }) => {

  const [indexpage,setIndexPage] = useState(0); //default 0 by mahadasha
  useEffect(() => {
    dispatch(KundliActions.getvismahadas());
  }, [dispatch]);



  const callpage = (index) => {
    setIndexPage(1);
    const payload = {
      id: index
    }
    // console.log(payload,'check data ')
    dispatch(KundliActions.getvisantar(payload));
    
  }
  const callpageantardasha = (index) => {
    setIndexPage(2);
    const payload = {
      mid: visAntardasha?.payload?.id,
      aid: index
    }
    // console.log(payload,'anatarpran data ')
    dispatch(KundliActions.getVispayantar(payload));
    
  }
  const callpageprayantardasha = (index) => {
    setIndexPage(3);
    const payload = {
      mid: visAntardasha?.payload?.id,
      aid: visPayantardasha?.payload?.aid,
      pid: index
    }
    // console.log(payload,'antsukhyama data ')
    dispatch(KundliActions.getSukshama(payload));
    
  }
  const callpageSukshamadasha = (index) => {
    setIndexPage(4);
    const payload = {
      mid: visAntardasha?.payload?.id,
      aid: visPayantardasha?.payload?.aid,
      pid: vsiSukshama?.payload?.pid,
      sid: index
    }
    // console.log(payload,'antsukhyama data ')
    dispatch(KundliActions.getPratyantra(payload));
    
  }

  console.log('ppaayy',pratyantraDasha?.response?.pnd);

  const renderItem = ({ index,item }) => (
  
    <TouchableOpacity style={styles.row} onPress={() => callpage(index)}>
      <Text style={[styles.cell, { backgroundColor: '#e0f7fa' }]}>{item.from}</Text>
      <Text style={[styles.cell, { backgroundColor: '#e8f5e9' }]}>{item.planet}</Text>
      <Text style={[styles.cell, { backgroundColor: '#fff9c4' }]}>{item.to}</Text>
    </TouchableOpacity>
  );

  const renderItem1 = ({ index,item }) => (
<>
<TouchableOpacity style={styles.row} onPress={() => callpageantardasha(index)}>
      <Text style={[styles.cell, { backgroundColor: '#e0f7fa' }]}>{item.from}</Text>
      <Text style={[styles.cell, { backgroundColor: '#e8f5e9' }]}>{item.planet}</Text>
      <Text style={[styles.cell, { backgroundColor: '#fff9c4' }]}>{item.to}</Text>
    </TouchableOpacity>
    
</>
    
  );
  const renderItem2 = ({ index,item }) => {
    // console.log(item,'sagar')
    return(
    <TouchableOpacity style={styles.row} onPress={() => callpageprayantardasha(index)}>
          <Text style={[styles.cell, { backgroundColor: '#e0f7fa' }]}>{item.from}</Text>
          <Text style={[styles.cell, { backgroundColor: '#e8f5e9' }]}>{item.planet}</Text>
          <Text style={[styles.cell, { backgroundColor: '#fff9c4' }]}>{item.to}</Text>
        </TouchableOpacity>
        
  )
        
};
const renderItem3 = ({ index,item }) => (
  
  <TouchableOpacity style={styles.row} onPress={() => callpageSukshamadasha(index)}>
    <Text style={[styles.cell, { backgroundColor: '#e0f7fa' }]}>{item.from}</Text>
    <Text style={[styles.cell, { backgroundColor: '#e8f5e9' }]}>{item.planet}</Text>
    <Text style={[styles.cell, { backgroundColor: '#fff9c4' }]}>{item.to}</Text>
  </TouchableOpacity>
);
const renderItem4 = ({ index,item }) => (
  
  <TouchableOpacity style={styles.row} onPress={() => console.log('first')}>
    <Text style={[styles.cell, { backgroundColor: '#e0f7fa' }]}>{item.from}</Text>
    <Text style={[styles.cell, { backgroundColor: '#e8f5e9' }]}>{item.planet}</Text>
    <Text style={[styles.cell, { backgroundColor: '#fff9c4' }]}>{item.to}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      {indexpage === 0 ? (<Text style={styles.title}>Vimsottari  Mahadasha</Text>) : indexpage === 1 ? (<Text style={styles.title}>Vimsottrai  Antardasha</Text>) : indexpage === 2 ? (<Text style={styles.title}>Vimsottrai  Pratyantardasha</Text>) :indexpage === 3 ? (<Text style={styles.title}>Vimsottrai  Sukshama</Text>) : indexpage === 4 ? (<Text style={styles.title}>Vimsottrai  Praandasha</Text>):null}
      
      <TouchableOpacity style={styles.header}>
        <Text style={[styles.cell, styles.headerText, { backgroundColor: '#b2ebf2' }]}>From</Text>
        <Text style={[styles.cell, styles.headerText, { backgroundColor: '#c8e6c9' }]}>Planet</Text>
        <Text style={[styles.cell, styles.headerText, { backgroundColor: '#fff59d' }]}>To</Text>
      </TouchableOpacity>
      {indexpage == 0 ? (
        <>
        <FlatList
        data={vismahadas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
        </>
      ) : indexpage == 1 ? (
        <>
        <FlatList
        data={visAntardasha?.response?.ad}
        renderItem={renderItem1}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => setIndexPage(0)}>
      <Text style={{color:'black'}}>Back</Text>
    </TouchableOpacity>
        </>
      ) : indexpage == 2 ? (
        <>
        <FlatList
        data={visPayantardasha?.response?.pd}
        renderItem={renderItem2}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => setIndexPage(0)}>
      <Text style={{color:'black'}}>Back</Text>
    </TouchableOpacity>
        </>
      ) : indexpage == 3 ? (
        <>
        <FlatList
        data={vsiSukshama?.response?.sd}
        renderItem={renderItem3}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => setIndexPage(0)}>
      <Text style={{color:'black'}}>Back</Text>
    </TouchableOpacity>
        </>
      ):indexpage == 4 ? (
        <>
        <FlatList
        data={pratyantraDasha?.response?.pnd}
        renderItem={renderItem4}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => setIndexPage(0)}>
      <Text style={{color:'black'}}>Back</Text>
    </TouchableOpacity>
        </>
      ): null}
      
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
  vismahadas: state.kundli.vismahadas,
  visAntardasha: state.kundli.visAntardasha,
  visPayantardasha: state.kundli.visPayantardasha,
  vsiSukshama: state.kundli.vsiSukshama,
  pratyantraDasha: state.kundli.pratyantraDasha,
});

export default connect(mapStateToProps, mapDispatchToProps)(VisMahadasha);

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
