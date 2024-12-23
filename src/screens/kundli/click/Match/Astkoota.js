import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { Fonts, Sizes } from '../../../../assets/style';
import { SCREEN_WIDTH } from '../../../../config/Screen';
import SideBar from '../../../live/components/SideBar';

const Astkoota = ({ navigation, dispatch, matchgun }) => {
    useEffect(() => {
        dispatch(KundliActions.getgundata());
    }, [dispatch]);

    const gunData = matchgun ? [
        { name: 'bhakoot', title: 'Love' },
        { name: 'gana', title: 'Temperament' },
        { name: 'grahmaitri', title: 'Friendliness' },
        { name: 'naadi', title: 'Health' },
        { name: 'tara', title: 'Destiny' },
        { name: 'varna', title: 'Work' },
        { name: 'vashya', title: 'Dominance' },
        { name: 'yoni', title: 'Mentality' },
    ] : [];

    const renderHeader = () => (
        <View style={styles.headings}>
            <Text style={[styles.heading, {}]}>Area</Text>
            <Text style={styles.heading}>Male Value</Text>
            <Text style={[styles.heading, { right: SCREEN_WIDTH * 0.05 }]}>Female Value</Text>
            <Text style={[styles.heading, { right: SCREEN_WIDTH * 0.2 }]}>Points Obtained</Text>
            <Text style={[styles.heading, { right: SCREEN_WIDTH * 0.3 }]}>Total Points</Text>
        </View>
    );

    const renderItem = (item, index) => (
        <View key={index} style={[styles.itemContainer, { backgroundColor: index % 2 === 0 ? '#F7F6FE' : 'white' }]}>
            <View>
                <Text style={styles.dataText}>{item.title}</Text>

            </View>
            <Text style={styles.dataText}>{matchgun[item.name]?.maleval}</Text>
            <Text style={styles.dataText}>{matchgun[item.name]?.femaleval}</Text>
            <Text style={styles.dataText}>{matchgun[item.name]?.pointsobtained}</Text>
            <Text style={styles.dataText}>{matchgun[item.name]?.totalpoints}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <MyHeader title={'Gun Milan'} navigation={navigation} />
            <ScrollView horizontal contentContainerStyle={styles.horizontalScrollContent}>
                <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                    {renderHeader()}
                    <ScrollView>
                        {gunData.map((item, index) => renderItem(item, index))}
                    </ScrollView>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    horizontalScrollContent: {
        flexDirection: 'column',
        paddingBottom: 20,
    },
    headings: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        gap: SCREEN_WIDTH * 0.2,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    heading: {
        padding: 10,
        textAlign: 'center',
        ...Fonts.JostSemiBoldBlack,
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        gap: SCREEN_WIDTH * 0.14
    },
    dataText: {
        ...Fonts.JostMediumBlack,
        width: SCREEN_WIDTH * 0.24
    },
});

const mapStateToProps = (state) => ({
    matchgun: state.kundli.matchgun,
    isLoading: state.kundli.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Astkoota);
