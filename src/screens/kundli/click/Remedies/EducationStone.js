import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { colors } from '../../../../config/Constants1';
import { Fonts } from '../../../../assets/style';

const EducationStone = ({  dispatch, educationStone }) => {

    useEffect(() => {
        dispatch(KundliActions.getEducation());
    }, [dispatch]);



    return (
        <ScrollView style={styles.container}>
           
            
            {educationStone && (
                <View style={styles.content}>
                    <Text style={styles.stone}>Stone: {educationStone.stone}</Text>
                    <Text style={styles.heading}>{educationStone.heading}</Text>
                    <Text style={styles.resp}>{educationStone.resp}</Text>
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
      ...Fonts.JostSemiBoldBlack,
      fontSize:21,
        marginBottom: 20,
    },
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    educationStone: state.kundli.educationStone,
});

export default connect(mapStateToProps, mapDispatchToProps)(EducationStone);
