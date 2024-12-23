import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { colors } from '../../../../config/Constants1';
import { Fonts } from '../../../../assets/style';

const Rurdra = ({ navigation, dispatch, rudradata }) => {
    useEffect(() => {
        dispatch(KundliActions.getRurda());
    }, [dispatch]);

    console.log('Rudraksha Data:', rudradata);

    return (
        <ScrollView style={styles.container}>
            
            
            {rudradata && (
                <View style={styles.content}>
                    <Text style={styles.rudraksha}>Recommended Rudraksha: {rudradata.rudraksha}</Text>
                    <Text style={styles.heading}>{rudradata.heading}</Text>
                    <Text style={styles.resp}>{rudradata.resp}</Text>
                    
                </View>
            )}
        </ScrollView>
    );
};

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
        textAlign: 'center',
        ...Fonts.JostMediumBlack,
        fontSize:18
    },
    resp: {
        marginBottom: 10,
        textAlign: 'center',
        ...Fonts.JostMediumBlack
    },
    rudraksha: {
        marginBottom: 20,
        textAlign: 'center',
        ...Fonts.JostSemiBoldBlack,
        fontSize:21
    },
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    rudradata: state.kundli.rudradata,
});

export default connect(mapStateToProps, mapDispatchToProps)(Rurdra);
