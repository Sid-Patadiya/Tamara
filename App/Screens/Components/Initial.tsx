/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { DeviceEventEmitter, EmitterSubscription, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isLoggedIn } from '@Services/UserService';
import { Route } from '@Routes/AppRoutes';
import { goToNextScreen } from '@Utils/Helper';
import { getGuestUserStorage, getUserInfoStorage } from '@Utils/Storage';
import { AppContext } from '@AppContext/index';
import { Authentication } from '@Utils/Enums';
import { endInApp, initInApp } from '@CommonComponent/SubscriptionIAP';

const Initial = () => {
  const { setUserDetail, onLogout } = useContext(AppContext);
  const navigation = useNavigation();
  let isLogout: EmitterSubscription | null = null;

  useEffect(() => {
    isUserLogin();
    // initInApp();

    return ()=>{
      endInApp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (isLogout) {
  //     isLogout.remove();
  //   }

  //   isLogout = DeviceEventEmitter.addListener(
  //     Authentication.REDIRECT_LOGIN,
  //     onLogout,
  //   );
  // }, []);

  const isUserLogin = async () => {
    const checkIsGuestUser = await getGuestUserStorage();
    if (checkIsGuestUser) {
      goToNextScreen(navigation, Route.MainScreen);
    } else {
      const isUserLoggedIn = await isLoggedIn();
      const userInfo = await getUserInfoStorage();
      setUserDetail(userInfo);
      if (!isUserLoggedIn) {
        goToNextScreen(navigation, Route.OnBoarding);
        // goToNextScreen(navigation, Route.LoginScreen);
        return;
      }
      goToNextScreen(navigation, Route.MainScreen);
    }
  };

  return <View />;
};

export default Initial;
