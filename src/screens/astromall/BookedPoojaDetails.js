import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import Banner from './components/Banner'
import { base_url, img_url } from '../../config/constants'
import { Image } from 'react-native'
import ImageView from '../../components/ImageView'
import VedioPlayer from './components/VedioPlayer'
import VideoComponent from './components/VideoComponent'
import { SCREEN_WIDTH } from '../../config/Screen'

const BookedPoojaDetails = ({ route, navigation }) => {
    const poojaData = route?.params
    console.log(poojaData?.astrologerId?._id,'pooja data')
    const [state, setState] = useState({
        imageVisible: false,
        image: null,
        vedioUri: null,
        videoVisible: false,
    })

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data }
            return newData
        })
    }

    const { image, imageVisible, vedioUri, videoVisible } = state
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryLight} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <MyHeader title={poojaData?.poojaId?.poojaName} navigation={navigation} />
                <FlatList
                    ListHeaderComponent={<>
                        {poojaData && <Banner data={poojaData?.poojaId?.bannerImages} />}
                        {productInfo()}
                        {descriptionInfo()}
                        {astroMessageInfo()}
                        {astrologerDetails()}
                        {photoGallaryInfo()}
                        {vedioGallaryInfo()}
                    </>}
                />
                {/* {submitInfo()} */}
                <ImageView
                    updateState={updateState}
                    image={image}
                    imageVisible={imageVisible}
                />
                <VedioPlayer
                    videoVisible={videoVisible}
                    updateState={updateState}
                    uri={vedioUri}
                />
            </View>
        </View>
    )

    function submitInfo() {
        return (
            <TouchableOpacity activeOpacity={0.8} disabled onPress={() => navigation.navigate('registerPooja', { poojaId: poojaData?._id })} style={{ backgroundColor: Colors.primaryDark, paddingVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}>Upload Images and Videos</Text>
            </TouchableOpacity>
        )
    }

    function astroMessageInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray16RobotoMedium, marginBottom: Sizes.fixPadding }}>
                    Message received from Astrologer
                </Text>

                <Text style={{ ...Fonts.gray12RobotoMedium, color: Colors.blackLight }}>
                    {poojaData?.desc?.description}
                </Text>
            </View>
        );
    }

    function vedioGallaryInfo() {
        const renderItem = ({ item, index }) => {
            return <VideoComponent item={item} updateState={updateState} />;
        };
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray16RobotoMedium, marginBottom: Sizes.fixPadding }}>
                    Videos
                </Text>
                <FlatList
                    data={poojaData?.videos}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                />
            </View>
        );
    }

    function photoGallaryInfo() {
        const renderItem = ({ item, index }) => {
            console.log(item,'photo data')
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        updateState({
                            image: base_url + item,
                            imageVisible: true,
                        })
                    }
                    style={{ width: '30%', height: 250 }}>
                    <Image
                        source={{ uri: base_url + item }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray14RobotoRegular, marginBottom: Sizes.fixPadding }}>
                    Photos
                </Text>
                <FlatList
                    data={poojaData?.images}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                />
            </View>
        );
    }

    function astrologerDetails() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>Astrologer Details</Text>
                <TouchableOpacity style={{ marginVertical: Sizes.fixPadding }}
                 onPress={() =>
                    navigation.navigate('astrologerDetailes', {
                      _id: poojaData?.astrologerId?._id,
                     
                    })
                  }
                >
                    <Image source={{ uri: base_url + poojaData?.astrologerId?.profileImage }} style={{ width: SCREEN_WIDTH * 0.2, height: SCREEN_WIDTH * 0.2, borderRadius: 1000 }} />
                </TouchableOpacity>

                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>Name: {poojaData?.astrologerId?.astrologerName}</Text>
            </View>
        )
    }

    function descriptionInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{poojaData?.poojaId?.description}</Text>
            </View>
        )
    }

    function productInfo() {
        return (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: Colors.whiteDark }}>
                <Text style={{ ...Fonts.black22RobotoMedium }}>{poojaData?.poojaId?.poojaName}</Text>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.primaryDark, textTransform: 'capitalize' }}>{poojaData?.poojaId?.type}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BookedPoojaDetails)