/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppContext } from '@AppContext/index';
import { CustomText } from './CustomText';
import { AssetImage } from './AssetImage';
import CommonStyle from '@Theme/CommonStyle';
import LinearGradient from 'react-native-linear-gradient';
import AppImages from '@Theme/AppImages';

const SubscriptionPlanOption = (props: any) => {
  const { appTheme, guestUser } = useContext(AppContext);
  const { onPress, category, selectedPlan } = props;

  // console.log('category', category);
  // console.log('selectedPlan', selectedPlan);

  const onClick = (item: any) => {
    onPress(item);
  };

  return (
    <View
      style={[
        CommonStyle.rowDirection,
        {
          marginTop: 30,
          flexWrap: 'wrap',
          columnGap: 20,
          rowGap: 20,
          justifyContent: 'center',
        },
      ]}>
      {category?.length && typeof category !== 'string'
        ? category?.map((item: any, index: any) => {
            const isSelected = item.visible;
            return (
              <LinearGradient
                colors={isSelected ? appTheme.gradient : appTheme.gradient}
                start={{ x: 0.0, y: 1.0 }}
                key={index}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                  // height: 125,
                  width: '90%',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => onClick(item)}
                  activeOpacity={0.9}
                  style={{
                    margin: 2,
                    borderRadius: 10,
                    // height: 122,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isSelected ? 'transparent' : 'black',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      // height: 120,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CustomText
                      medium
                      size={32}
                      style={{
                        color: appTheme.whiteText,
                      }}>{`$${item.price} /month`}</CustomText>
                    <View
                      style={[
                        CommonStyle.rowAlignItems,
                        { marginVertical: 10 },
                      ]}>
                      <AssetImage
                        isLoadFromLocal
                        source={
                          isSelected
                            ? AppImages.tokenActive
                            : AppImages.tokenDeActive
                        }
                        imageStyle={{
                          width: 30,
                          height: 30,
                        }}
                        onPress={() => onClick(item)}
                        containerStyle={{ marginRight: 10 }}
                        resizeMode={'contain'}
                      />
                      <CustomText
                        medium
                        size={22}
                        xlarge
                        style={{
                          color: appTheme.whiteText,
                        }}>
                        {item.name}
                      </CustomText>
                    </View>
                    <CustomText
                      medium={false}
                      size={22}
                      xlarge
                      style={{
                        color: appTheme.whiteText,
                        marginBotto: 5,
                        textAlign: 'center',
                        padddingHorizontal: 15,
                      }}>
                      {item.description}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            );
          })
        : null}
    </View>
  );
};

export { SubscriptionPlanOption };
