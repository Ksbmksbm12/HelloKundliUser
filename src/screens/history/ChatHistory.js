import { View, Text, FlatList, StyleSheet, Image, Platform, PermissionsAndroid, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import moment from 'moment';
import { secondsToHMS, showNumber } from '../../utils/services';
import { base_url } from '../../config/constants';
import { colors } from '../../config/Constants1';
import RNFetchBlob from 'rn-fetch-blob';
import * as HistoryActions from '../../redux/actions/HistoryActions';

const ChatHistory = ({ chatHistoryData, dispatch }) => {
  useEffect(() => {
    dispatch(HistoryActions.getChatHistory());
  }, [dispatch])

  console.log("chatHistoryDataKKK:::", chatHistoryData,)


  if (chatHistoryData === null || chatHistoryData.length === 0) {
    chatHistoryData = 0;
  }

  const click = async (id) => {
    console.log(id);
    const api = `https://api.hellokundli.in/api/customers/generate-pdf-chat-history?chatHistoryId=${id}`;

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

    }

    else {
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
    console.log(item?._id, 'check id')

    return (
      <View style={styles.container}>
        <Text
          style={{
            ...Fonts.JostMediumBlack,
            paddingBottom: Sizes.fixPadding
          }}>
          ORDER ID: {item?.transactionId}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: base_url + item?.astrologerId?.profileImage }}
              style={{ width: '100%', height: '100%', borderRadius: 1000 }}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>
              {item?.astrologerId?.astrologerName}
            </Text>
            <Text style={{ ...Fonts.gray12RobotoMedium }}>
              {item?.astrologerId?.gender}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Order Time:{' '}
            {moment(new Date(item?.createdAt)).format('DD MMM YYYY hh:mm A')}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Duration: {secondsToHMS(item?.durationInSeconds)}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Chat Price: {showNumber(item?.chatPrice)}/min
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Total Charge: {showNumber(item?.totalChatPrice)}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Status: {item?.status}
          </Text>
        </View>
        <TouchableOpacity style={{ width: SCREEN_WIDTH * 0.35, borderRadius: 10, backgroundColor: colors.background_theme2, paddingVertical: Sizes.fixPadding, alignSelf: 'flex-end' }} onPress={() => click(item?._id)}>
          <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}>Downloaded</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
      {chatHistoryData ?
        <FlatList
          data={chatHistoryData}
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
  chatHistoryData: state.history.chatHistoryData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);

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
