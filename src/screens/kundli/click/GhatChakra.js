import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as KundliAction from '../../../redux/actions/KundliActions';
import MyHeader from '../../../components/MyHeader';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';

const GhatChakra = ({ navigation, dispatch, ghaatchakra, isLoading }) => {
    useEffect(() => {
        dispatch(KundliAction.getghatchakra());
    }, [dispatch]);


    console.log('KKKK:::', ghaatchakra)

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!ghaatchakra || Object.keys(ghaatchakra).length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No data available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MyHeader title="Ghat Chakra" navigation={navigation} />

            <FlatList
                data={Object.entries(ghaatchakra)}
                keyExtractor={(item) => item[0]}
                renderItem={({ item, index }) => (

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, backgroundColor: index % 2 === 0 ? '#F7F6FE' : '#FFFFFF', padding: Sizes.fixPadding, }}>
                        <Text style={styles.key}>{item[0]}</Text>
                        <Text style={styles.value}>{item[1]}</Text>



                    </View>
                )}
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    ghaatchakra: state.kundli.ghaatchakra,
    isLoading: state.kundli.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GhatChakra);

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        ...Fonts.JostMediumBlack
    },
    // item: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingVertical: 13,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    //     color: 'black',
    //     marginHorizontal: Sizes.fixPadding * 1.8
    // },
    key: {
        ...Fonts.JostMediumBlack,
        paddingHorizontal: Sizes.fixPadding
    },
    value: {
        ...Fonts.JostRegularBlack,
        paddingHorizontal: Sizes.fixPadding
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
    },
});
