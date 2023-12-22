import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';
import { en } from '@Localization/en';
import { de } from '@Localization/de';
import { hi } from '@Localization/hi';
import { ar } from '@Localization/ar';
import { be } from '@Localization/be';
import { fr } from '@Localization/fr';
import { gu } from '@Localization/gu';
import { ha } from '@Localization/ha';
import { id } from '@Localization/in';
import { it } from '@Localization/it';
import { ja } from '@Localization/ja';
import { jv } from '@Localization/jv';
import { ka } from '@Localization/ka';
import { ko } from '@Localization/ko';
import { ma } from '@Localization/ma';
import { po } from '@Localization/po';
import { pu } from '@Localization/pu';
import { ru } from '@Localization/ru';
import { sp } from '@Localization/sp';
import { sw } from '@Localization/sw';
import { ta } from '@Localization/ta';
import { te } from '@Localization/te';
import { th } from '@Localization/th';
import { tu } from '@Localization/tu';
import { ur } from '@Localization/ur';
import { vi } from '@Localization/vi';
export type Translation = {
  SETTINGS: string;
  LANGUAGE: string;
  THEME: string;
  DARK_MODE: string;
  SIGN_IN: string;
  LOG_OUT: string;
  LOGIN_AS: string;
  GUEST_USER: string;
  SUBSCRIPTION_PLAN: string;
  MONTHLY_SUBSCRIPTION_PLAN:string;
  REQUEST_HOUR:string;
  UNLIMITED_ACCESS:string;

  SAVED_HISTORY:string;
  DELETE_HISTORY:string;
  BUY_SUBSCRIPTION:string;
  PLAN_LIMIT_REACHED:string;
  PURCHASED_SUCCESSFULLY:string;
  ALREADY_PURCHASED:string;
  PURCHASED_FAILED:string;
  UPDATE_LATEST:string;
  WILL_BE_DELETED:string;
  WILL_BE_DELETED_FROM_HISTORY:string;
  ARE_YOU_WANT_TO_DELETE:string;
  WANT_TO_LOGOUT:string;

  CANCEL:string;
  DELETE:string;
  YES:string;
  NO:string;

  FORGOT_PASSWORD: string;
  OR: string;
  NAME: string;
  EMAIL: string;
  PASSWORD: string;
  NEW_PASSWORD: string;
  OLD_PASSWORD: string;
  CONFIRM_PASSWORD: string;
  DONAT_HAVE:string;
  CREATE_ACCOUNT: string;
  UPDATE: string;
  GET_STARTED: string;
  GET_STARTED1: string;
  GET_STARTED2: string;
  GET_STARTED3: string;
  GET_STARTED4: string;
  GET_STARTED5: string;
  TAMARA: string;
  HOME_CATEGORY1: string;
  HOME_CATEGORY2: string;
  HOME_CATEGORY3: string;
  HOME_CATEGORY4: string;
  OTP_VERIFICATION_NAME: string;
  OTP_VERIFICATION1: string;
  OTP_VERIFICATION2: string;
  OTP_VERIFICATION_BUTTON_TEXT: string;
  OTP_VERIFICATION_RESEND_TEXT: string;
  TERMS_AND_CONDITION_TEXT: string;
  BASIC_TERMS: string;
  PROFILE_TOKEN: string;
  WHAT_WE_DO: string;
  ABOUT_US_CONTENT: string;
  ABOUT_US_CONTENT1: string;
  TAMARA_URL: string;
  FEEDBACK_SUB_HEADER: string;
  FEEDBACK_INFO: string;
  FEEDBACK_NOTE: string;
  FEEDBACK_SEND: string;
  HISTORY_TEXT1: string;
  HISTORY_TEXT2: string;
  POPUPTEXT: string;
  POPUP_TEXTINPUT: string;
  POPUP_SAVE_TEXT: string;
  PROFILE_HEADER: string;

  // PlaceHolder
  INPUT_CHAT_PLACEHOLDER: string;

  //Empty list
  CHAT_EMPTY: string;

  // ERROR message
  ERROR_NAME: string;
  ERROR_EMAIL: string;
  ERROR_EMAIL_FORMAT: string;
  ERROR_PASSWORD: string;
  ERROR_NEW_PASSWORD: string;
  ERROR_PASSWORD_FORMAT: string;
  ERROR_CONFIRM_PASSWORD: string;
  ERROR_PASSWORD_NOT_MATCH_CP: string;
  PROFILE_BUTTON_TEXT: string;
  SUBSCRIPTION_PLAN_TEXT: string;
  PROFILE_PHONE_NO: string;
  PROFILE_DOB: string;
  PROFILE_GENDER: string;
  ERROR_PHONE_NUMBER: string;
  ERROR_PHONE_NUMBER_FORMAT: string;
  ERROR_DOB: string;
  ERROR_GENDER: string;
  FORGOT_PASSWORD_HEADERTEXT: string;
  FORGOT_PASSWORD_EMAIL_PLACEHOLDER_TEXT: string;
  SOME_THING_WENT_WRONG: string;
  FEEDBACK_ERROR_MESSAGE: string;
  ERROR_PASSWORD_NEW_PASSWORD_CAN_NOT_BE_SAME: string;

  // Header
  TERMS_AND_CONDITION: string;
  CHAT: string;

  // Drawer
  HOME: string;
  HISTORY: string;
  ABOUT_US: string;
  TERMS_AND_CONDITION_DRAWER: string;
  FEEDBACK: string;
  DELETE_ACCOUNT: string;
  CHANGE_PASSWORD: string;
};

const translations = {
  en,
  de,
  hi,
  ar,
  be,
  fr,
  gu,
  ha,
  id,
  it,
  ja,jv,ka,ko,ma,po,pu,ru,sp,sw,ta,te,th,tu,ur,vi
};

export default new LocalizedStrings(translations);
