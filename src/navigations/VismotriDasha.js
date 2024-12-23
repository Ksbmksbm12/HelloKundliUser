
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants1';

import MyHeader from '../components/MyHeader';

import { useTranslation } from 'react-i18next';
import VisMahadasha from '../screens/kundli/click/Dasha/VisMahadasha';
import VisAnterDasha from '../screens/kundli/click/Dasha/VisAnterDasha';



const Tab = createMaterialTopTabNavigator();

const VismotriDasha = props => {
  
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={'Vimsottari Dasha'}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),    });
  }, []);
  return (
    <Tab.Navigator  tabBarOptions={{
      tabStyle: { width: 150 },
      scrollEnabled: true,     
      indicatorStyle: {         
        backgroundColor: colors.background_theme2, 
        height: 4,             
      },
      style: {   
        backgroundColor: '#fff', 
        elevation: 0,       
        shadowOpacity: 0,       
      },
      labelStyle: {            
        fontSize: 14,         
        fontWeight: 'bold',     
        color: '#333',         
      },
    }}>
      
      <Tab.Screen name='Mahadasha' component={VisMahadasha}/>
      {/* <Tab.Screen name='AntarDasha' component={VisAnterDasha}/> */}
      
    </Tab.Navigator>
  );
};

export default VismotriDasha;
