import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '@AppContext/index';
import { AppViewHoc, AssetImage, CustomText } from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { GradientButton } from '@SubComponents/index';
import { Route } from '@Routes/AppRoutes';
import { goToNextScreen } from '@Utils/Helper';
import { setOnboardingStatusService } from '@Services/UserService';

const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  marginTop: {
    marginTop: 25,
  },
  startedView: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 25,
  },
  ellipse: {
    height: 12,
    width: 12,
  },
  ellipseView: {
    marginTop: 3,
    marginRight: 5,
  },
});

const GetStarted = () => {
  const { appTheme, translations } = useContext(AppContext);
  const navigation = useNavigation();

  const { outer, marginTop, startedView, ellipse, ellipseView } = styles;

  useEffect(() => {
    setOnboardingStatus();
  }, []);

  const setOnboardingStatus = async () => {
    try {
      await setOnboardingStatusService({
        onboardingstatus: 1,
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  const onGetStartedPress = () => {
    goToNextScreen(navigation, Route.MainScreen);
  };

  const renderInstruction = (value: any, style = { marginBottom: 10 }) => {
    return (
      <View style={[CommonStyle.rowDirection, CommonStyle.flex1, style]}>
        <AssetImage
          isLoadFromLocal
          source={AppImages.ellipse}
          containerStyle={ellipseView}
          imageStyle={ellipse}
        />
        <CustomText
          medium
          style={[CommonStyle.flex1, { color: appTheme.whiteText }]}>
          {value}
        </CustomText>
      </View>
    );
  };

  return (
    <AppViewHoc addSafeAreaView={false}>
      <View style={outer}>
        <AssetImage
          localImage
          source={AppImages.tamaraLogo}
          imageStyle={CommonStyle.tamaraLogo}
          resizeMode={'contain'}
        />
        <View
          style={[
            {
              backgroundColor: appTheme.getStartedBg,
            },
            startedView,
          ]}>
          {renderInstruction(translations.GET_STARTED1)}
          {renderInstruction(translations.GET_STARTED2)}
          {renderInstruction(translations.GET_STARTED3)}
          {renderInstruction(translations.GET_STARTED4)}
          {renderInstruction(translations.GET_STARTED5, { marginBottom: 0 })}
        </View>
        <GradientButton
          title={translations.GET_STARTED}
          onPress={onGetStartedPress}
          exStyle={marginTop}
        />
      </View>
    </AppViewHoc>
  );
};

export default GetStarted;
