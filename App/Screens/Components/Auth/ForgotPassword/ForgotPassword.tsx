import { AppContext } from '@AppContext/index';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import {
  AppViewHoc,
  AssetImage,
  CustomText,
  ErrorMessage,
  TextInputComponent,
} from '@CommonComponent/index';
import { useNavigation } from '@react-navigation/native';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import ThemeColor from '@Theme/Colors';
import { GradientButton, OtpInputBox, TextButton } from '@SubComponents/index';
import { Space, spaceType } from '@CommonComponent/Space';
import { goToNextScreen } from '@Utils/Helper';
import LinearGradient from 'react-native-linear-gradient';
import { forgotPasswordValidation } from '@Utils/Validation';
import { Route } from '@Routes/AppRoutes';
import {
  forgotPasswordService,
  otpVerifyService,
  resendOtpService,
} from '@Services/UserService';
import { showToast } from '@Utils/Helper';

const ForgotPasswordScreen = () => {
  const { appTheme, translations } = useContext(AppContext);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: __DEV__ ? 'himanshi@yopmail.com' : '',
    otp: '',
    isProcessing: false,
    showTimerText: false,
    showOtpTextBox: false,
  });
  const [error, setError] = useState<any>({});
  const { marginTop, container, text1, flexDirection, flex, underlineColor } =
    styles;
  const { email, otp, isProcessing, showOtpTextBox, showTimerText } = state;
  const refEmail = useRef<any>();

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const TimerStart = () => {
    setSeconds(59);
    setState({
      ...state,
      showTimerText: true,
      showOtpTextBox: true,
      isProcessing: false,
    });
  };

  const resendOtp = async () => {
    try {
      const params = {
        email,
      };
      const response = await resendOtpService(params);
      showToast(response?.data);
      TimerStart();
    } catch (err: any) {
      console.log('resendOtp err', err);
    }
  };

  const checkValidation = () => {
    Keyboard.dismiss();
    const validation = forgotPasswordValidation(state);
    if (validation.isValid) {
      manageProcessing(true);
      sendForgotPasswordEmail();
    } else {
      setError(validation.error);
    }
  };

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };

  const showOTPView = () => {
    TimerStart();
  };

  const sendForgotPasswordEmail = async () => {
    try {
      const params = {
        email,
      };
      const response = await forgotPasswordService(params);
      manageProcessing(false);
      if (response.data) {
        showToast(response.data);
        // showOTPView();
      } else {
        showToast(response.data);
      }
    } catch (err: any) {
      manageProcessing(false);
      setError({
        email: true,
        emailErrorMessage: err?.response?.data?.data,
      });
    }
  };

  const sendOtp = async () => {
    Keyboard.dismiss();
    if (otp.length === 6) {
      sendForgotPasswordOTP();
    } else {
      setError({
        otp: true,
        otpErrorMessage: translations.OTP_VERIFICATION2,
      });
    }
  };

  const sendForgotPasswordOTP = async () => {
    try {
      manageProcessing(true);
      const params = {
        email,
        otp,
      };
      const response = await otpVerifyService(params);
      manageProcessing(false);
      if (response.data) {
        showToast(response.data);
        goToNextScreen(navigation, Route.LoginScreen);
      } else {
        showToast(response.data);
      }
    } catch (err: any) {
      manageProcessing(false);
      setError({
        otp: true,
        otpErrorMessage: err?.response?.data?.data,
      });
    }
  };

  return (
    <AppViewHoc>
      <View style={[CommonStyle.outer]}>
        <AssetImage
          localImage
          source={AppImages.tamaraLogo}
          imageStyle={CommonStyle.tamaraLogo}
          resizeMode={'contain'}
        />
        <View style={container}>
          <Space type={spaceType.large} />
          <CustomText xxlarge24 style={[{ color: appTheme.whiteText }]}>
            {translations.FORGOT_PASSWORD_HEADERTEXT}
          </CustomText>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={appTheme.gradient}
            style={underlineColor}
          />
          <Space type={spaceType.extraLarge} />
          <TextInputComponent
            onChangeText={(text: string) => onChangeText(text, 'email')}
            value={email}
            autoCapitalize={'none'}
            placeholder={translations.FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            setRef={refEmail}
            editable={!showTimerText}
            leftImage={AppImages.email}
            viewStyle={[flexDirection, CommonStyle.alignItems]}
            style={[flex]}
            error={error?.email && error?.emailErrorMessage}
            onSubmitEditing={checkValidation}
          />
          <Space type={spaceType.normal} />
          {showTimerText === true && (
            <>
              {
                <CustomText
                  medium
                  style={[text1, { color: appTheme.whiteText }]}>
                  {` ${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${
                    seconds < 10 ? `0${seconds}` : `${seconds}`
                  }`}
                </CustomText>
              }
              <Space type={spaceType.normal} />
              <CustomText medium style={[text1, { color: appTheme.whiteText }]}>
                {translations.OTP_VERIFICATION1}
              </CustomText>

              <Space type={spaceType.normal} />
              <CustomText medium style={[text1, { color: appTheme.whiteText }]}>
                {translations.OTP_VERIFICATION2}
              </CustomText>
              <Space type={spaceType.large} />
              <OtpInputBox
                numberOfInputs={6}
                onChangeText={(code: any) => onChangeText(code, 'otp')}
                textInputStyle={{ color: appTheme.whiteText }}
              />
              {error.otp && <ErrorMessage error={error.otpErrorMessage} />}
              {showOtpTextBox && seconds === 0 && (
                <Space type={spaceType.normal} />
              )}
              {showOtpTextBox && seconds === 0 && (
                <TouchableOpacity onPress={resendOtp}>
                  <CustomText large style={[{ color: appTheme.themeColor }]}>
                    {translations.OTP_VERIFICATION_RESEND_TEXT}
                  </CustomText>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <GradientButton
          title={translations.OTP_VERIFICATION_BUTTON_TEXT}
          onPress={() => {
            showTimerText ? sendOtp() : checkValidation();
          }}
          isProcessing={isProcessing}
          exStyle={showTimerText && marginTop}
        />
        <Space type={spaceType.extraSmall} />
        <TextButton
          title={'Back to'}
          subTitle={'Login'}
          onSubTitle={() => {
            goToNextScreen(navigation, Route.LoginScreen);
          }}
        />
      </View>
    </AppViewHoc>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
  },
  marginTop: {
    marginTop: 30,
  },
  startedView: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 25,
  },
  emailText: {
    fontSize: 20,
    color: ThemeColor.primary,
    fontWeight: 'bold',
  },
  text1: {
    fontWeight: 'bold',
  },
  underlineColor: {
    width: '20%',
    height: 3,
    backgroundColor: 'red',
    alignSelf: 'center',
    top: 5,
  },
  container: {
    alignItems: 'center',
  },

  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});
