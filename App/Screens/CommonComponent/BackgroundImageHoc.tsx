import React from 'react';
import { View, ImageBackground } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import AppImages from '@Theme/AppImages';

const BackgroundImage = (Comp: any) => {
  return ({ children, style, imageStyle, ...props }: any) => {
    return (
      <View style={[CommonStyle.flex1, style]}>
        <ImageBackground
          source={AppImages.appBg}
          resizeMode="cover"
          style={[CommonStyle.appBackgroundImage, imageStyle]}>
          <Comp style={CommonStyle.flex1} {...props}>
            {children}
          </Comp>
        </ImageBackground>
      </View>
    );
  };
};

const BackgroundImageHoc = BackgroundImage(View);
export { BackgroundImageHoc };
