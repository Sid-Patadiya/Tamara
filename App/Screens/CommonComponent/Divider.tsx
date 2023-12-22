import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  linearGradient: {
    width: 76,
    alignSelf: 'center',
    borderRadius: 5,
    height: 4,
  },
});

export const marginSize = {
  margin5: 5,
  margin10: 10,
  margin15: 20,
  margin20: 30,
  margin25: 46,
};

export const dividerSizeDefault = {
  divider2: 2,
  divider3: 3,
  divider5: 5,
  divider10: 10,
  divider15: 15,
};

export const GradientDivider = () => {
  const { appTheme } = useContext(AppContext);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={appTheme.gradient}
      style={styles.linearGradient}
    />
  );
};

export const Divider = ({ dividerSize, text, style }: any) => {
  const { appTheme } = useContext(AppContext);

  if (text) {
    return (
      <View
        style={[
          CommonStyle.flex1,
          CommonStyle.rowDirection,
          CommonStyle.alignItems,
        ]}>
        <View
          style={[
            CommonStyle.flex1,
            {
              height: dividerSize,
              backgroundColor: appTheme.divider,
            },
            style,
          ]}
        />
        <CustomText
          medium
          style={{ color: appTheme.whiteText, marginHorizontal: 10 }}>
          {text}
        </CustomText>
        <View
          style={[
            CommonStyle.flex1,
            {
              height: dividerSize,
              backgroundColor: appTheme.divider,
            },
            style,
          ]}
        />
      </View>
    );
  }
  return (
    <View
      style={[
        CommonStyle.flex1,
        {
          height: dividerSize,
          backgroundColor: appTheme.divider,
        },
        style,
      ]}
    />
  );
};
