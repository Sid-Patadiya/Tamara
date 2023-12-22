import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';
import { getItemFromStorage } from '@Utils/Storage';
import { Authentication } from '@Utils/Enums';

export const isLoggedIn = async () => {
  const token = await getItemFromStorage(Authentication.TOKEN);
  console.log('token~~~',token)
  if (!token) {
    return false;
  }
  ApiConfig.token = token;
  return true;
};

export const loginService = async (params: any) => {
  const response = await axios.post(ApiConfig.login, params);
  return response.data;
};

export const signUpService = async (params: any) => {
  const response = await axios.post(ApiConfig.signUp, params);
  return response.data;
};

export const socialLoginService = async (params: any) => {
  const response = await axios.post(ApiConfig.socialSignUp, params);
  return response.data;
};

export const otpVerifyService = async (params: any) => {
  const response = await axios.post(ApiConfig.otpVerify, params);
  return response.data;
};

export const resendOtpService = async (params: any) => {
  const response = await axios.post(ApiConfig.resendOtp, params);
  return response.data;
};

export const forgotPasswordService = async (params: any) => {
  const response = await axios.post(ApiConfig.forgotPassword, params);
  return response.data;
};

export const getUserDetailService = async () => {
  const response = await axios.get(ApiConfig.userDetails);
  return response.data;
};

export const updateProfileService = async (params: any) => {
  const response = await axios.post(ApiConfig.updateProfile, params);
  return response.data;
};

export const getHomeCategoryServices = async () => {
  const response = await axios.get(ApiConfig.homeCategory);
  return response.data;
};

export const setOnboardingStatusService = async (params: any) => {
  const response = await axios.post(ApiConfig.onBoardingStatus, params);
  return response.data;
};

export const changePasswordService = async (params: any) => {
  const response = await axios.post(ApiConfig.changePassword, params);
  return response.data;
};

export const deleteUser = async () => {
  const response = await axios.post(ApiConfig.deleteAccount);
  return response.data;
};

export const updateToken = async (params: any) => {
  const response = await axios.post(ApiConfig.purchaseToken,params);
  return response.data;
};

export const subscriptionService = async (params: any) => {
  const response = await axios.post(ApiConfig.subscription, params);
  return response.data;
};

export const subscriptionPlanDetils = async () => {
  const response = await axios.get(ApiConfig.subscriptionplan);
  return response.data;
};
