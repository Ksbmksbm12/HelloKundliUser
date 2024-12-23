import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../../../config/Constants1';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../../config/Screen';
import {mainlogo} from '../../../assets/images/Images';
import {Sizes} from '../../../assets/style';

const ConnectingModal = ({visible, onClose, astroData}) => {
  console.log(astroData, 'asrr');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>HelloKundli</Text>

          <View style={{height:SCREEN_HEIGHT*0.2,width:SCREEN_WIDTH*0.42,alignItems:'center'}}>
          <Image source={require('../../../assets/images/LOGINPHOTO.png')} resizeMode='cover' style={{height:'100%',width:'100%',resizeMode:'contain'}} tintColor={colors.orange_color}/>

          </View>

          <Text style={styles.modalText}>
            {astroData != 'online'
              ? 'Astrologer is Busy'
              : 'Waiting for Astrologer to Connect'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '70%',
    justifyContent:'space-between',
    backgroundColor: colors.background_theme2,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 27,
    color: 'white',
    marginTop: Sizes.fixPadding,
  },
});

export default ConnectingModal;
