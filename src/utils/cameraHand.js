import React, { useRef, useEffect, useState } from 'react';
import { Camera, useCameraDevice,useCameraFormat, useFrameProcessor } from 'react-native-vision-camera';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showToastMessage } from './services';
import * as ChatActions from '../redux/actions/ChatActions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CameraVision = ({ dispatch }) => {
  
  const [flip,setFlip] = useState('back')
  const camera = useRef(null);

  const device = useCameraDevice(flip)
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      
      const cameraPermission = await Camera.requestCameraPermission();
      console.log('Camera Permission ::: ', cameraPermission)
      setHasPermission(cameraPermission === 'authorized');
    };

    requestPermission();
  }, []);

  const format = useCameraFormat(device, [
    { photoResolution: { width: 800, height: 800 } }
  ]);


  const photo = async() => {
   const data =  await camera.current.takePhoto();
   
   const image = `file://${data?.path}`;
   console.log('data camera ::: ',image);
   dispatch(ChatActions.setCameraChatHand(image))
   dispatch(ChatActions.setCameraChatVision(false));
  };

  const Flip = () => {
    if(flip == 'back') {
      setFlip('front')
    } else {
      setFlip('back')
    }
    
  }

  const exitCamera = () => {
    dispatch(ChatActions.setCameraChatVision(false));
  }

  if (!device) return showToastMessage({ message: 'loading....'});
  // if (!hasPermission) return showToastMessage({ message: 'permission'});

 

  return (
    <View style={styles.absoluteFill}>
      <Camera
        ref={camera}
        style={styles.absoluteFill}
        device={device}
        isActive={true}
        format={format}
        photo={true}
        
      />
      <TouchableOpacity 
      onPress={() => photo()}
      style={{
        alignSelf:'center',
        bottom:20,
        position:'absolute'
      }}>
      <Entypo name='circle' size={50} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => Flip()}
      style={{
        alignSelf:'flex-end',
        bottom:20,
        position:'absolute',
        paddingRight:20
      }}>
        <MaterialIcons name='flip-camera-ios' size={50} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
      style={{alignSelf:'flex-end', position:'absolute',padding:10}}
      onPress={() => exitCamera()}>
        <AntDesign name='closecircle' size={40} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
  requestedData: state.chat.requestedData,
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraVision);

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
