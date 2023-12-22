/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppContext } from '@AppContext/index';
import { CustomText } from './CustomText';
import { AssetImage } from './AssetImage';
import AppImages from '@Theme/AppImages';
import CommonStyle from '@Theme/CommonStyle';
import LinearGradient from 'react-native-linear-gradient';
import { showToast } from '@Utils/Helper';

const HomeCategory = (props: any) => {
  const { appTheme, guestUser, translations } = useContext(AppContext);
  // const categoryDefault: any = {
  //   general: AppImages.homeCategory1,
  //   social_media: AppImages.homeCategory2,
  //   email: AppImages.homeCategory3,
  //   messages: AppImages.homeCategory4,
  // };

  const categoryDefault = [
    {
      key: 'email',
      title: translations.HOME_CATEGORY3,
      source: AppImages.homeCategory3,
    },
    {
      key: 'social_media',
      title: translations.HOME_CATEGORY2,
      source: AppImages.homeCategory2,
    },
    {
      key: 'general',
      title: translations.HOME_CATEGORY1,
      source: AppImages.homeCategory1,
    },
    {
      key: 'messages',
      title: translations.HOME_CATEGORY4,
      source: AppImages.homeCategory4,
    },
  ];

  const { onPress, category = [] } = props;

  // console.log('category', category);
  const onCategoryClick = (item: any) => {
    // if (guestUser) {
    //   showToast(
    //     'If you want to perform further then register yourself, right now you are guest user.',
    //   );
    //   return;
    // }
    onPress(item);
  };

  return (
    <View
      style={[
        CommonStyle.rowDirection,
        {
          marginTop: 30,
          marginHorizontal: 20,
          flexWrap: 'wrap',
          columnGap: 20,
          rowGap: 20,
          justifyContent: 'center',
        },
      ]}>
      {/* {categoryDefault?.length && typeof category !== 'string' */}
      {categoryDefault?.length
        ? categoryDefault?.map((item: any, index: any) => {
            return (
              <LinearGradient
                colors={appTheme.gradient}
                start={{ x: 0.0, y: 1.0 }}
                key={index}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                  height: 125,
                  width: '45%',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => onCategoryClick(item)}
                  activeOpacity={0.9}
                  style={{
                    margin: 2,
                    borderRadius: 10,
                    height: 122,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 120,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AssetImage
                      isLoadFromLocal
                      source={item.source}
                      imageStyle={{
                        width: 50,
                        height: 50,
                      }}
                      onPress={() => onCategoryClick(item)}
                      containerStyle={{ marginBottom: 5 }}
                      resizeMode={'contain'}
                    />
                    <CustomText
                      medium
                      style={{
                        color: appTheme.whiteText,
                      }}>{`${item.title}`}</CustomText>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            );
          })
        : null}
    </View>
  );
};

export { HomeCategory };
