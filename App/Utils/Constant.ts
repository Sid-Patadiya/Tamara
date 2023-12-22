import { Platform, Dimensions } from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const { height, width } = Dimensions.get('window');

export const aspectRatio = height / width;
export const isiPad = aspectRatio < 1.6;

// Custom Fonts
export const fonts = {
  Regular: { fontFamily: 'Regular' },
  Light: { fontFamily: 'Light' },
  Medium: { fontFamily: 'Medium' },
  Bold: { fontFamily: 'Bold' },
};

// Font Sizes
export const fontSizes = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge24: 24,
  xlarge20: 20,
  xxlarge: 25,
  xxxlarge: 32,
};

// Font Sizes
export const fontWeightDefault = {
  fontWeight500: '500',
  fontWeight400: '400',
  fontWeight600: '600',
  fontWeight700: '700',
};

export const messageActionOption = {
  like: 'like',
  disLike: 'disLike',
  save: 'save',
  unSave: 'unSave',
  translator: 'translator',
  share: 'share',
  delete: 'delete',
};

export const signUpType = {
  google: 'google',
  apple: 'apple',
  facebook: 'facebook',
  twitter: 'twitter',
  tamara: 'tamara',
};

export const paginationLimit = 20;
export const paginationStartFrom = 1;

export const genderDefault = [
  { title: 'Agender' },
  { title: 'Female/Woman' },
  { title: 'Genderqueer' },
  { title: 'Gender Fluid' },
  { title: 'Gender Non-Conforming' },
  { title: 'Intergender' },
  { title: 'Intersex' },
  { title: 'Male/Man' },
  { title: 'Nonbinary' },
  { title: 'Other' },
  { title: 'Transgender' },
  { title: 'Trans Man/Male' },
  { title: 'Trans Woman/Female' },
  { title: 'I do not wish to provide this information' },
];
