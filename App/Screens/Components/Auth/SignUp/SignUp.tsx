import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
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
import { signUpValidation } from '@Utils/Validation';
import { signUpService } from '@Services/UserService';
import {
  appleSignIn,
  onFacebookButtonPress,
  onGoogleButtonPress,
} from '@Services/SocialLoginService';
import { signUpType } from '@Utils/Constant';

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

const SignUp = () => {
  const { appTheme, translations, setGuestUser, socialLogin } =
    useContext(AppContext);
  const navigation = useNavigation();

  const { title, marginTop, flexDirection, flex } = styles;
  const refName = useRef<any>();
  const refEmail = useRef<any>();
  const refPassword = useRef<any>();
  const refConfirmPassword = useRef<any>();

  const [state, setState] = useState({
    name: __DEV__ ? 'Harmeet' : '',
    email: __DEV__ ? 'harmeet@yopmail.com' : '',
    password: __DEV__ ? 'Test@123' : '',
    confirmPassword: __DEV__ ? 'Test@123' : '',
    isSecureTextEntry: true,
    confirmPasswordIsSecureTextEntry: true,
    isProcessing: false,
  });

  const [error, setError] = useState<any>({});

  const {
    name,
    email,
    password,
    confirmPassword,
    isSecureTextEntry,
    confirmPasswordIsSecureTextEntry,
    isProcessing,
  } = state;

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

  const onShowPassword = (key: any, value: any) => {
    setState({
      ...state,
      [key]: value,
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
    const validation = signUpValidation(state);
    if (validation.isValid) {
      onSignUp();
    } else {
      setError(validation.error);
    }
  };

  const onSignUp = async () => {
    try {
      manageProcessing(true);
      const params = {
        name,
        email,
        password,
        confirmPassword,
      };
      const response = await signUpService(params);
      manageProcessing(false);
      if (response?.data) {
        showToast(response?.data);
        goToNextScreen(navigation, Route.OtpVerificationScreen, { email });
      } else {
        showToast(response?.data);
      }
    } catch (err: any) {
      setError({
        email: true,
        emailErrorMessage: err?.response?.data?.data,
      });
      manageProcessing(false);
    }
  };

  const loginAsGuest = async () => {
    setGuestUser();
  };

  const SocialLogin = async (type: any) => {
    manageProcessing(true);
    if (type === 'Facebook') {
      const response: any = await onFacebookButtonPress();
      if (response.name && response.email) {
        const params = {
          name: response?.name,
          email: response?.email,
          photo: '',
          signupfrom: signUpType.facebook,
        };
        await socialLogin(params);
      }
    } else if (type === 'twitter') {
      console.log('twitter', type);
    } else if (type === 'google') {
      const response: any = await onGoogleButtonPress();
      if (response?.user) {
        const params = {
          name: response.user?.name,
          email: response.user?.email,
          photo: response.user?.photo ? response.user?.photo : '',
          signupfrom: signUpType.google,
        };
        await socialLogin(params);
      }
    } else if (type === 'apple') {
      const response: any = await appleSignIn();
      if (response) {
        const params = {
          name: response?.name,
          email: response?.email,
          photo: '',
          signupfrom: signUpType.apple,
        };
        await socialLogin(params);
      }
    } else {
      console.log('Wrong option');
    }
    manageProcessing(false);
  };

  return (
    <AppViewHoc removeKeyBoardAvoidView={false} >
      <View style={CommonStyle.outer}>
        <AssetImage
          localImage
          source={AppImages.tamaraLogo}
          imageStyle={CommonStyle.tamaraLogo}
          resizeMode={'contain'}
        />
        <CustomText xxlarge24 style={[title, { color: appTheme.whiteText }]}>
          {translations.CREATE_ACCOUNT}
        </CustomText>
        <GradientDivider />
        <Space type={spaceType.large} />
        <TextInputComponent
          onChangeText={(text: string) => onChangeText(text, 'name')}
          value={name}
          autoCapitalize={'sentences'}
          placeholder={translations.NAME}
          returnKeyType={'next'}
          setRef={refName}
          leftImage={AppImages.userInput}
          viewStyle={[flexDirection, CommonStyle.alignItems]}
          style={[flex]}
          error={error?.name && error?.nameErrorMessage}
          onSubmitEditing={() => onSubmitEditing(refEmail)}
        />
        <Space type={spaceType.small} />
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
          onSubmitEditing={() => onSubmitEditing(refConfirmPassword)}
          error={error?.password && error?.passwordErrorMessage}
          onShowPassword={() =>
            onShowPassword('isSecureTextEntry', !isSecureTextEntry)
          }
        />
        <Space type={spaceType.small} />
        <TextInputComponent
          onChangeText={(text: string) => onChangeText(text, 'confirmPassword')}
          value={confirmPassword}
          autoCapitalize={'none'}
          placeholder={translations.CONFIRM_PASSWORD}
          viewStyle={[flexDirection, CommonStyle.alignItems]}
          style={[flex]}
          leftImage={AppImages.password}
          secureTextEntry={confirmPasswordIsSecureTextEntry}
          returnKeyType={'done'}
          setRef={refConfirmPassword}
          onSubmitEditing={checkValidation}
          error={error?.confirmPassword && error?.confirmPasswordErrorMessage}
          onShowPassword={() =>
            onShowPassword(
              'confirmPasswordIsSecureTextEntry',
              !confirmPasswordIsSecureTextEntry,
            )
          }
        />
        <GradientButton
          title={translations.CREATE_ACCOUNT}
          isProcessing={isProcessing}
          onPress={checkValidation}
          exStyle={marginTop}
        />
        <Space type={spaceType.extraSmall} />
        <TextButton
          title={'Already have an account? '}
          subTitle={'Login'}
          onSubTitle={() => goToNextScreen(navigation, Route.LoginScreen)}
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
          title={'Login as a '}
          subTitle={'Guest user'}
          onSubTitle={loginAsGuest}
        />
      </View>
    </AppViewHoc>
  );
};

export default SignUp;
