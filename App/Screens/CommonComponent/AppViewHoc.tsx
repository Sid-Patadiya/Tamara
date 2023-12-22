import React from 'react';
import { View } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import {
  BackgroundImageHoc,
  KeyBoardAvoidViewHoc,
  SafeAreaViewHoc,
} from '@CommonComponent/index';

const AppView = (Comp: any) => {
  return ({
    children,
    safeAreaViewStyle,
    imageViewStyle,
    imageBgStyle,
    removeKeyBoardAvoidView,
    addSafeAreaView = false,
    addScrollView = true,
    ...props
  }: any) => {
    if (addSafeAreaView) {
      return (
        <SafeAreaViewHoc style={safeAreaViewStyle}>
          <BackgroundImageHoc style={imageViewStyle} imageStyle={imageBgStyle}>
            <Comp style={CommonStyle.flex1} {...props}>
              {children}
            </Comp>
          </BackgroundImageHoc>
        </SafeAreaViewHoc>
      );
    }
    if (removeKeyBoardAvoidView) {
      return (
        <BackgroundImageHoc style={imageViewStyle} imageStyle={imageBgStyle}>
          <Comp style={CommonStyle.flex1} {...props}>
            {children}
          </Comp>
        </BackgroundImageHoc>
      );
    }
    return (
      <BackgroundImageHoc style={imageViewStyle} imageStyle={imageBgStyle}>
        <KeyBoardAvoidViewHoc addScrollView={addScrollView}>
          <Comp style={CommonStyle.flex1} {...props}>
            {children}
          </Comp>
        </KeyBoardAvoidViewHoc>
      </BackgroundImageHoc>
    );
  };
};

const AppViewHoc = AppView(View);
export { AppViewHoc };
