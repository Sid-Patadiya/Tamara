import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@AppContext/index';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { Space, spaceType } from '@CommonComponent/Space';
import LinearGradient from 'react-native-linear-gradient';
import {
  AssetImage,
  CustomText,
  EditAvatar,
  KeyBoardAvoidViewHoc,
} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { Route } from '@Routes/AppRoutes';
import { isIOS, signUpType } from '@Utils/Constant';
import { getImageUrl, handleUrl } from '@Utils/Helper';
import { ApiConfig } from '@ApiConfig/index';
import VersionCheck from 'react-native-version-check';

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    alignSelf: 'center',
    height: isIOS ? 150 : 140,
    borderBottomLeftRadius: 10,
  },
  margin20: {
    margin: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  menuItemIcon: {
    width: 20,
    height: 18,
  },
  padding10: {
    padding: 10,
  },
  rightArrow: {
    width: 10,
    height: 10,
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  },
  loginBtn: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  loginTextStyle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

const CustomDrawer = (props: any) => {
  const {
    appTheme,
    translations,
    setLogout,
    userDetail,
    guestUser,
    deleteAccount,
  } = useContext(AppContext);
  const { navigation } = props;
  const [version, setVersion] = useState(null);

  useEffect(() => {
    (async () => {
      let updateNeeded = await VersionCheck.needUpdate();
      console.log('updateNeeded', updateNeeded);
      setVersion(updateNeeded.latestVersion);
    })();
  }, []);

  const navigateToRoute = (routeName: any) => {
    navigation.toggleDrawer();
    if (routeName === Route.TermsAndConditionScreen) {
      handleUrl(ApiConfig.termsAndConditionUrl);
    } else if (routeName === translations.DELETE_ACCOUNT) {
      deleteAccount();
    } else if (routeName === Route.AboutUsScreen) {
      handleUrl(ApiConfig.aboutUsUrl);
    } else if (routeName !== 'LogOutScreen') {
      navigation.navigate(routeName);
    } else {
      setLogout();
    }
  };

  const drawer = [
    {
      id: 1,
      name: translations.HOME,
      routeName: Route.HomeScreen,
      image: AppImages.drawerHome,
    },
    !guestUser && {
      id: 2,
      name: translations.HISTORY,
      routeName: Route.HistoryScreen,
      image: AppImages.drawerHistory,
    },
    {
      id: 3,
      name: translations.ABOUT_US,
      routeName: Route.AboutUsScreen,
      image: AppImages.drawerAboutUs,
    },
    {
      id: 4,
      name: translations.TERMS_AND_CONDITION_DRAWER,
      routeName: Route.TermsAndConditionScreen,
      image: AppImages.drawerTermsAndConditions,
    },
    {
      id: 5,
      name: translations.FEEDBACK,
      routeName: Route.FeedBackScreen,
      image: AppImages.drawerFeedback,
    },
    !guestUser &&
      userDetail.signuptype === signUpType.tamara && {
        id: 6,
        name: translations.CHANGE_PASSWORD,
        routeName: Route.ChangePasswordScreen,
        image: AppImages.drawerChangePassword,
      },
    !guestUser && {
      id: 9,
      name: translations.DELETE_ACCOUNT,
      routeName: translations.DELETE_ACCOUNT,
      image: AppImages.deleteWhite,
    },
    !guestUser && {
      id: 7,
      name: translations.SUBSCRIPTION_PLAN,
      routeName: Route.SubscriptionPlanScreen,
      image: AppImages.drawerDollar,
    },
    !guestUser && {
      id: 8,
      name: translations.LOG_OUT,
      routeName: 'LogOutScreen',
      image: AppImages.drawerLogout,
    },
  ];

  const renderMenuItem = (item: any, index: any) => {
    if (!item) {
      return null;
    }
    return (
      <View key={index}>
        <TouchableOpacity
          style={[styles.padding10]}
          onPress={() => navigateToRoute(item.routeName)}>
          <View style={[CommonStyle.rowAlignItems]}>
            <AssetImage
              isLoadFromLocal
              source={item.image}
              imageStyle={styles.menuItemIcon}
              resizeMode={'contain'}
            />
            <CustomText
              style={[
                CommonStyle.flex1,
                styles.marginHorizontal10,
                { color: appTheme.whiteText },
              ]}>{`${item.name}`}</CustomText>
            <AssetImage
              isLoadFromLocal
              source={AppImages.rightArrow}
              imageStyle={styles.rightArrow}
              resizeMode={'contain'}
            />
          </View>
          <View style={[{ backgroundColor: appTheme.lightText }]} />
        </TouchableOpacity>
        <Space type={spaceType.extraSmall} />
      </View>
    );
  };

  const renderGuestUserProfile = () => {
    return (
      <View style={[CommonStyle.rowAlignItems, styles.margin20]}>
        {!guestUser && (
          <AssetImage
            isLoadFromLocal
            source={AppImages.guestProfile}
            imageStyle={styles.avatar}
          />
        )}

        <View style={[CommonStyle.flex1, CommonStyle.marginHorizontal5]}>
          <TouchableOpacity
            onPress={() => navigateToRoute(Route.LoginScreen)}
            style={[styles.loginBtn, { borderColor: appTheme.whiteText }]}>
            <CustomText
              large
              style={[styles.loginTextStyle, { color: appTheme.whiteText }]}>
              {`${translations.SIGN_IN}`}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLoginUserProfile = () => {
    const source = userDetail?.profilePicture
      ? { uri: `${getImageUrl(userDetail?.profilePicture)}` }
      : AppImages.blankProfile;
    return (
      <View style={[CommonStyle.rowAlignItems, styles.margin20]}>
        <EditAvatar
          source={source}
          size={70}
          editPencilSize={20}
          onPress={() => navigateToRoute(Route.Profile)}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigateToRoute(Route.Profile)}
          style={[CommonStyle.flex1, CommonStyle.marginHorizontal5]}>
          <CustomText
            large
            numberOfLines={1}
            style={[{ color: appTheme.whiteText }]}>
            {`${userDetail?.name}`}
          </CustomText>
          <CustomText
            numberOfLines={1}
            medium
            style={[{ color: appTheme.whiteText }]}>
            {`${userDetail?.email}`}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[CommonStyle.flex1, { backgroundColor: appTheme.blackBg }]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={appTheme.gradient}
        style={styles.linearGradient}>
        <View style={[CommonStyle.flex1, CommonStyle.alignEnd]}>
          {guestUser ? renderGuestUserProfile() : renderLoginUserProfile()}
        </View>
      </LinearGradient>
      <Space type={spaceType.normal} />
      <View style={[styles.marginHorizontal10, CommonStyle.flex1]}>
        <KeyBoardAvoidViewHoc addScrollView={true}>
          {drawer.map((item, index) => renderMenuItem(item, index))}
        </KeyBoardAvoidViewHoc>
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: appTheme.whiteText,
          alignSelf: 'center',
          bottom: 20,
          opacity: 0.2,
        }}>
        {__DEV__ ? 'STAGING' : 'PRODUCTION'}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: appTheme.whiteText,
          alignSelf: 'center',
          bottom: 20,
          opacity: 0.2,
        }}>
        {version}
      </Text>
    </View>
  );
};

export default CustomDrawer;
