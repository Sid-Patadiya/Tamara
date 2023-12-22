import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import {
  AppHeader,
  AppViewHoc,
  KeyBoardAvoidViewHoc,
  TextInputComponent,
} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { Space, spaceType } from '@CommonComponent/Space';
import { GradientButton } from '@SubComponents/index';
import { changePasswordValidation } from '@Utils/Validation';
import { changePasswordService } from '@Services/UserService';
import { showToast } from '@Utils/Helper';

const styles = StyleSheet.create({
  image: {
    width: 190,
    height: 190,
  },
  view: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  textUrl: {
    fontWeight: '600',
  },
  marginTop: {
    marginTop: 25,
  },
});
const ChangePassword = ({ navigation }: any) => {
  const { translations } = useContext(AppContext);

  const [state, setState] = useState({
    password: __DEV__ ? 'thbSuZdx1*axA@z' : '',
    newPassword: __DEV__ ? 'Test@123' : '',
    confirmPassword: __DEV__ ? 'Test@123' : '',
    isSecurePassword: true,
    isSecureNewPassword: true,
    isSecureConfirmPassword: false,
    isProcessing: false,
  });

  const [error, setError] = useState<any>({});

  const refNewPassword = useRef<any>();
  const refPassword = useRef<any>();
  const refConfirmPassword = useRef<any>();

  const {
    password,
    newPassword,
    confirmPassword,
    isSecurePassword,
    isSecureNewPassword,
    isSecureConfirmPassword,
    isProcessing,
  } = state;

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

  const onSubmitEditing = (refName: any) => {
    if (refName) {
      refName.current.focus();
    }
  };

  const checkValidation = () => {
    Keyboard.dismiss();
    const validation = changePasswordValidation(state);
    if (validation.isValid) {
      onChangePassword();
    } else {
      setError(validation.error);
    }
  };

  const onChangePassword = async () => {
    try {
      manageProcessing(false);
      const params = {
        newPassword: newPassword,
        currentPassword: password,
      };
      const response = await changePasswordService(params);
      showToast(response?.data);
      if (response?.data) {
        setState({
          password: '',
          newPassword: '',
          confirmPassword: '',
          isSecurePassword: true,
          isSecureNewPassword: true,
          isSecureConfirmPassword: true,
          isProcessing: false,
        });
        setError({});
      }
    } catch (err: any) {
      showToast(err?.response?.data?.data);
      manageProcessing(false);
    }
  };

  return (
    <AppViewHoc removeKeyBoardAvoidView={true}>
      <View style={CommonStyle.flex1}>
        <AppHeader
          title={translations.CHANGE_PASSWORD}
          showDrawer={true}
          navigation={navigation}
        />
        <KeyBoardAvoidViewHoc addScrollView={true}>
          <View style={[CommonStyle.flex1, styles.view]}>
            <TextInputComponent
              onChangeText={(text: string) => onChangeText(text, 'password')}
              value={password}
              autoCapitalize={'none'}
              placeholder={translations.OLD_PASSWORD}
              viewStyle={[CommonStyle.rowDirection, CommonStyle.alignItems]}
              style={[CommonStyle.flex1]}
              leftImage={AppImages.password}
              secureTextEntry={isSecurePassword}
              returnKeyType={'done'}
              setRef={refPassword}
              onSubmitEditing={() => onSubmitEditing(refNewPassword)}
              error={error?.password && error?.passwordErrorMessage}
              onShowPassword={() =>
                onShowPassword('isSecurePassword', !isSecurePassword)
              }
            />
            <Space type={spaceType.small} />
            <TextInputComponent
              onChangeText={(text: string) => onChangeText(text, 'newPassword')}
              value={newPassword}
              autoCapitalize={'none'}
              placeholder={translations.NEW_PASSWORD}
              viewStyle={[CommonStyle.rowDirection, CommonStyle.alignItems]}
              style={[CommonStyle.flex1]}
              leftImage={AppImages.password}
              secureTextEntry={isSecureNewPassword}
              returnKeyType={'done'}
              setRef={refNewPassword}
              onSubmitEditing={() => onSubmitEditing(refConfirmPassword)}
              error={error?.newPassword && error?.newPasswordErrorMessage}
              onShowPassword={() =>
                onShowPassword('isSecureNewPassword', !isSecureNewPassword)
              }
            />
            <Space type={spaceType.small} />
            <TextInputComponent
              onChangeText={(text: string) =>
                onChangeText(text, 'confirmPassword')
              }
              value={confirmPassword}
              autoCapitalize={'none'}
              placeholder={translations.CONFIRM_PASSWORD}
              viewStyle={[CommonStyle.rowDirection, CommonStyle.alignItems]}
              style={[CommonStyle.flex1]}
              leftImage={AppImages.password}
              secureTextEntry={isSecureConfirmPassword}
              returnKeyType={'done'}
              setRef={refPassword}
              onSubmitEditing={() => onSubmitEditing(refNewPassword)}
              error={
                error?.confirmPassword && error?.confirmPasswordErrorMessage
              }
              onShowPassword={() =>
                onShowPassword(
                  'isSecureConfirmPassword',
                  !isSecureConfirmPassword,
                )
              }
            />
            <GradientButton
              title={translations.UPDATE}
              isProcessing={isProcessing}
              onPress={checkValidation}
              exStyle={styles.marginTop}
            />
          </View>
        </KeyBoardAvoidViewHoc>
      </View>
    </AppViewHoc>
  );
};

export default ChangePassword;
