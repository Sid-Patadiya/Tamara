import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import {
  AppHeader,
  AppViewHoc,
  AssetImage,
  CustomText,
  ErrorMessage,
  KeyBoardAvoidViewHoc,
} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { Space, spaceType } from '@CommonComponent/Space';
import { GradientButton } from '@SubComponents/index';
import Stars from 'react-native-stars';
import { useNavigation } from '@react-navigation/native';
import { feedBackService } from '@Services/FeedBackService';
import { showToast } from '@Utils/Helper';

const FeedBack = () => {
  const { appTheme, translations, userDetail } = useContext(AppContext);
  const { btnTitle, flex } = styles;
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [isProcessing, setProcessing] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState('');

  const updateNote = async () => {
    try {
      if (note && note?.trim()) {
        setProcessing(true);
        let params: any = {
          rating,
          message: note,
        };
        if (userDetail._id) {
          params.userid = userDetail._id;
        }
        const response = await feedBackService(params);
        cleanValue();
        showToast(response?.data);
      } else {
        setError(translations.FEEDBACK_ERROR_MESSAGE);
      }
    } catch (err: any) {
      showToast(err?.response?.data?.data);
    }
  };

  const cleanValue = () => {
    setProcessing(false);
    setRating(0);
    setNote('');
  };

  return (
    <AppViewHoc removeKeyBoardAvoidView={true}>
      <AppHeader
        title={translations.FEEDBACK}
        showDrawer={true}
        navigation={navigation}
      />
      <KeyBoardAvoidViewHoc addScrollView={true}>
        <View style={[CommonStyle.flex1, CommonStyle.alignCenter, styles.view]}>
          <AssetImage
            imageStyle={styles.image}
            source={AppImages.feedback}
            isLoadFromLocal
            resizeMode={'contain'}
          />
          <Space type={spaceType.large} />
          <CustomText
            medium
            fontWeight600
            style={[styles.text, { color: appTheme.themeColor }]}>
            {translations.FEEDBACK_SUB_HEADER}
          </CustomText>
          <Space type={spaceType.small} />
          <CustomText
            medium
            style={[styles.text, { color: appTheme.whiteText }]}>
            {translations.FEEDBACK_INFO}
          </CustomText>
          <View style={{ alignItems: 'center' }}>
            <Space type={spaceType.normal} />
            <Stars
              default={rating}
              update={(val: any) => {
                setRating(val);
              }}
              spacing={10}
              starSize={35}
              count={5}
              fullStar={AppImages.star}
              emptyStar={AppImages.star_empty}
            />
          </View>
          <Space type={spaceType.normal} />
          <TextInput
            placeholder={translations.FEEDBACK_NOTE}
            onChangeText={(text: string) => {
              setNote(text);
            }}
            value={note}
            multiline={true}
            numberOfLines={5}
            placeholderTextColor={appTheme.inputPlaceholder}
            style={[
              flex,
              {
                backgroundColor: appTheme.inputBg,
                color: appTheme.whiteText,
                paddingTop: 10,
                paddingBottom: 10,
              },
            ]}
          />
          {error && <ErrorMessage error={error} />}
        </View>
      </KeyBoardAvoidViewHoc>
      <Space type={spaceType.normal} />
      <GradientButton
        title={translations.FEEDBACK_SEND}
        onPress={() => {
          updateNote();
        }}
        isProcessing={isProcessing}
        exStyle={btnTitle}
      />
      <Space type={spaceType.extraLarge} />
    </AppViewHoc>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 200,
  },
  view: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  flex: {
    height: 100,
    width: '100%',
    borderRadius: 5,
    textAlignVertical: 'top',
    padding: 10,
  },
  btnTitle: {
    marginHorizontal: 20,
  },
});
export default FeedBack;
