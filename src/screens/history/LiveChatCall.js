import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiveHistory from './LiveHistory';
import CallHistory from './CallHistory';
import ChatHistory from './ChatHistory';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import VideoHistory from './VideoHistory';
import MyStatusBar from '../../components/MyStatusbar';
import { SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import { Fonts } from '../../assets/style';

const Tab = createMaterialTopTabNavigator();

const LiveChatCall = ({ navigation, dispatch, chatHistoryData }) => {

  useEffect(() => {
    dispatch(HistoryActions.getCallHistory());
    dispatch(HistoryActions.getChatHistory());
    dispatch(HistoryActions.getLiveVedioCallHistory());
    dispatch(HistoryActions.getVideoCallHistory());
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <MyHeader title={'Consultancy History '} navigation={navigation} />
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: { width: SCREEN_WIDTH * 0.28 },
          scrollEnabled: true,
          indicatorStyle: {
            backgroundColor: '#F45702',
            height: 4,
          },
          style: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          labelStyle: {
            ...Fonts.JostMediumBlack,


          },
          activeTintColor: '#000000',
          inactiveTintColor: '#6F6F6F',
        }}
      >
        <Tab.Screen
          name="chatHistory"
          component={ChatHistory}
          options={{ tabBarLabel: 'Chat' }}
        />
        <Tab.Screen
          name="callHistory"
          component={CallHistory}
          options={{ tabBarLabel: 'Call' }}
        />
        <Tab.Screen
          name="liveHistory"
          component={LiveHistory}
          options={{ tabBarLabel: 'Live' }}
        />
        <Tab.Screen
          name="VideoHistory"
          component={VideoHistory}
          options={{ tabBarLabel: 'Video' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveChatCall);
