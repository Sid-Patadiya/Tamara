import { Alert, DeviceEventEmitter } from 'react-native';
import axios from 'axios';
import { configureUrl, getHeaders } from '@Utils/Helper';
import { removeStoreItem } from '@Utils/Storage';
import { Authentication } from '@Utils/Enums';
import { ApiConfig } from '@ApiConfig/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import NavigationService from '@Services/NavigationService';
import { Route } from '@Routes/AppRoutes';

axios.interceptors.request.use(
  async config => {
    let request = config;
    request.headers = await getHeaders();
    request.url = configureUrl(config.url!);
    // console.log('request-------------->', request.url);
    return request;
  },
  error => error,
);

axios.interceptors.response.use(
  async response => {
    return response;
  },
  error => {
    console.log('error--->', error?.response?.data?.message?.toLowerCase());
    console.log('User--->', 'User is Inactive'.toLocaleLowerCase());
    // Alert.alert(error?.response?.data?.data)
    if (
      error?.response?.data?.message?.toLowerCase() ===
      'invalid token'.toLocaleLowerCase()

    ) {
      handleInvalidToken();
    } else if (
      error?.response?.data?.message?.toLowerCase() ===
      'User is Inactive'.toLocaleLowerCase()
    ) {
      handleInvalidToken();
    }
    // if (error.response.status === 401) {
    //   handleInvalidToken();
    // }
    throw error;
  },
);

const handleInvalidToken = async () => {
  DeviceEventEmitter.emit(Authentication.REDIRECT_LOGIN);
  NavigationService.resetNavigator(Route.LoginScreen);

  await removeStoreItem(Authentication.TOKEN);
  await removeStoreItem(Authentication.USER_INFO);
  ApiConfig.token = null as any;
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
  // await appleAuth.performRequest({
  //   requestedOperation: appleAuth.Operation.LOGOUT,
  // });
  // If the user is logged in, proceed with the logout process
  const accessToken = await AccessToken.getCurrentAccessToken();

  if (accessToken) {
    await LoginManager.logOut();
  } else {
    console.log('User is not logged in to Facebook');
  }

};
