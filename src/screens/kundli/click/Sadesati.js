import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import * as KundliActions from '../../../redux/actions/KundliActions';
import { connect } from 'react-redux';
import MyHeader from '../../../components/MyHeader';
import { colors } from '../../../config/Constants1';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts } from '../../../assets/style';

const Sadesati = ({ navigation, dispatch, sadesati, sadesatiRemedies }) => {

    useEffect(() => {
        dispatch(KundliActions.getsadesati());
    }, [dispatch]);
    useEffect(() => {
        dispatch(KundliActions.getsadesatiRemedies());
    }, [dispatch]);

    // console.log(sadesatiRemedies);

    const renderRemedies = (remedies) => {
        return Object.keys(remedies).filter(key => !isNaN(key)).map((key) => (
            <View key={key} style={styles.remedyContainer}>
                <Text style={styles.remedyText}>{remedies[key]}</Text>
            </View>
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <MyHeader title={'Sade Sati'} navigation={navigation} />

            {sadesati && (
                <View style={styles.content}>
                    <Text style={styles.title}>{sadesati?.data?.title}</Text>
                    <Text style={styles.present}>{sadesati?.data?.present}</Text>
                    <Text style={styles.reason}>{sadesati?.data?.reason}</Text>
                </View>
            )}

            {sadesatiRemedies && sadesatiRemedies.data && (
                <View style={styles.remediesContainer}>
                    <Text style={styles.remediesTitle}>{sadesatiRemedies?.data?.h3}</Text>
                    <Text style={styles.remediesSubtitle}>{sadesatiRemedies?.data?.h4}</Text>
                    {renderRemedies(sadesatiRemedies?.data)}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',

    },
    content: {
        marginTop: 20,
        backgroundColor: '#F7F6FE',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: SCREEN_WIDTH * 0.04
    },
    title: {
        ...Fonts.JostSemiBoldBlack,
        fontSize: 21
    },
    present: {
        ...Fonts.JostRegularBlack,
        fontSize: 16
    },
    reason: {
        ...Fonts.JostMediumBlack
    },
    remediesContainer: {
        marginTop: 20,
        backgroundColor: '#F7F6FE',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: SCREEN_WIDTH * 0.04
    },
    remediesTitle: {
        ...Fonts.JostSemiBoldBlack,
        fontSize: 21
    },
    remediesSubtitle: {
        ...Fonts.JostMediumBlack,
        fontSize: 18
    },
    remedyContainer: {
        marginBottom: 10,
    },
    remedyText: {
        ...Fonts.JostRegularBlack
    },
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    sadesati: state.kundli.sadesati,
    sadesatiRemedies: state.kundli.sadesatiRemedies
});

export default connect(mapStateToProps, mapDispatchToProps)(Sadesati);
