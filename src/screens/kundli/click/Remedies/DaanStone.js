import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { colors } from '../../../../config/Constants1';
import { Fonts } from '../../../../assets/style';
import { fonts } from '@rneui/base';

const DaanStone = ({ navigation, dispatch, daanstone }) => {

    useEffect(() => {
        dispatch(KundliActions.getdaan());
    }, [dispatch]);



    return (
        <ScrollView style={styles.container}>
           
            
            {daanstone && (
                <View style={styles.content}>
                    <Text style={styles.stone}>Stone: {daanstone.stone}</Text>
                    <Text style={styles.heading}>{daanstone.heading}</Text>
                    <Text style={styles.resp}>{daanstone.resp}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    content: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    heading: {
        marginBottom: 10,
        ...Fonts.JostSemiBoldBlack,
        fontSize:21
    },
    resp: {
        marginBottom: 10,
        textAlign: 'center',
        ...Fonts.JostMediumBlack

    },
    stone: {
        fontWeight: 'bold',
        marginBottom: 20,
        ...Fonts.JostSemiBoldBlack,
        fontSize:21
    },
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    daanstone: state.kundli.daanstone,
});

export default connect(mapStateToProps, mapDispatchToProps)(DaanStone);
