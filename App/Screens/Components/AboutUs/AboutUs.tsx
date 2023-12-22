import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import {
  AppHeader,
  AppViewHoc,
  AssetImage,
  CustomText,
  KeyBoardAvoidViewHoc,
} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { Space, spaceType } from '@CommonComponent/Space';
import { TextButton } from '@SubComponents/index';
import { handleUrl } from '@Utils/Helper';

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
});
const AboutUs = ({ navigation }: any) => {
  const { appTheme, translations } = useContext(AppContext);

  return (
    <AppViewHoc removeKeyBoardAvoidView={true}>
      <View style={CommonStyle.flex1}>
        <AppHeader
          title={translations.ABOUT_US}
          showDrawer={true}
          navigation={navigation}
        />
        <KeyBoardAvoidViewHoc addScrollView={true}>
          <View
            style={[CommonStyle.flex1, CommonStyle.alignCenter, styles.view]}>
            <AssetImage
              imageStyle={styles.image}
              source={AppImages.termsAndCondition}
              isLoadFromLocal
              resizeMode={'contain'}
            />
            <Space type={spaceType.large} />
            <CustomText
              medium
              fontWeight600
              style={[styles.text, { color: appTheme.themeColor }]}>
              {translations.WHAT_WE_DO}
            </CustomText>
            <Space type={spaceType.small} />
            <CustomText
              medium
              style={[styles.text, { color: appTheme.whiteText }]}>
              {translations.ABOUT_US_CONTENT}
            </CustomText>
            <Space type={spaceType.large} />
            <CustomText
              medium
              fontWeight700
              style={[styles.text, { color: appTheme.whiteText }]}>
              {translations.ABOUT_US_CONTENT1}
            </CustomText>
            <TextButton
              title={''}
              subTitle={translations.TAMARA_URL}
              exTextStyle={[
                styles.textUrl,
                CommonStyle.textDecorationLine,
                { color: appTheme.themeColor },
              ]}
              onSubTitle={() => handleUrl(translations.TAMARA_URL)}
            />
          </View>
        </KeyBoardAvoidViewHoc>
      </View>
    </AppViewHoc>
  );
};

export default AboutUs;
