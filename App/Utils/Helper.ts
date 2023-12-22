import DeviceInfo from 'react-native-device-info';
import { AxiosHeaders } from 'axios';
import { CommonActions } from '@react-navigation/native';
import { ApiConfig } from '@ApiConfig/index';
import { getItemFromStorage } from '@Utils/Storage';
import { Authentication } from '@Utils/Enums';
import { Linking, Share } from 'react-native';
import moment from 'moment';

export const isValidPhoneNo = (phoneNo: string) => {
  const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(phoneNo);
};

export const getVersionName = () => {
  const buildNumber = DeviceInfo.getBuildNumber();
  const versionName = DeviceInfo.getVersion();
  return `v${versionName} (${buildNumber})`;
};

export const deviceHasNotch = DeviceInfo.hasNotch();

export const isValidEmail = (email: string) => {
  const format =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return format.test(email);
};

export const isValidUserName = (email: string) => {
  const format = /^[0-9a-zA-Z_]{5,}$/;
  return format.test(email);
};

export const isEmpty = (text: string) => {
  return text.toString().trim().length > 0 && text.toString().trim() !== '0';
};

export const checkPassword = (text: string) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(text);
};

export const validatePhoneNumber = (phoneNumber: string) =>
  /^\d{10}$/.test(phoneNumber);

export const configureUrl = (url: string) => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

export const getErrorMessage = (error: any) => {
  if (error && error.response && error.response.data && error.response.data) {
    if (error.response.data.errors) {
      return error.response.data.errors.join('\n');
    }
    if (error.response.data.message) {
      return error.response.data.message;
    }
  }
  if (error && error.message) {
    return error.message;
  }
  return 'Something went wrong!';
};

export const getSize = (size: number) => {
  return {
    height: size,
    width: size,
  };
};

export const getRound = (size: number) => {
  return {
    height: size,
    width: size,
    borderRadius: size,
  };
};

export const navigateToNextScreen = (
  navigation: any,
  params: { name: string; params?: any },
) => navigation.navigate(params);

export const goToNextScreen = async (
  navigation: any,
  nextScreen: string,
  params?: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: nextScreen, params }],
    }),
  );
};

export const getHeaders = async () => {
  let token: string | null = ApiConfig.token;
  if (!token) {
    token = await getItemFromStorage(Authentication.TOKEN);
  }
  const headers = new AxiosHeaders();

  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  return headers;
};

export const normalformateDate = (date: string) => {
  const D = new Date(date);
  const month =
    D.getMonth() + 1 < 10 ? `0${D.getMonth() + 1}` : `${D.getMonth() + 1}`;
  const dateMain = D.getDate() < 10 ? `0${D.getDate()}` : `${D.getDate()}`;
  const year = D.getFullYear();
  const result = year + '/' + month + '/' + dateMain;
  return result;
};

export const normalFormateDateTime = (date: string) => {
  const dateResult = moment(date);
  const result = dateResult.format('MM/DD/YYYY hh:mm a');
  return result;
};

export const handleUrl = async (url: string) => {
  Linking.canOpenURL(url)
    .then(async supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    })
    .catch(e => {
      console.log('eeee', e);
    });
};

export const showToast = async (msg: string) => {
  alert(`${msg}`);
};

export const isDateValid = (date: any) => {
  return date instanceof Date && !isNaN(date.valueOf());
};

export const share = async (message: any) => {
  try {
    const messageInfo = `${message}\n\nhttps://tamara.tech`;
    const result = await Share.share({
      message: messageInfo,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};

export const getImageUrl = (imageName: any) => {
  return `${ApiConfig.photoBaseUrl}${imageName}.jpg?time=${new Date()}`;
};
