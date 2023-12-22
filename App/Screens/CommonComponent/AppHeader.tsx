import React, { useContext } from 'react';
import { View, StyleSheet, Alert, Linking, BackHandler } from 'react-native';
import { AssetImage, CustomText } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import LinearGradient from 'react-native-linear-gradient';
import AppImages from '@Theme/AppImages';
import { isIOS } from '@Utils/Constant';
import { deviceHasNotch } from '@Utils/Helper';
import VersionCheck from 'react-native-version-check';

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    alignSelf: 'center',
    height: isIOS ? (deviceHasNotch ? 90 : 70) : 70,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    textAlign: 'center',
  },
  headerView: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  leftImageContainer: {
    width: 60,
    alignItems: 'center',
  },
  drawerImage: {},
});

const AppHeader = ({
  title = '',
  headerViewStyle,
  leftImage,
  leftImageStyle,
  leftImageContainerStyle,
  rightImage,
  rightImageSource,
  rightImageStyle,
  rightImageContainerStyle,
  leftImagePress,
  rightImagePress,
  showDrawer,
  onDrawerIconPress,
  navigation,
}: any) => {
  const { appTheme, translations } = useContext(AppContext);

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded && updateNeeded.isNeeded) {
      //Alert the user and redirect to the app url
      Alert.alert('', translations.UPDATE_LATEST, [
        {
          text: translations.UPDATE,
          onPress: () => {
            BackHandler.exitApp();
            updateNeeded?.storeUrl && Linking.openURL(updateNeeded?.storeUrl);
          },
        },
      ]);
    } else {
      onDrawerIconPress ? onDrawerIconPress() : navigation.toggleDrawer();
    }
  };

  return (
    <View style={[CommonStyle.rowDirection]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={appTheme.gradient}
        style={styles.linearGradient}>
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.rowCenter,
            styles.headerView,
            headerViewStyle,
          ]}>
          {leftImage ? (
            <AssetImage
              isLoadFromLocal
              source={rightImageSource || AppImages.leftArrow}
              imageStyle={[CommonStyle.leftArrow, leftImageStyle]}
              containerStyle={[
                styles.leftImageContainer,
                leftImageContainerStyle,
              ]}
              resizeMode={'contain'}
              onPress={() =>
                leftImagePress ? leftImagePress() : navigation.goBack()
              }
            />
          ) : (
            <View style={[styles.leftImageContainer, leftImageStyle]} />
          )}
          {title !== null && (
            <CustomText
              large
              style={[
                CommonStyle.flex1,
                styles.title,
                { color: appTheme.whiteText },
              ]}>
              {title}
            </CustomText>
          )}
          {rightImage ? (
            <AssetImage
              isLoadFromLocal
              source={rightImage}
              imageStyle={[CommonStyle.leftHeaderIcon, rightImageStyle]}
              containerStyle={[
                styles.leftImageContainer,
                rightImageContainerStyle,
              ]}
              resizeMode={'contain'}
              onPress={rightImagePress}
            />
          ) : showDrawer ? null : (
            <View style={[styles.leftImageContainer, leftImageStyle]} />
          )}
          {showDrawer && (
            <AssetImage
              isLoadFromLocal
              source={AppImages.drawerMenu}
              imageStyle={[CommonStyle.drawerIcon, rightImageStyle]}
              containerStyle={[
                styles.leftImageContainer,
                rightImageContainerStyle,
              ]}
              resizeMode={'contain'}
              onPress={checkUpdateNeeded}
            />
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export { AppHeader };
