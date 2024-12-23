
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants1';

import MyHeader from '../components/MyHeader';

import { useTranslation } from 'react-i18next';
import BasicStone from '../screens/kundli/click/Remedies/BasicStone';
import HealthStone from '../screens/kundli/click/Remedies/HealthStone';
import EducationStone from '../screens/kundli/click/Remedies/EducationStone';
import DaanStone from '../screens/kundli/click/Remedies/DaanStone';
import Yatra from '../screens/kundli/click/Remedies/Yatra';
import Mantra from '../screens/kundli/click/Remedies/Mantra';
import Rurdra from '../screens/kundli/click/Remedies/Rurdra';
import { SCREEN_WIDTH } from '../config/Screen';



const Tab = createMaterialTopTabNavigator();

const RemediesData = props => {
  
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={'Remedies'}
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
      tabStyle: { width:SCREEN_WIDTH*0.4 },
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
      <Tab.Screen name='Basic Lucky Gem' component={BasicStone}/>
      <Tab.Screen name='Health Stone' component={HealthStone}/>
      <Tab.Screen name='Education Stone' component={EducationStone}/>
      <Tab.Screen name='Daan Stone' component={DaanStone}/>
      <Tab.Screen name='Yantra'  component={Yatra}/>
      <Tab.Screen name='Mantra' component={Mantra}/>
      <Tab.Screen name='Rudraksha' component={Rurdra}/>
    </Tab.Navigator>
  );
};

export default RemediesData;
