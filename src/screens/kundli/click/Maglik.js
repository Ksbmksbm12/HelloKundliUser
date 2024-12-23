import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import MyHeader from '../../../components/MyHeader';
import SideBar from '../../live/components/SideBar';
import { Fonts, Sizes } from '../../../assets/style';

const Manglik = ({ dispatch, navigation, manglikyog }) => {
    useEffect(() => {
        dispatch(KundliActions.getManglik());
    }, [dispatch]);

    useEffect(() => {
        console.log('Manglik Yog Data:', manglikyog);
    }, [manglikyog]);

    if (!manglikyog) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <MyHeader title="Manglik Yog" navigation={navigation} />
            <View style={{ padding:Sizes.fixPadding,backgroundColor:'#F7F6FE',borderRadius:10,paddingHorizontal:Sizes.fixPadding,marginHorizontal:Sizes.fixPadding,marginTop:Sizes.fixPadding,gap:10}}>
                <Text style={{...Fonts.JostSemiBoldBlack,fontSize:21}}>{manglikyog?.data?.title}</Text>
                <Text style={{...Fonts.JostMediumBlack }}>{manglikyog?.data?.result}</Text>
                <Text style={{...Fonts.JostRegularBlack }}>{manglikyog?.data?.reason}</Text>
                <Text style={{ ...Fonts.JostRegularBlack}}>{manglikyog?.data?.percentage}</Text>
                <Text style={{ ...Fonts.JostRegularBlack}}>{manglikyog?.data?.note}</Text>
            </View>
        </ScrollView>
    );
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
    manglikyog: state.kundli.manglikyog
});

export default connect(mapStateToProps, mapDispatchToProps)(Manglik);
