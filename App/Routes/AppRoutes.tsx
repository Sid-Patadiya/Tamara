import InitialScreen from '@Components/Initial';
import Login from '@Components/Auth/Login/Login';
import { AppDrawer } from '@Routes/AppDrawer';
import SignUp from '@Components/Auth/SignUp/SignUp';
import GetStarted from '@Components/Auth/GetStarted/GetStarted';
import OtpVerificationScreen from '@Components/Auth/OtpVerification/OtpVerificationScreen';
import ForgotPasswordScreen from '@Components/Auth/ForgotPassword/ForgotPassword';
import Chat from '@Components/Chat/Chat';
import OnBoarding from '@Components/OnBoarding/OnBoarding';

enum Route {
  InitialScreen = 'InitialScreen',
  OnBoarding = 'OnBoarding',
  LoginScreen = 'Login',
  SignUpScreen = 'SignUpScreen',
  GetStartedScreen = 'GetStartedScreen',
  MainScreen = 'MainScreen',
  HomeScreen = 'HomeScreen',
  HistoryScreen = 'HistoryScreen',
  AboutUsScreen = 'AboutUsScreen',
  TermsAndConditionScreen = 'TermsAndConditionScreen',
  FeedBackScreen = 'FeedBackScreen',
  ChangePasswordScreen = 'ChangePasswordScreen',
  OtpVerificationScreen = 'OtpVerificationScreen',
  ForgotPasswordScreen = 'ForgotPasswordScreen',
  Profile = 'Profile',
  ChatScreen = 'ChatScreen',
  SubscriptionPlanScreen = 'SubscriptionPlanScreen',
}

const Routes = [
  {
    name: Route.InitialScreen,
    screen: InitialScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.OnBoarding,
    screen: OnBoarding,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.LoginScreen,
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.SignUpScreen,
    screen: SignUp,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.GetStartedScreen,
    screen: GetStarted,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.MainScreen,
    screen: AppDrawer,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.ChatScreen,
    screen: Chat,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.OtpVerificationScreen,
    screen: OtpVerificationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.ForgotPasswordScreen,
    screen: ForgotPasswordScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export { Routes, Route };
