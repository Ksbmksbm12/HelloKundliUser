import { View, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../config/Constants1';

const MyStatusBar = ({ backgroundColor = '#202020', barStyle = 'default' }) => {
  const insets = useSafeAreaInsets();

  useEffect(() => { }, [barStyle]);

  return (
    <View
      style={{
        height: insets.top,
        flex: 0,
        backgroundColor,
      }}
    >
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

export default MyStatusBar;
