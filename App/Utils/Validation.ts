import {
  checkPassword,
  isValidEmail,
  validatePhoneNumber,
} from '@Utils/Helper';

export const ValidationMessage = () => {
  const errorMessage = {
    errorName: 'ERROR_NAME',
    errorEmail: 'ERROR_EMAIL',
    errorEmailFormat: 'ERROR_EMAIL_FORMAT',
    errorPassword: 'ERROR_PASSWORD',
    errorNewPassword: 'ERROR_NEW_PASSWORD',
    errorPasswordFormat: 'ERROR_PASSWORD_FORMAT',
    errorConfirmPassword: 'ERROR_CONFIRM_PASSWORD',
    errorPasswordNotMatchCp: 'ERROR_PASSWORD_NOT_MATCH_CP',
    errorPasswordNewPasswordCanNotBeSame:
      'ERROR_PASSWORD_NEW_PASSWORD_CAN_NOT_BE_SAME',
    errorPhone: 'ERROR_PHONE_NUMBER',
    errorPhoneFormate: 'ERROR_PHONE_NUMBER_FORMAT',
    errorDob: 'ERROR_DOB',
    errorGender: 'ERROR_GENDER',
  };
  return errorMessage;
};

export const signUpValidation = (data: any) => {
  let isValid = true;
  let error: any = {};
  if (!data?.name) {
    isValid = false;
    error.name = true;
    error.nameErrorMessage = ValidationMessage().errorName;
  }
  if (!data.email) {
    isValid = false;
    error.email = true;
    error.emailErrorMessage = ValidationMessage().errorEmail;
  }
  if (!data.password) {
    isValid = false;
    error.password = true;
    error.passwordErrorMessage = ValidationMessage().errorPassword;
  }
  if (!data.confirmPassword) {
    isValid = false;
    error.confirmPassword = true;
    error.confirmPasswordErrorMessage =
      ValidationMessage().errorConfirmPassword;
  }

  if (data?.email && !isValidEmail(data.email)) {
    isValid = false;
    error.email = true;
    error.emailErrorMessage = ValidationMessage().errorEmailFormat;
  }

  if (data?.password && !checkPassword(data.password)) {
    isValid = false;
    error.password = true;
    error.passwordErrorMessage = ValidationMessage().errorPasswordFormat;
  }

  if (data?.confirmPassword && !checkPassword(data.confirmPassword)) {
    isValid = false;
    error.confirmPassword = true;
    error.confirmPasswordErrorMessage = ValidationMessage().errorPasswordFormat;
  }

  if (
    data?.password &&
    data.confirmPassword &&
    data.password !== data.confirmPassword
  ) {
    isValid = false;
    error.confirmPassword = true;
    error.confirmPasswordErrorMessage =
      ValidationMessage().errorPasswordNotMatchCp;
  }
  return { isValid, error };
};

export const loginValidation = (data: any) => {
  let isValid = true;
  let error: any = {};
  if (!data.email) {
    isValid = false;
    error.email = true;
    error.emailErrorMessage = ValidationMessage().errorEmail;
  }
  if (!data.password) {
    isValid = false;
    error.password = true;
    error.passwordErrorMessage = ValidationMessage().errorPassword;
  }

  if (data?.email && !isValidEmail(data.email)) {
    isValid = false;
    error.email = true;
    error.emailErrorMessage = ValidationMessage().errorEmailFormat;
  }

  if (data?.password && !checkPassword(data.password)) {
    isValid = false;
    error.password = true;
    error.passwordErrorMessage = ValidationMessage().errorPasswordFormat;
  }
  return { isValid, error };
};

export const forgotPasswordValidation = (data: any) => {
  let isValid = true;
  let error: any = {};
  if (!data.email) {
    isValid = false;
    error.email = true;
    error.emailErrorMessage = ValidationMessage().errorEmail;
  }
  if (data?.email && !isValidEmail(data.email)) {
    isValid = false;
    error.email = true;
    error.emailErrorMessage = ValidationMessage().errorEmailFormat;
  }
  return { isValid, error };
};

export const UpdateProfileValidation = (data: any) => {
  let isValid = true;
  let error: any = {};
  if (!data?.name) {
    isValid = false;
    error.name = true;
    error.nameErrorMessage = ValidationMessage().errorName;
  }
  if (data?.phone && !validatePhoneNumber(data.phone)) {
    isValid = false;
    error.phone = true;
    error.phonErrorMessage = ValidationMessage().errorPhoneFormate;
  }
  return { isValid, error };
};
export const changePasswordValidation = (data: any) => {
  let isValid = true;
  let error: any = {};
  if (!data.password) {
    isValid = false;
    error.password = true;
    error.passwordErrorMessage = ValidationMessage().errorPassword;
  }

  if (!data.newPassword) {
    isValid = false;
    error.newPassword = true;
    error.newPasswordErrorMessage = ValidationMessage().errorNewPassword;
  }
  if (!data.confirmPassword) {
    isValid = false;
    error.confirmPassword = true;
    error.confirmPasswordErrorMessage =
      ValidationMessage().errorConfirmPassword;
  }

  if (data?.password && !checkPassword(data.password)) {
    isValid = false;
    error.password = true;
    error.passwordErrorMessage = ValidationMessage().errorPasswordFormat;
  }

  if (data?.newPassword && !checkPassword(data.newPassword)) {
    isValid = false;
    error.password = true;
    error.newPasswordErrorMessage = ValidationMessage().errorPasswordFormat;
  }

  if (data?.confirmPassword && !checkPassword(data.confirmPassword)) {
    isValid = false;
    error.confirmPassword = true;
    error.confirmPasswordErrorMessage = ValidationMessage().errorPasswordFormat;
  }

  if (
    data?.newPassword &&
    data.confirmPassword &&
    data.newPassword !== data.confirmPassword
  ) {
    isValid = false;
    error.confirmPassword = true;
    error.confirmPasswordErrorMessage =
      ValidationMessage().errorPasswordNotMatchCp;
  }

  if (
    data?.newPassword &&
    data.confirmPassword &&
    data.newPassword === data.password
  ) {
    isValid = false;
    error.confirmPassword = true;
    error.confirmPasswordErrorMessage =
      ValidationMessage().errorPasswordNewPasswordCanNotBeSame;
  }
  return { isValid, error };
};
