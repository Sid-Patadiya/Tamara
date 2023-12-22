import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  BackHandler,
  Linking,
} from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '@AppContext/index';
import {
  AppViewHoc,
  AssetImage,
  CustomText,
  Divider,
  SocialIcon,
  TextInputComponent,
  dividerSizeDefault,
} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { GradientButton, TextButton } from '@SubComponents/index';
import { Route } from '@Routes/AppRoutes';
import { goToNextScreen, showToast } from '@Utils/Helper';
import { Space, spaceType } from '@CommonComponent/Space';
import { GradientDivider } from '@CommonComponent/Divider';
import { loginValidation } from '@Utils/Validation';
import { loginService } from '@Services/UserService';
import {
  appleSignIn,
  onFacebookButtonPress,
  onGoogleButtonPress,
  onTwitterButtonPress,
} from '@Services/SocialLoginService';
import { signUpType } from '@Utils/Constant';
import VersionCheck from 'react-native-version-check';
import appleAuth, {
  AppleCredentialState,
  AppleRequestOperation,
} from '@invertase/react-native-apple-authentication';
import { getObjectFromStore, setObjectInStore } from '@Utils/Storage';

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 25,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});

const Login = () => {
  const { appTheme, translations, setLogin, setGuestUser, socialLogin } =
    useContext(AppContext);
  const navigation = useNavigation();

  const { title, btnText, marginTop, flexDirection, flex } = styles;

  const refEmail = useRef<any>();
  const refPassword = useRef<any>();

  const [state, setState] = useState({
    email: __DEV__ ? 'sid1@yopmail.com' : '',
    password: __DEV__ ? 'Test@123' : '',
    isSecureTextEntry: true,
    isProcessing: false,
  });

  const [error, setError] = useState<any>({});

  const { email, password, isSecureTextEntry, isProcessing } = state;

  const text = 'This is an example sentence.';

  // const readingEaseScore = textstat.report(text);
  // console.log(readingEaseScore);

  const checkUpdateNeeded = (updateNeeded: any) => {
    console.log('updateNeeded', updateNeeded);
    Alert.alert('', translations.UPDATE_LATEST, [
      {
        text: translations.UPDATE,
        onPress: () => {
          BackHandler.exitApp();
          updateNeeded?.storeUrl && Linking.openURL(updateNeeded?.storeUrl);
        },
      },
    ]);
  };

  const onSubmitEditing = (refName: any) => {
    if (refName) {
      refName.current.focus();
    }
  };

  const onChangeText = (text: string, type: string) => {
    setState({
      ...state,
      [type]: text,
    });
    setError({
      ...error,
      [type]: false,
    });
  };

  const onShowPassword = () => {
    setState({
      ...state,
      isSecureTextEntry: !isSecureTextEntry,
    });
  };

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };

  const checkValidation = () => {
    Keyboard.dismiss();
    const validation = loginValidation(state);
    if (validation.isValid) {
      onLogin();
    } else {
      setError(validation.error);
    }
  };

  const onLogin = async () => {
    let updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded && updateNeeded.isNeeded) {
      checkUpdateNeeded(updateNeeded);
    } else {
      try {
        manageProcessing(true);
        const response = await loginService({
          email,
          password,
          subscribed: 'true',
        });
        if (response?.data?.token) {
          setLogin(response.data);
          manageProcessing(false);
        } else {
          manageProcessing(false);
          showToast(response?.data);
        }
      } catch (err: any) {
        showToast(err?.response?.data?.data);
        manageProcessing(false);
      }
    }
  };

  const loginAsGuest = async () => {
    setGuestUser();
  };

  const SocialLogin = async (type: any) => {
    let updateNeeded = VersionCheck.needUpdate();

    if (updateNeeded && updateNeeded.isNeeded) {
      checkUpdateNeeded(updateNeeded);
    } else {
      // manageProcessing(true);
      if (type === 'Facebook') {
        manageProcessing(false);

        const response: any = await onFacebookButtonPress();
        if (response.name && response.email) {
          const params = {
            name: response?.name,
            email: response?.email,
            photo: '',
            signupfrom: signUpType.facebook,
            subscribed: 'true',
          };
          await socialLogin(params);
        }
      } else if (type === 'twitter') {
        // const response: any = await onTwitterButtonPress();
        console.log('twitter', type);
      } else if (type === 'google') {
        const response: any = await onGoogleButtonPress();
        if (true) {
          const params = {
            name: response.user?.name,
            email: response.user?.email,
            photo: '',
            signupfrom: signUpType.google,
            subscribed: 'true',
          };
          await socialLogin(params);
        }
      } else if (type === 'apple') {
        let response: any = await appleSignIn();
        if (response.email !== undefined) {
          await setObjectInStore('appleUserData', response);
        } else {
          const data = await getObjectFromStore('appleUserData');
          response = { email: data.email, name: data.name, token: data.token };
        }

        if (response) {
          const params = {
            name: response?.name,
            email: response?.email,
            photo: '',
            signupfrom: signUpType.apple,
            subscribed: 'true',
          };
          await socialLogin(params);
        }
      } else {
        console.log('Wrong option');
      }
      manageProcessing(false);
    }
  };

  const forgotPassword = async () => {
    let updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded && updateNeeded.isNeeded) {
      checkUpdateNeeded(updateNeeded);
    } else {
      goToNextScreen(navigation, Route.ForgotPasswordScreen);
    }
  };
  const createAccount = async () => {
    let updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded && updateNeeded.isNeeded) {
      checkUpdateNeeded(updateNeeded);
    } else {
      goToNextScreen(navigation, Route.SignUpScreen);
    }
  };

  return (
    <AppViewHoc>
      <View style={CommonStyle.outer}>
        <AssetImage
          localImage
          source={AppImages.tamaraLogo}
          imageStyle={CommonStyle.tamaraLogo}
          resizeMode={'contain'}
        />
        <CustomText xxlarge24 style={[title, { color: appTheme.whiteText }]}>
          {translations.SIGN_IN}
        </CustomText>
        <GradientDivider />
        <Space type={spaceType.large} />
        <TextInputComponent
          onChangeText={(text: string) => onChangeText(text, 'email')}
          value={email}
          autoCapitalize={'none'}
          placeholder={translations.EMAIL}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          setRef={refEmail}
          leftImage={AppImages.email}
          viewStyle={[flexDirection, CommonStyle.alignItems]}
          style={[flex]}
          error={error?.email && error?.emailErrorMessage}
          onSubmitEditing={() => onSubmitEditing(refPassword)}
        />
        <Space type={spaceType.small} />
        <TextInputComponent
          onChangeText={(text: string) => onChangeText(text, 'password')}
          value={password}
          autoCapitalize={'none'}
          placeholder={translations.PASSWORD}
          viewStyle={[flexDirection, CommonStyle.alignItems]}
          style={[flex]}
          leftImage={AppImages.password}
          secureTextEntry={isSecureTextEntry}
          returnKeyType={'done'}
          setRef={refPassword}
          onSubmitEditing={checkValidation}
          error={error?.password && error?.passwordErrorMessage}
          onShowPassword={onShowPassword}
        />
        <Space type={spaceType.extraSmall} />
        <TouchableOpacity onPress={forgotPassword}>
          <CustomText medium style={[btnText, { color: appTheme.whiteText }]}>
            {translations.FORGOT_PASSWORD}
          </CustomText>
        </TouchableOpacity>
        <GradientButton
          title={translations.SIGN_IN}
          isProcessing={isProcessing}
          onPress={checkValidation}
          exStyle={marginTop}
        />
        <Space type={spaceType.extraSmall} />
        <TextButton
          title={translations.DONAT_HAVE}
          subTitle={translations.CREATE_ACCOUNT}
          onSubTitle={createAccount}
        />
        <Space type={spaceType.normal} />
        <Divider
          text={translations.OR}
          dividerSize={dividerSizeDefault.divider2}
        />
        <Space type={spaceType.normal} />
        <SocialIcon
          onPress={(type: any) => {
            SocialLogin(type);
          }}
        />
        <Space type={spaceType.normal} />
        <Divider
          text={translations.OR}
          dividerSize={dividerSizeDefault.divider2}
        />
        <TextButton
          title={translations.LOGIN_AS}
          subTitle={translations.GUEST_USER}
          onSubTitle={loginAsGuest}
        />
      </View>
    </AppViewHoc>
  );
};

export default Login;
