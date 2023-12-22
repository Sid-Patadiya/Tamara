import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance, Alert } from 'react-native';
import { omit } from 'lodash';
import * as RNLocalize from 'react-native-localize';
import translations, {
  DEFAULT_LANGUAGE,
  Translation,
} from '@Localization/index';
import { AppThemeType, DEFAULT_THEME, Theme, ThemeType } from '@Theme/index';
import {
  setItemInStorage,
  getItemFromStorage,
  getUserInfoStorage,
  setUserInfoStorage,
  removeStoreItem,
  clearStorage,
  getGuestUserStorage,
  setGuestUserStorage,
} from '@Utils/Storage';
import {
  deleteUser,
  getUserDetailService,
  socialLoginService,
} from '@Services/UserService';
import { Authentication, ThemeEnums } from '@Utils/Enums';
import { Route } from '@Routes/AppRoutes';
import { userLogout } from '@Actions/UserActions';
import { useDispatch } from 'react-redux';
import NavigationService from '@Services/NavigationService';
import { showToast } from '@Utils/Helper';
import { ApiConfig } from '@ApiConfig/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { AppleRequestOperation, appleAuth } from '@invertase/react-native-apple-authentication';

const APP_LANGUAGE = 'appLanguage';
const APP_THEME = 'appTheme';

export interface AppContextInterface {
  translations: Translation;
  setAppLanguage: (language: string) => void;
  appLanguage: string;
  initializeAppLanguage: () => void;
  appTheme: AppThemeType;
  initializeAppTheme: () => void;
  setAppTheme: (theme?: string) => void;
  userDetail: any;
  setUserDetail: any;
  setLogin: any;
  setLogout: any;
  guestUser: any;
  setGuestUser: any;
  updateUserProfile: any;
  socialLogin: any;
  onLogout: any;
  deleteAccount: any;
}

export const AppContext: Context<AppContextInterface> = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
  appTheme: DEFAULT_THEME,
  initializeAppTheme: () => {},
  setAppTheme: () => {},
  userDetail: '',
  setUserDetail: () => {},
  setLogin: () => {},
  setLogout: () => {},
  guestUser: false,
  setGuestUser: () => {},
  updateUserProfile: () => {},
  socialLogin: () => {},
  onLogout: () => {},
  deleteAccount: () => {},
}) as any;

