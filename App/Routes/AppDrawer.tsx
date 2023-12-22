import React from 'react';
import Home from '@Components/Home/Home';
import AppImages from '@Theme/AppImages';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutUs from '@Components/AboutUs/AboutUs';
import CustomDrawer from '@Routes/CustomDrawer';
import History from '@Components/History/History';
import TermsAndCondition from '@Components/TermsAndCondition/TermsAndCondition';
import FeedBack from '@Components/FeedBack/FeedBack';
import ChangePassword from '@Components/ChangePassword/ChangePassword';
import { Route } from '@Routes/AppRoutes';
import Profile from '@Components/Profile/Profile';
import SubscriptionPlan from '@Components/SubscriptionPlan/SubscriptionPlan';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const drawer = [
    {
      title: Route.HomeScreen,
      icon: AppImages.home,
      screen: Home,
      name: Route.HomeScreen,
    },
    {
      title: Route.HistoryScreen,
      icon: AppImages.search,
      screen: History,
      name: Route.HistoryScreen,
    },
    {
      title: Route.AboutUsScreen,
      icon: AppImages.search,
      screen: AboutUs,
      name: Route.AboutUsScreen,
    },
    {
      title: Route.TermsAndConditionScreen,
      icon: AppImages.search,
      screen: TermsAndCondition,
      name: Route.TermsAndConditionScreen,
    },
    {
      title: Route.FeedBackScreen,
      icon: AppImages.search,
      screen: FeedBack,
      name: Route.FeedBackScreen,
    },
    {
      title: Route.ChangePasswordScreen,
      icon: AppImages.search,
      screen: ChangePassword,
      name: Route.ChangePasswordScreen,
    },
    {
      name: Route.Profile,
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    {
      name: Route.SubscriptionPlanScreen,
      screen: SubscriptionPlan,
      navigationOptions: {
        headerShown: false,
      },
    },
  ];
  const renderDrawer = (props: any) => {
    return <CustomDrawer {...props} />;
  };

  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerPosition: 'right',
        drawerStyle: {
          width: 300,
          backgroundColor: 'transparent',
        },
      }}
      drawerContent={renderDrawer}>
      {drawer.map((item, index) => {
        return (
          <Drawer.Screen key={index} name={item.name} component={item.screen} />
        );
      })}
    </Drawer.Navigator>
  );
};

export { AppDrawer };
