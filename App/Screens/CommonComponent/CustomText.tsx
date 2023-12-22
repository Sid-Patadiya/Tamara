import React, { useContext } from 'react';
import { GestureResponderEvent, Text, StyleSheet, View } from 'react-native';
import { fontSizes, fontWeightDefault } from '@Utils/Constant';
import { AppContext } from '@AppContext/index';
import ThemeColor from '@Theme/Colors';
import CommonStyle from '@Theme/CommonStyle';

interface CustomProps {
  size?: number;
  small?: boolean;
  xsmall?: boolean;
  medium?: boolean;
  large?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxlarge24?: boolean;
  xlarge20?: boolean;
  xxxlarge?: boolean;
  style?: any;
  children: JSX.Element | string;
  numberOfLines?: number | undefined;
  onPress?: (event: GestureResponderEvent) => void;
  maxLength?: number;
  fontWeight600?: any;
  fontWeight400?: any;
  fontWeight700?: any;
}
const CustomText = (props: CustomProps) => {
  const { appTheme } = useContext(AppContext);

  const {
    size,
    xsmall,
    small,
    large,
    xlarge,
    xxlarge,
    xxxlarge,
    xxlarge24,
    xlarge20,
    style,
    fontWeight600,
    fontWeight700,
    fontWeight500,
    fontWeight400,
    children,
    numberOfLines = 0,
  } = props;

  const getFontSize = () => {
    let fontSize = size || fontSizes.medium;
    if (xsmall) {
      fontSize = fontSizes.xsmall;
    } else if (small) {
      fontSize = fontSizes.small;
    } else if (large) {
      fontSize = fontSizes.large;
    } else if (xxlarge) {
      fontSize = fontSizes.xxlarge;
    } else if (xxlarge24) {
      fontSize = fontSizes.xxlarge24;
    } else if (xlarge20) {
      fontSize = fontSizes.xlarge20;
    } else if (xlarge) {
      fontSize = fontSizes.xlarge;
    } else if (xxxlarge) {
      fontSize = fontSizes.xxxlarge;
    }
    return {
      fontSize,
    };
  };

  const getFontWeight = () => {
    let fontWeight = fontWeightDefault.fontWeight500;
    if (fontWeight400) {
      fontWeight = fontWeightDefault.fontWeight400;
    }
    if (fontWeight600) {
      fontWeight = fontWeightDefault.fontWeight600;
    }
    if (fontWeight700) {
      fontWeight = fontWeightDefault.fontWeight600;
    }
    return fontWeight;
  };

  const renderChildren = () => {
    if (typeof children === 'string' && props.maxLength) {
      return (
        (children?.length < props.maxLength && `${children}`) ||
        `${children.substring(0, props.maxLength).trim()}...`
      );
    }
    return children;
  };

  return (
    <Text
      {...props}
      numberOfLines={numberOfLines}
      style={[
        getFontSize(),
        {
          color: appTheme.text,
          fontWeight: getFontWeight(),
        },
        style && style,
      ]}>
      {renderChildren()}
    </Text>
  );
};

const RowText = (props: any) => {
  const { leftText, rightText } = props;
  const { appTheme } = useContext(AppContext);
  return (
    <View style={style.rowText}>
      <CustomText
        numberOfLines={1}
        style={[CommonStyle.flex1, { color: appTheme.whiteText }]}>
        {`${leftText}`}
      </CustomText>
      <CustomText
        numberOfLines={1}
        style={[style.rightTextStyle, { color: appTheme.whiteText }]}>
        {`${rightText}`}
      </CustomText>
    </View>
  );
};

const style = StyleSheet.create({
  rowText: {
    flexDirection: 'row',
    padding: 15,
    margin: 5,
    backgroundColor: ThemeColor.inputBg,
    borderRadius: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  rightTextStyle: {
    textAlign: 'right',
  },
});

export { CustomText, RowText };
