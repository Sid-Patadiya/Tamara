import React from 'react';
import { View } from 'react-native';

export const spaceSize = {
  extraSmall: 5,
  small: 10,
  normal: 20,
  large: 30,
  extraLarge: 46,
}

export const spaceType = {
  extraSmall: 'extraSmall',
  small: 'small',
  normal: 'normal',
  large: 'large',
  extraLarge: 'extraLarge',
}


export const Space = ({ type }) => {
  const style = {
    extraSmall: {
      height: spaceSize.extraSmall,
    },
    small: {
      height: spaceSize.small,
    },
    normal: {
      height: spaceSize.normal,
    },
    large: {
      height: spaceSize.large,
    },
    extraLarge: {
      height: spaceSize.extraLarge,
    },
  }

  return <View style={style[type]} />
}