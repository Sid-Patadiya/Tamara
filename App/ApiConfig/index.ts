import Config from 'react-native-config';

const productionUrl = Config.API_URL;

const developmentUrl = Config.API_TEST_URL;

const ENVIRONMENT = {
  PROD: 'PROD',
  DEV: 'DEV',
};

const currentEnv = ENVIRONMENT.DEV;

const photoBaseUrl = 'https://d2bwgt7ttosx3l.cloudfront.net/';
const termsAndConditionUrl =
  'https://www.tamara.tech/terms-and-conditions.html';
const aboutUsUrl = 'https://www.tamara.tech/about-us.html';

// const baseUrl =
//   (currentEnv === ENVIRONMENT.PROD && productionUrl) || developmentUrl;

const baseUrl = __DEV__ ? 'https://test.tamara.tech/' : 'http://3.17.71.36/';
// const baseUrl = __DEV__ ? 'https://test.tamara.tech/' : 'https://test.tamara.tech/';


console.log('__DEV__', __DEV__)
console.log('baseUrl', baseUrl)
// const baseUrl = 'http://3.17.71.36/';

const baseUrlApi = `${baseUrl}api/`;

let ApiConfig = {
  baseUrlApi,
  token: null,
  baseUrl: '',
  photoBaseUrl,
  termsAndConditionUrl,
  aboutUsUrl,

  // AUTH
  login: `${baseUrlApi}user/login`,
  signUp: `${baseUrlApi}user/signup`,
  socialSignUp: `${baseUrlApi}user/social-signup`,
  otpVerify: `${baseUrlApi}user/otp/verify`,
  resendOtp: `${baseUrlApi}user/resend-otp`,
  forgotPassword: `${baseUrlApi}user/forgot-password`,
  changePassword: `${baseUrlApi}user/change-password`,

  // USER Detail
  userDetails: `${baseUrlApi}user/details`,
  onBoardingStatus: `${baseUrlApi}user/updateOnboarding`,
  updateProfile: `${baseUrlApi}user/updateprofile`,
  changeUserAvatar: `${baseUrlApi}user/upload-image`,

  // Home Category
  homeCategory: `${baseUrlApi}categories`,

  // FeedBack
  feedBack: `${baseUrlApi}user/feedback`,
  purchaseToken: `${baseUrlApi}user/orders`,

  // Chats
  getChat: `${baseUrlApi}user/messagelist`, // for message list
  sendMessage: `${baseUrlApi}chat/reply/first`, // for message list
  messageAction: `${baseUrlApi}user/`, // for message Action like, dislike, translate
  historyList: `${baseUrlApi}user/savedmessage-list`, // for history list
  deleteAccount: `${baseUrlApi}user/deleteaccount`, //for deleting current account
  checkredability: `${baseUrlApi}user/checkredability`, // for redability score 
  //SUBSCRIPTION
  subscription: `${baseUrlApi}user/orders`,
  subscriptionplan: `${baseUrlApi}user/subscription-plan`

};
export { ApiConfig };
