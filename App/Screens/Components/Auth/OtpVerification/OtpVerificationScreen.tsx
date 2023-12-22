import { AppContext } from '@AppContext/index';
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import {
  AppViewHoc,
  AssetImage,
  CustomText,
  ErrorMessage,
} from '@CommonComponent/index';
import { useNavigation } from '@react-navigation/native';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import ThemeColor from '@Theme/Colors';
import { GradientButton, OtpInputBox, TextButton } from '@SubComponents/index';
import { Space, spaceType } from '@CommonComponent/Space';
import { goToNextScreen } from '@Utils/Helper';
import LinearGradient from 'react-native-linear-gradient';
import { Route } from '@Routes/AppRoutes';
import { showToast } from '@Utils/Helper';
import { otpVerifyService, resendOtpService } from '@Services/UserService';

const OtpVerificationScreen = ({ route }: any) => {
  const { appTheme, translations } = useContext(AppContext);
  const { marginTop, container, text1, underlineColor } = styles;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const email = route?.params?.email;

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

  const verificationOtp = async () => {
    Keyboard.dismiss();
    if (otp.length !== 6) {
      setError(translations.OTP_VERIFICATION2);
      return;
    }
    try {
      const params = {
        email,
        otp,
      };
      const response = await otpVerifyService(params);
      if (response?.data) {
        showToast(response?.data);
        goToNextScreen(navigation, Route.LoginScreen);
      } else {
        showToast(response?.message);
      }
    } catch (err: any) {
      setError(err?.response?.data?.data || translations.SOME_THING_WENT_WRONG);
    }
  };

  const resendOtp = async () => {
    try {
      const params = {
        email,
      };
      const response = await resendOtpService(params);
      showToast(response?.data);
      setSeconds(59);
    } catch (err: any) {
      console.log('resendOtp err', err);
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
            {translations.OTP_VERIFICATION_NAME}
          </CustomText>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={appTheme.gradient}
            style={underlineColor}
          />
          <Space type={spaceType.extraLarge} />
          <CustomText large style={[{ color: appTheme.themeColor }]}>
            {`${email}`}
          </CustomText>
          <Space type={spaceType.normal} />
          <CustomText medium style={[text1, { color: appTheme.whiteText }]}>
            {` ${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${
              seconds < 10 ? `0${seconds}` : `${seconds}`
            }`}
          </CustomText>
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
            onChangeText={(code: any) => {
              setOtp(code);
              setError('');
            }}
            textInputStyle={{ color: appTheme.whiteText }}
          />
          {error && <ErrorMessage error={error} />}
          <Space type={spaceType.normal} />
          {seconds == 0 && (
            <TouchableOpacity onPress={resendOtp}>
              <CustomText large style={[{ color: appTheme.themeColor }]}>
                {translations.OTP_VERIFICATION_RESEND_TEXT}
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
        <GradientButton
          title={translations.OTP_VERIFICATION_BUTTON_TEXT}
          onPress={() => {
            verificationOtp();
          }}
          exStyle={marginTop}
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

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 50,
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
  OtpInputStyle: {
    height: 35,
    width: 40,
    backgroundColor: 'black',
    margin: 4,
    textAlign: 'center',
    fontSize: 13,
    borderRadius: 5,
    fontWeight: 'bold',
    borderColor: 'white',
    borderWidth: 1.5,
  },
});
