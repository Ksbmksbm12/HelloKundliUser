import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { Fonts } from '../../../../assets/style';

const Astkootdosha = ({ navigation, dispatch, astkootdosa }) => {

    useEffect(() => {
        dispatch(KundliActions.getastkootdosha());
    }, [dispatch]);



    const doshas = astkootdosa ? [
        { title: 'Bhakoot Dosha', comment: astkootdosa.bhakootdosha.comment, present: astkootdosa.bhakootdosha.present },
        { title: 'Gana Dosha', comment: astkootdosa.ganadosha.comment, present: astkootdosa.ganadosha.present },
        { title: 'Naadi Dosha', comment: astkootdosa.naadidosha.comment, present: astkootdosa.naadidosha.present }
    ] : [];

    const doshaColors = {
        yes: '#ff5e57',   // Light red for "yes" (dosha present)
        no: '#d1ffbd'     // Light green for "no" (dosha not present)
    };

    return (
        <View style={styles.container}>
            <MyHeader title={'Ashtakoot Dosha'} navigation={navigation} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {doshas.map((dosha, index) => (
                    <View
                        key={index}
                        style={[
                            styles.doshaContainer,
                            { backgroundColor: '#F7F6FE' }
                        ]}
                    >
                        <Text style={styles.title}>{dosha.title}</Text>
                        <Text style={styles.comment}>{dosha.comment}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F6FE',
    },
    scrollContainer: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    doshaContainer: {
        padding: 20,
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: '#F7F6FE',
        borderWidth: 1,
        borderColor: '#F7F6FE'
    },
    title: {

        marginBottom: 10,
        ...Fonts.JostSemiBoldBlack,
        fontSize: 21,
    },
    comment: {
        ...Fonts.JostMediumBlack
    },
});

const mapStateToProps = (state) => ({
    astkootdosa: state.kundli.astkootdosa,
    isLoading: state.kundli.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Astkootdosha);
