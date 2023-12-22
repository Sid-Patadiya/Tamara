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
});
const TermsAndCondition = ({ navigation }: any) => {
  const { appTheme, translations } = useContext(AppContext);

  return (
    <AppViewHoc removeKeyBoardAvoidView={true}>
      <View style={CommonStyle.flex1}>
        <AppHeader
          title={translations.TERMS_AND_CONDITION}
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
              {translations.BASIC_TERMS}
            </CustomText>
            <Space type={spaceType.small} />
            <CustomText
              medium
              style={[styles.text, { color: appTheme.whiteText }]}>
              {translations.TERMS_AND_CONDITION_TEXT}
            </CustomText>
          </View>
        </KeyBoardAvoidViewHoc>
      </View>
    </AppViewHoc>
  );
};

export default TermsAndCondition;
