import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { connect } from 'react-redux';
import MyHeader from '../../../components/MyHeader';
import SideBar from '../../live/components/SideBar';
import { Fonts, Sizes } from '../../../assets/style';

const Kalsarp = ({ navigation, dispatch, kalsarpdata, kalsarpremedies }) => {
    console.log('kalsarpdata::::', kalsarpdata?.data,)
    console.log(kalsarpremedies, 'ch')
    useEffect(() => {
        dispatch(KundliActions.getKalsarpdata());

    }, [dispatch]);



    console.log("KKK:::Kalsarpda", kalsarpdata)

    if (!kalsarpdata) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // const renderRemedies = () => {
    //     if (kalsarpremedies && kalsarpremedies.status === 'success' && kalsarpremedies.data) {
    //         return Object.keys(kalsarpremedies.data).map(key => (
    //             <View key={key} style={{ marginTop: 16 }}>
    //                 <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{kalsarpremedies.data[key].heading}</Text>
    //                 {Object.keys(kalsarpremedies.data[key]).map(subKey => {
    //                     if (subKey !== 'heading') {
    //                         return (
    //                             <Text key={subKey} style={{ marginTop: 8 }}>
    //                                 {kalsarpremedies.data[key][subKey]}
    //                             </Text>
    //                         );
    //                     }
    //                     return null;
    //                 })}
    //             </View>
    //         ));
    //     }
    //     return null;
    // };




    const renderRemedies = () => {
        if (kalsarpremedies && kalsarpremedies.status === 'success' && kalsarpremedies.data) {
            console.log('Rendering Remedies:', kalsarpremedies.data);
            return Object.keys(kalsarpremedies.data).map(key => {
                const remedySection = kalsarpremedies.data[key];
                console.log('Rendering Section:', remedySection);
                return (
                    <View key={key} style={{ marginTop: 16 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {remedySection.heading}
                        </Text>
                        {Object.keys(remedySection).map(subKey => {
                            if (subKey !== 'heading') {
                                console.log('Rendering SubKey:', subKey, remedySection[subKey]);
                                return (
                                    <Text key={subKey} style={{ marginTop: 8 }}>
                                        {remedySection[subKey]}
                                    </Text>
                                );
                            }
                            return null;
                        })}
                    </View>
                );
            });
        }
        console.log('No remedies to render.');
        return null;
    };



    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <MyHeader title={kalsarpdata?.data?.title} navigation={navigation} /> */}
            <MyHeader
                title={kalsarpdata?.data?.title ? kalsarpdata.data.title : 'No data'}
                navigation={navigation}
            />
            <View style={{ padding: 16, backgroundColor: '#F7F6FE', borderRadius: 10, marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, gap: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.JostSemiBoldBlack, fontSize: 20 }}>{kalsarpdata?.data?.title}</Text>
                <Text style={{ ...Fonts.JostMediumBlack }}>{kalsarpdata?.data?.present}</Text>
                <Text style={{ ...Fonts.JostMediumBlack }}>{kalsarpdata?.data?.reason}</Text>
                {renderRemedies()}
            </View>

        </ScrollView>
    );



};

const mapStateToProps = state => ({
    kalsarpdata: state.kundli.kalsarpdata,
    kalsarpremedies: state.kundli.kalsarpremedies
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Kalsarp);
