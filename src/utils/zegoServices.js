import ZegoUIKitPrebuiltCallService, {
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoInvitationType,
  ZegoMenuBarButtonName,
 
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { zego_call_app_id, zego_call_app_sign } from '../config/constants';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import { Alert } from 'react-native';
import * as ChatActions from '../redux/actions/ChatActions';
import { navigate } from '../navigations/NavigationServices';




export const registerZegoCall = async ({ userId, userName, dispatch }) => {
  
  
  try {
    return ZegoUIKitPrebuiltCallService.init(
      zego_call_app_id, // You can get it from ZEGOCLOUD's console
      zego_call_app_sign, // You can get it from ZEGOCLOUD's console
      userId,
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        requireConfig: data => {
          // const newData = JSON.parse(data?.callID)
          // console.log(newData,'pnewdata')
          console.log(data,'all data ')
       
          const callConfig =
            data.invitees?.length > 1
              ? ZegoInvitationType.videoCall === data.type
                ? GROUP_VIDEO_CALL_CONFIG
                : GROUP_VOICE_CALL_CONFIG
              : ZegoInvitationType.videoCall === data.type
                ? ONE_ON_ONE_VIDEO_CALL_CONFIG
                : ONE_ON_ONE_VOICE_CALL_CONFIG;
                return {callConfig,
             
                  bottomMenuBarConfig: {
                    maxCount: 5,
                    buttons: [
                        // ZegoMenuBarButtonName.toggleCameraButton,
                        ZegoMenuBarButtonName.toggleMicrophoneButton,
                        ZegoMenuBarButtonName.switchAudioOutputButton,
                        ZegoMenuBarButtonName.hangUpButton,
                        ZegoMenuBarButtonName.switchCameraButton,
                    ],
                },
                  timingConfig: {
                      isDurationVisible: true,
                      onDurationUpdate: (duration) => {
                        // console.log('duration Video::::',duration,data,dataCall);
                        

                          if (duration === 5 * 60) {
                              ZegoUIKitPrebuiltCallService.hangUp();
                          }
      
                      },
                  },
                
                onHangUpConfirmation: () => {
                  
                  return new Promise((resolve, reject) => {
     
                
                      Alert.alert(
                          "Are you Sure ?",
                          "You want to end this call",
                          [
                              {
                                  text: "Cancel",
                                  onPress: () => reject(),
                                  style: "cancel"
                              },
                              {
                                text: "Yes",
                                onPress: () => {
                                  resolve();
                                  console.log('Resolve :::: video', data);
                                  
                                 
                                    dispatch(ChatActions.getonVideoCallEnd(data));
                                    
                                },
                              }
                              
                          ]
                      );
                  })
              }
                  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
                };
        },
       
        notifyWhenAppRunningInBackgroundOrQuit: true,
        isIOSSandboxEnvironment: true,
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
      },
    );
  } catch (e) {
    console.log(e);
  }
};

export const makeZegoCall = async ({ isVideo = true, navigation, newInvitees,data }) => {
  // console.log(' Zego Data Video :::::::::::',data,data?.callId,data?.type);


  try {
    return ZegoUIKitPrebuiltCallService
      .sendCallInvitation(
        newInvitees,
        isVideo,
        navigation,
      
        {
          resourceID: 'hellokundli-ea411',
          timeout: 60,
          callID:data?.callId,
          notificationTitle: 'Title',
          notificationMessage: 'Message',
          customData: '', // Include the callType here
          
        }
      );
  } catch (e) {
    console.log(e);
  }
}

export const unRegisterZegoCall = async () => {
  return ZegoUIKitPrebuiltCallService.uninit()
}
