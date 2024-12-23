import { View, Text, Linking, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import MyStatusBar from '../../components/MyStatusbar'

import { Fonts, Sizes } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { colors } from '../../config/Constants1'

const Supportuser = ({ navigation }) => {

  const handlePress = () => {
    const email = 'support@helloKundli.com';
    Linking.openURL(`mailto:${email}`).catch(err => console.error('An error occurred', err));
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.white_color, }}>
      <MyStatusBar barStyle='light-content' />
      <MyHeader title="Customer Support" navigation={navigation} />
      <View style={{ flex: 0.6, backgroundColor: colors.white_color, justifyContent: 'center' }}>

        {adminforget()}
      </View>
    </View>
  )
  function adminforget() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2, backgroundColor: '#F9F9F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding, gap: Sizes.fixPadding }}>
        <Text style={{ ...Fonts.JostRegularBlack, fontSize: 20, color: 'black' }}>Please contact</Text>
        <Text style={{ ...Fonts.JostRegularBlack, fontSize: 20, color: 'black' }}>HelloKundli admin team at</Text>
        <TouchableOpacity style={{ borderWidth: 1, borderStyle: 'dotted', width: '85%', borderColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.fixPadding * 2, borderRadius: 5 }}
          onPress={handlePress}
          activeOpacity={0.6}>
          <Text style={{ ...Fonts.JostSemiBoldBlack, fontSize: 20 }}>support@hellokundli.com</Text>
        </TouchableOpacity>
        <Text style={{ ...Fonts.JostRegularBlack, fontSize: 20, color: 'black' }}>for any queries and support</Text>
      </View>
    )

  }
}
export default Supportuser