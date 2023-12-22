import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';

const SafeArea = (Comp: any) => {
  return ({ children, style, ...props }: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { appTheme } = useContext(AppContext);
    return (
      <SafeAreaView
        style={[
          CommonStyle.flex1,
          { backgroundColor: appTheme.blackBg },
          style,
        ]}>
        <StatusBar
          backgroundColor={appTheme.background}
          barStyle="dark-content"
        />
        <Comp style={CommonStyle.flex1} {...props}>
          {children}
        </Comp>
      </SafeAreaView>
    );
  };
};

const SafeAreaViewHoc = SafeArea(View);
export { SafeAreaViewHoc };
