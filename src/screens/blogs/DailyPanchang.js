import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, Dimensions, FlatList } from "react-native";
import MyLoader from "../../components/MyLoader";
import { api_url, colors, get_dailypanchang } from "../../config/Constants1";
import RenderHtml from 'react-native-render-html';
import * as BlogActions from '../../redux/actions/BlogActions'
import { connect } from "react-redux";
import MyHeader from "../../components/MyHeader";

const { width, height } = Dimensions.get('screen');

const DailyPanchang = ({navigation, dispatch, dailyPunchangData}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [remediesData, setRemediesData] = useState(null);

    useEffect(() => {
        dispatch(BlogActions.getDailyPunchangData())
    }, [dispatch]);


    const renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: 5 }} key={index}>
                <Text allowFontScaling={false} style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: colors.background_theme2,
                    padding: 10,
                    borderRadius: 10
                }}>{item.title}</Text>
                <RenderHtml
                    contentWidth={320}
                    source={{
                        html: `<div style="color: black; max-width: 320px;">${item.description}</div>`,
                    }}
                />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <MyLoader isVisible={isLoading} />
            <MyHeader title={'Daily Punchang'} navigation={navigation} />
            {dailyPunchangData && (
                <FlatList
                    data={dailyPunchangData}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 15 }}
                />
            )}
        </View>
    )


}

const mapStateToProps = state =>({
    dailyPunchangData: state.blogs.dailyPunchangData
})

const mapDispatchToProps = dispatch=>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(DailyPanchang);