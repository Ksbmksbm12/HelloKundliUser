/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { GlobalContextProvider } from './src/config/context';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Alert,
  DeviceEventEmitter,
  Text,
  PermissionsAndroid,
} from 'react-native';

import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { PushNotificationManager } from 'react-native-notifications';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { api_url, astrologer_dashboard, colors } from './src/config/Constants1';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import database from '@react-native-firebase/database';
import * as ProviderActions from './src/redux/actions/ProviderActions';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import firebase from '@react-native-firebase/app';
import Notifee, {
  AndroidChannel,
  AndroidImportance,
  Notification,
  EventType,
  Event,
  AuthorizationStatus,
  TimestampTrigger,
  RepeatFrequency,
} from '@notifee/react-native';
import { setTopLevelNavigator } from './src/navigations/NavigationServices';
import { Provider } from 'react-native-paper';
import { addEventListener } from "@react-native-community/netinfo";
import socketServices from './src/utils/socket';
import AstroRating from './src/screens/astrologers/components/AstroRating';
import CallInvoice from './src/screens/chat/components/CallInvoice';
import { onNotification } from './src/Notifications/NotificationManager';
import ChatInvoice from './src/screens/chat/components/ChatInvoice';
import LiveCallInvoice from './src/screens/live/components/LiveCallInvoice';
import VideocallInvoice from './src/screens/chat/components/VideocallInvoice';
import MyStatusBar from './src/components/MyStatusbar';

const App = ({ route, data, dispatch }) => {

  const { i18n } = useTranslation();

  useEffect(() => {
    // Load the saved language from AsyncStorage
    const loadLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');

        if (selectedLanguage) {
          // Set the loaded language as the initial language
          i18n.changeLanguage(selectedLanguage);
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };

    // Call the function to load the language
    loadLanguage();
  }, []);

  const [sendnotification, setnotification] = useState(null);


  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      // if (state.isConnected) {
      //   socketServices.emit('reconnect');
      // }
    });

    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // onNotifeeMessageReceived(remoteMessage);
      onNotification(remoteMessage, dispatch)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isVisible = false;

  const toastConfig = {
    success: props =>
      isVisible ? (
        <BaseToast
          text1NumberOfLines={1}
          text2NumberOfLines={2}
          style={{ borderLeftColor: colors.background_theme2 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 14,
            fontWeight: '400',
          }}
          text2Style={{
            fontSize: 12,
          }}
        />
      ) : null,
    error: props => (
      <ErrorToast
        text1NumberOfLines={1}
        text2NumberOfLines={2}
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text allowFontScaling={false}>{text1}</Text>
        <Text allowFontScaling={false}>{props.uuid}</Text>
      </View>
    ),
  };

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];
        // Calling the permission function
        const granted = await PermissionsAndroid.requestMultiple(permissions, {
          title: 'Example App Permissions',
          message: 'Example App needs access to certain features.',
        });

        if (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.CALL_PHONE] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS] ===
          PermissionsAndroid.RESULTS.GRANTED
          //  &&
          // granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          // PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Permission Granted
          console.log('permissions');
        } else {
          // Permission Denied
          console.log('CAMERA Permission Denied');
        }
        Notifee.requestPermission();
      } else {
        Notifee.requestPermission();
      }
    }

    requestPermissions();
  }, []);

  return (
    <Provider>

      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GlobalContextProvider>
              <NavigationContainer ref={c => setTopLevelNavigator(c)}>
                <ZegoCallInvitationDialog />
                <StackNavigator
                  data1={sendnotification}
                />
                <ZegoUIKitPrebuiltCallFloatingMinimizedView />
              </NavigationContainer>
              <AstroRating />
              <Toast config={toastConfig} />
            </GlobalContextProvider>
            <CallInvoice />
            <ChatInvoice />
            <VideocallInvoice />
            <LiveCallInvoice />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(App);
