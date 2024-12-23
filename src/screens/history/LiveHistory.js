import { View, Text, FlatList, StyleSheet, Image,Platform, PermissionsAndroid, Alert, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import moment from 'moment';
import { secondsToHMS, showNumber } from '../../utils/services';
import { base_url } from '../../config/constants';
import { colors } from '../../config/Constants1';
import RNFetchBlob from 'rn-fetch-blob';

const LiveHistory = ({ liveVedioCallHistoryData }) => {
  if (liveVedioCallHistoryData === null || liveVedioCallHistoryData.length === 0) {
    liveVedioCallHistoryData = 0;
  }

  const click = async(id) => {
    console.log(id);
    const api = `https://api.hellokundli.in/api/customers/generate_pdf_livecall_history?liveCallHistoryId=${id}`;
    
    if (Platform.OS === 'android' && Platform.Version < 30) {
      
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission granted, proceed with the download
          const { dirs } = RNFetchBlob.fs;
     
          await RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              mediaScannable: true,
              title: 'HelloKundli.pdf',
              path: `${dirs.DownloadDir}/HelloKundli.pdf`,
            },
          })
            .fetch('GET', api)
            .then((res) => {
              console.log('The file saved to ', res.path());
            })
            .catch((e) => {
              console.log(e);
            });
  
          
        } else {
          // Permission denied
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
    } else {
      try {
       
         
          const { dirs } = RNFetchBlob.fs;
     
          await RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              mediaScannable: true,
              title: 'HelloKundli.pdf',
              path: `${dirs.DownloadDir}/HelloKundli.pdf`,
            },
          })
            .fetch('GET', api)
            .then((res) => {
              console.log('The file saved to ', res.path());
            })
            .catch((e) => {
              console.log(e);
            });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  
  } 

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Text
          style={{
            ...Fonts.black11InterMedium,
            fontSize: 13,
            marginBottom: Sizes.fixPadding * 0.5,
            textTransform: 'uppercase',
          }}>
          ORDER ID: {item?.streamId}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: base_url + item?.roomId?.astrologerId?.profileImage,
              }}
              style={{ width: '100%', height: '100%', borderRadius: 1000 }}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>
              {item?.roomId?.astrologerId?.astrologerName}
            </Text>
            <Text style={{ ...Fonts.gray12RobotoMedium }}>
              {item?.roomId?.astrologerId?.gender}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Order Time: {moment(item?.createdAt).format('DD MMM YYYY hh:mm A')}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Duration: {secondsToHMS(item?.durationInSeconds)}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Vedio Call Price: {showNumber(item?.roomId?.vedioCallPrice)}/min
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Total Charge: {showNumber(item?.amount)}
          </Text>
          <Text
            style={{ ...Fonts.black14RobotoRegular, color: Colors.blackLight }}>
            Status: {item?.status}
          </Text>
        </View>
        <TouchableOpacity style={{width:SCREEN_WIDTH * 0.35,borderRadius:10,backgroundColor:colors.background_theme2,paddingVertical:Sizes.fixPadding,alignSelf:'flex-end'}} onPress={() => click(item?._id)}>
          <Text style={{ ...Fonts.black16RobotoMedium,color:Colors.white,textAlign:'center'}}>Downloaded</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
      {liveVedioCallHistoryData ?
        <FlatList
          data={liveVedioCallHistoryData}
          renderItem={renderItem}
          initialNumToRender={5}
          contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
        />
        : <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingVertical: 200 }}>
          <Text style={{ display: "flex", alignSelf: "center", justifyContent: "center", color: colors.black_color, fontSize: 15 }}>No Data Available</Text>
        </View>
      }
    </View>
  );
};

const mapStateToProps = state => ({
  liveVedioCallHistoryData: state.history.liveVedioCallHistoryData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveHistory);

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.fixPadding * 1.5,
    backgroundColor: Colors.white,
    borderRadius: Sizes.fixPadding * 0.7,
    paddingHorizontal: Sizes.fixPadding * 0.7,
    paddingVertical: Sizes.fixPadding,
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.16,
    height: SCREEN_WIDTH * 0.16,
    borderRadius: 1000,
    overflow: 'hidden',
  },
});
