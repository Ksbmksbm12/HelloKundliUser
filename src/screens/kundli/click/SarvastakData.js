import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as KundliActions from '../../../redux/actions/KundliActions';
import MyHeader from '../../../components/MyHeader';
import { SCREEN_WIDTH } from '../../../config/Screen';
import { Fonts, Sizes } from '../../../assets/style';

// const SarvastakData = ({ navigation, dispatch, sarvadata, isLoading }) => {

//     useEffect(() => {
//         dispatch(KundliActions.getsarvadata());
//     }, [dispatch]);

//     if (isLoading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (!sarvadata || Object.keys(sarvadata).length === 0) {
//         return (
//             <View style={styles.emptyContainer}>
//                 <Text style={styles.emptyText}>No data available</Text>
//             </View>
//         );
//     }

//     const formatText = (text) => {
//         if (typeof text === 'string') {
//             return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//         }
//         return text;
//     };

//     const getRandomLightColor = () => {
//         const letters = 'BCDEF'; // Using letters from B to F to ensure light colors
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * letters.length)];
//         }
//         return color;
//     };

//     const renderRow = (row, rowIndex) => {
//         const rowColor = getRandomLightColor();
//         return (
//             <View key={rowIndex} style={[styles.row, { backgroundColor: rowColor }]}>
//                 {row.map((cell, cellIndex) => (
//                     <Text key={cellIndex} style={styles.cell}>{formatText(cell)}</Text>
//                 ))}
//             </View>
//         );
//     };

//     const data = Object.values(sarvadata).map((arr, index) => [Object.keys(sarvadata)[index], ...arr]);

//     return (
//         <View style={styles.container}>
//             <MyHeader title="Sarvastak Data" navigation={navigation} />
//             <ScrollView horizontal>
//                 <View>
//                     {data.map((row, index) => renderRow(row, index))}
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };


const SarvastakData = ({ navigation, dispatch, sarvadata = {}, isLoading }) => {
    useEffect(() => {
        dispatch(KundliActions.getsarvadata());
        console.log("Sarvadata::::", sarvadata);
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // if (!sarvadata || Object.keys(sarvadata).length === 0 || sarvadata.errorcode) {
    //     return (
    //         <View style={styles.emptyContainer}>
    //             <Text style={styles.emptyText}>
    //                 {sarvadata.errorcode ? `Error: ${sarvadata.status}` : 'No data available'}
    //             </Text>
    //         </View>
    //     );
    // }

    if (!sarvadata || typeof sarvadata !== 'object' || Object.keys(sarvadata).length === 0 || sarvadata?.errorcode) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    {sarvadata?.errorcode ? `Error: ${sarvadata.status}` : 'No data available'}
                </Text>
            </View>
        );
    }


    const formatText = (text) => (typeof text === 'string' ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : text);

    const getRandomLightColor = () => {
        const letters = 'BCDEF';
        return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * letters.length)]).join('')}`;
    };

    // const renderRow = (row, rowIndex) => {
    //     if (!Array.isArray(row)) return null;
    //     const rowColor = getRandomLightColor();
    //     return (
    //         <View key={rowIndex} style={[styles.row, { backgroundColor: rowColor }]}>
    //             {row.map((cell, cellIndex) => (
    //                 <Text key={cellIndex} style={styles.cell}>
    //                     {formatText(cell?.toString() || '')}
    //                 </Text>
    //             ))}
    //         </View>
    //     );
    // };

    const renderRow = (row, rowIndex) => {
        if (!Array.isArray(row)) return null;

        const rowColor = rowIndex % 2 === 0 ? '#F7F6FE' : '#FFFFFF';

        return (
            <View key={rowIndex} style={[styles.row, { backgroundColor: rowColor, paddingTop: 10 }]}>
                {row.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.cell}>
                        {formatText(cell?.toString() || '')}
                    </Text>
                ))}
            </View>
        );
    };


    const data = Object.entries(sarvadata || {}).map(([key, value]) => [
        key,
        ...(Array.isArray(value) ? value : []),
    ]);

    return (
        <View style={styles.container}>
            <MyHeader title="Sarvashtakavarga" navigation={navigation} />
            <ScrollView horizontal>
                <View>
                    {data.map((row, index) => renderRow(row, index))}
                </View>
            </ScrollView>
        </View>
    );
};






const mapStateToProps = (state) => ({
    sarvadata: state.kundli.sarvadata,
    isLoading: state.kundli.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SarvastakData);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 8,
        borderBottomColor: '#ccc',
        paddingHorizontal: Sizes.fixPadding

    },
    cell: {
        // width: SCREEN_WIDTH,
        width: SCREEN_WIDTH * 0.3,

        ...Fonts.JostMediumBlack
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
