import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

import { colors, fonts, getFontSize } from '../../config/Constants1';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { Dropdown } from 'react-native-element-dropdown';

import * as KundliActions from '../../../redux/actions/KundliActions';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../config/Screen';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import MyHeader from '../../../components/MyHeader';
import MyStatusBar from '../../../components/MyStatusbar';
import WebView from 'react-native-webview';





const charts = [
    { label: 'Akshvedansha Chart', value: '2' },
    { label: 'Chaturthansh Chart', value: '4' },
    { label: 'Chaturvinshansh Chart', value: '3' },
    { label: 'Dashmansh Chart', value: '10' },
    { label: 'Dreshkom Chart', value: '3' },
    { label: 'Dwadashansh Chart', value: '12' },
    { label: 'Hora Chart', value: '2' },
    { label: 'Khavedansh Chart', value: '40' },
    { label: 'Navansh Chart', value: '9' },
    { label: 'Saptansh Chart', value: '7' },
    { label: 'Saptvinshansh Chart', value: '27' },
    { label: 'Shashtiyansh Chart', value: '60' },
    { label: 'Shodashansh Chart', value: '16' },
    { label: 'Trishansh Chart', value: '30' },
    { label: 'Vinhansh Chart', value: '20' },
];


const DevisionChart = ({ navigation, getdivision, dispatch, isLoading }) => {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('chalit');

    useEffect(() => {

        const payload = {

            data: '2'
        }
        dispatch(KundliActions.getDevisionData(payload))
    }, [dispatch])

    console.log(getdivision, 'yuyh')

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar />
            <MyHeader title={'Divisional Chart '} navigation={navigation} />
            <View>
                <Dropdown
                    style={[styles.dropdown,]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={{ ...Fonts.JostRegularBlack }}
                    iconStyle={styles.iconStyle}
                    data={charts}
                    maxHeight={SCREEN_HEIGHT * 0.4}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select item'}
                    value={value}
                    onChange={item => {

                        const payload = {

                            data: item?.value
                        }

                        setValue(item.value)
                        dispatch(KundliActions.getDevisionData(payload))
                        // setValue(item.data);
                    }}

                />


                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: getdivision }}
                        style={{ height: SCREEN_WIDTH, width: SCREEN_WIDTH, resizeMode: 'contain' }}
                    />

                    {/* <WebView source={{ uri: laganChartNew }}
                        style={{ width: SCREEN_WIDTH * 2.6, height: SCREEN_HEIGHT * 2.6, alignItems: 'center', }} /> */}

                </View>
            </View>
        </View>
    );

};

const mapStateToProps = state => ({
    getdivision: state.kundli.getdivision,
    isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(DevisionChart);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '90%',
        alignSelf: 'center',
        marginVertical: Sizes.fixPadding * 2
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        ...Fonts.JostMediumBlack,
    },
    selectedTextStyle: {
        fontSize: 16,
        ...Fonts.black14InterMedium
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: 'black'
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