interface CustomProps {
  children: JSX.Element;
}
export const AppContextProvider = (props: CustomProps) => {
  const { translations } = useContext(AppContext);
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
  const [appTheme, setAppTheme] = useState(DEFAULT_THEME);
  const [isInit, setIsInit] = useState(true);
  const [userInfo, setUserInfo] = useState('');
  const [guestUser, setGuestUser] = useState<boolean>(false);
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setInitialLoad();
  });

  const setInitialLoad = async () => {
    if (isInit) {
      setIsInit(false);
      await initializeAppTheme();
      await initializeAppLanguage();
      await initializeUserInfo();
    }
  };

  const initializeUserInfo = async () => {
    const userInfo = await getUserInfoStorage();
    setUserInfo(userInfo);
    const guestUserInfo = await getGuestUserStorage();
    setGuestUser(guestUserInfo);
    userInfo && (await updateUserProfile());
  };

  const setUserDetail = async (userDetail: any) => {
    setUserInfo(userDetail);
  };

  const routeAfterLogin = (OnboardingStatus: any) => {
    if (!OnboardingStatus) {
      NavigationService.resetNavigator(Route.GetStartedScreen);
    } else {
      NavigationService.resetNavigator(Route.MainScreen);
    }
  };

  const updateUserProfile = async () => {
    try {
      const response = await getUserDetailService();
      if (response?.data) {
        const user = response.data;
        setUserInfo(user);
        setUserInfoStorage(user);
        setGuestUser(false);
        await removeStoreItem(Authentication.GUEST_USER);
      }
    } catch (error) {}
  };

  const socialLogin = async (params: any) => {
    try {
      const response = await socialLoginService(params);
      if (response.data) {
        setLogin(response.data);
      } else {
        showToast(response?.message);
        const accessToken = await AccessToken.getCurrentAccessToken();
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();

        // await appleAuth.onCredentialRevoked(async (data: any) => {
        //   console.log('data', data);
        // });
        // await appleAuth.performRequest({
        //   requestedOperation: appleAuth.Operation.LOGOUT
        // })
        // If the user is logged in, proceed with the logout process
        if (accessToken) {
          await LoginManager.logOut();
        } else {
          console.log('User is not logged in to Facebook');
        }
      }
    } catch (error: any) {
      showToast(error?.response?.data?.data);
      const accessToken = await AccessToken.getCurrentAccessToken();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await appleAuth.performRequest({
      //   requestedOperation: appleAuth.Operation.LOGOUT,
      // });
      // If the user is logged in, proceed with the logout process
      if (accessToken) {
        await LoginManager.logOut();
      } else {
        console.log('User is not logged in to Facebook');
      }
    }
  };

  const setLogin = async (data: any) => {
    try {
      const { token, OnboardingStatus } = data;
      console.log('token-->',token)
      await setItemInStorage(Authentication.TOKEN, token);
      const response = await getUserDetailService();
      if (response?.data) {
        const user = response.data;
        setUserInfo(user);
        setUserInfoStorage(user);
        setGuestUser(false);
        await removeStoreItem(Authentication.GUEST_USER);
        routeAfterLogin(OnboardingStatus);
      } else {
        showToast(response?.message);
      }
    } catch (error: any) {
      showToast(error?.response?.data?.data);
    }
  };

  const setGuestUserInfo = async () => {
    try {
      await setGuestUserStorage();
      setGuestUser(true);
      NavigationService.resetNavigator(Route.MainScreen);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    Alert.alert(
      '',
      translations.WANT_TO_LOGOUT,
      [
        {
          text: translations.NO,
          style: 'cancel',
        },
        {
          text: translations.YES,
          style: 'destructive',
          onPress: onLogout,
        },
      ],
      { cancelable: true },
    );
  };

  const onLogout = async () => {
    ApiConfig.token = null;
    await removeStoreItem(Authentication.TOKEN);
    await removeStoreItem(Authentication.USER_INFO);
    // await clearStorage();
    setUserDetail('');
    dispatch(userLogout());

    NavigationService.resetNavigator(Route.LoginScreen);
    const accessToken = await AccessToken.getCurrentAccessToken();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // await appleAuth.performRequest({
    //   requestedOperation: appleAuth.Operation.LOGOUT,
    // });
    // If the user is logged in, proceed with the logout process
    if (accessToken) {
      await LoginManager.logOut();
    } else {
      console.log('User is not logged in to Facebook');
    }
  };

  const setLanguage = (language?: string) => {
    translations.setLanguage(language!);
    setAppLanguage(language!);
    setItemInStorage(APP_LANGUAGE, language!);
  };

  const initializeAppLanguage = async (languageCode = null) => {
    const defaultLanguage = RNLocalize.getLocales()[0]?.languageCode;

    const supportedLocaleCodes = translations.getAvailableLanguages();

    const getDefult = supportedLocaleCodes.filter(
      item => item === defaultLanguage,
    );

    setItemInStorage(
      APP_LANGUAGE,
      getDefult.length === 0 ? 'en' : getDefult[0],
    );

    const currentLanguage = await getItemFromStorage(APP_LANGUAGE);
    setLanguage(currentLanguage!);
    // if (!currentLanguage && !languageCode) {
    //   let localeCode = DEFAULT_LANGUAGE;

    //   const supportedLocaleCodes = translations.getAvailableLanguages();

    //   const phoneLocaleCodes = RNLocalize.getLocales().map(
    //     locale => locale.languageCode,
    //   );

    //   phoneLocaleCodes.some(code => {
    //     if (supportedLocaleCodes.includes(code)) {
    //       localeCode = code;
    //       return true;
    //     }
    //   });
    //   setLanguage(localeCode);
    // } else {
    //   if (languageCode) {
    //     setLanguage(languageCode);
    //     setItemInStorage(APP_LANGUAGE, languageCode);
    //   } else {
    //     setLanguage(currentLanguage!);
    //   }
    // }
  };

  const setTheme = (theme?: string) => {
    // ADD this 2 lines if want to make effect
    // setAppTheme(theme!);
    // setItemInStorage(APP_THEME, theme!);
  };

  const initializeAppTheme = async (themeType?: string) => {
    // REMOVE this 2 lines if want to make effect
    setAppTheme(ThemeEnums.LIGHT);
    setItemInStorage(APP_THEME, ThemeEnums.LIGHT);
    // const currentTheme = await getItemFromStorage(APP_THEME);
    // if (!currentTheme && !themeType) {
    //   const colorScheme = Appearance.getColorScheme();
    //   setAppTheme((colorScheme && colorScheme) || DEFAULT_THEME);
    // } else {
    //   if (themeType) {
    //     setAppTheme(themeType);
    //     setItemInStorage(APP_THEME, themeType);
    //   } else {
    //     setAppTheme(currentTheme!);
    //   }
    // }
  };

  const deleteAccount = () => {
    Alert.alert(
      '',
      translations.ARE_YOU_WANT_TO_DELETE,
      [
        {
          text: translations.NO,
          style: 'cancel',
        },
        {
          text: translations.YES,
          style: 'destructive',
          onPress: onDeleteAccount,
        },
      ],
      { cancelable: true },
    );
  };

  const onDeleteAccount = async () => {
    try {
      const res = await deleteUser();
      console.log('res~~~', res);
      if (res?.data) {
        showToast(res?.data);

        onLogout();
      }
    } catch (error: any) {
      showToast(error?.response?.data?.data);
      console.log(error, error?.response);
    }
  };

  return (
    <AppContext.Provider
      value={{
        translations: omit(translations, ['_props', '_opts']) as Translation,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
        appTheme: Theme[appTheme as keyof ThemeType],
        setAppTheme: setTheme,
        initializeAppTheme,
        userDetail: userInfo,
        setUserDetail: setUserDetail,
        setLogin: setLogin,
        setLogout: logout,
        guestUser: guestUser,
        setGuestUser: setGuestUserInfo,
        updateUserProfile: updateUserProfile,
        socialLogin: socialLogin,
        onLogout: onLogout,
        deleteAccount: deleteAccount,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
