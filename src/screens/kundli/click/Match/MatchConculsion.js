import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as KundliActions from '../../../../redux/actions/KundliActions'
import MyHeader from '../../../../components/MyHeader'
import { Fonts } from '../../../../assets/style'

const MatchConculsion = ({ dispatch, matchconlusion, navigation }) => {
  useEffect(() => {
    dispatch(KundliActions.getmatchconclusion())
  }, [dispatch])
  console.log(matchconlusion, 'Match')

  return (
    <ScrollView>
      <MyHeader title={'Match Report'} navigation={navigation} />
      <View style={{ padding: 20 }}>

        <Text style={{ marginVertical: 10, color: 'black', textAlign: 'justify', ...Fonts.JostMediumBlack }}>{matchconlusion}</Text>
      </View>
    </ScrollView>
  )
}

const mapDispatchToProps = dispatch => ({ dispatch })
const mapStateToProps = state => ({
  matchconlusion: state.kundli.matchconlusion
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchConculsion)
