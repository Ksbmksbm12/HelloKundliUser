import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as KundliActions from '../../../../redux/actions/KundliActions';
import MyHeader from '../../../../components/MyHeader';
import { colors } from '../../../../config/Constants1';
import { Fonts } from '../../../../assets/style';

const BasicStone = ({ navigation, dispatch, basicStone }) => {

    useEffect(() => {
        dispatch(KundliActions.getBasicStone());
    }, [dispatch]);

  

    return (
        <ScrollView style={styles.container}>
           
            
            {basicStone && (
                <View style={styles.content}>
                    <Text style={styles.stone}>Stone: {basicStone?.stone}</Text>
                    <Text style={styles.heading}>{basicStone?.heading}</Text>
                    <Text style={styles.resp}>{basicStone?.resp}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F6FE',
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
        ...Fonts.JostSemiBoldBlack,
        fontSize:20,
        marginBottom: 10,
        color: colors.black_color,
    },
    resp: {
        marginBottom: 10,
        textAlign: 'center',
        ...Fonts.JostRegularBlack,
        fontSize:16
    },
    stone: {
        ...Fonts.JostSemiBoldBlack,
        fontSize:21,
        marginBottom: 20,
    },
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => ({
    basicStone: state.kundli.basicStone,
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicStone);
