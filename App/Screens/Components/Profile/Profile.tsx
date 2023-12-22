/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useRef, useState,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import {
  AppViewHoc,
  AppHeader,
  ImagePickerModal,
  TextInputComponent,
  KeyBoardAvoidViewHoc,
  EditAvatar,
} from '@CommonComponent/index';
import { GradientButton } from '@SubComponents/index';
import AppImages from '@Theme/AppImages';
import { Space, spaceType } from '@CommonComponent/Space';
import { DateInputs, DropDownList } from '@CommonComponent/SelectOption';
import {
  getImageUrl,
  goToNextScreen,
  normalformateDate,
  showToast,
} from '@Utils/Helper';
import { UpdateProfileValidation } from '@Utils/Validation';
import { Route } from '@Routes/AppRoutes';
import LinearGradient from 'react-native-linear-gradient';
import { getUserDetailService, updateProfileService } from '@Services/UserService';
import {
  changeProfilePictureService,
  uploadFileType,
} from '@Services/FileUploadService';
import { genderDefault } from '@Utils/Constant';

const Profile = ({ navigation }: any) => {
  const { appTheme, translations, updateUserProfile, userDetail } =
    useContext(AppContext);
    console.log(userDetail,'abcd')
  const [state, setState] = useState({
    name: userDetail?.name,
    email: userDetail?.email,
    // token:userDetail?.userToken,
    dob: userDetail?.dob,
    gender: userDetail?.gender,
    phone: userDetail?.mobileNo,
    isProcessing: false,
    image: userDetail?.profilePicture,
  });

  const refName = useRef<any>();
  const refEmail = useRef<any>();
  const [error, setError] = useState<any>({});
  const [dateModalVisibility, setDateModalVisibility] = useState(false);
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const [imagePickerVisible, setImagePickerVisibility] = useState(false);
  const [token, setToken] = useState(0);
  const { name, email, dob, gender, phone, image, isProcessing} = state;
  const { outer, marginTop, flexDirection, rightText, flex, underlineColor } =
    styles;
  const DATA = genderDefault;

  useEffect(() => {
    const relode = navigation.addListener('focus', () => {
      updateUserProfileforToken()
    });
    return relode;
  }, [navigation]);

  const updateUserProfileforToken = async () => {
    try {
      const response = await getUserDetailService();
      if (response?.data) {
        const user = response?.data;
        setToken(user?.userToken);
      }
    } catch (error) {}
  };

  const onChangeText = (text: string, type: string) => {
    setState({
      ...state,
      [type]: text,
    });
    setError({
      ...error,
      [type]: false,
    });
  };

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };

  const checkValidation = () => {
    Keyboard.dismiss();
    const validation = UpdateProfileValidation(state);
    if (validation.isValid) {
      updateProfile();
    } else {
      setError(validation.error);
    }
  };

  const updateProfile = async (imagePath = image) => {
    try {
      manageProcessing(true);
      const params = {
        name,
        mobileNo: phone,
        gender,
        dob,
        profilePicture: imagePath,
      };
      const response = await updateProfileService(params);
      showToast(response?.data);
      manageProcessing(false);
      if (response.data) {
        updateUserProfile();
        goToNextScreen(navigation, Route.MainScreen);
      }
    } catch (err: any) {
      manageProcessing(false);
    }
  };

  const onImageSelect = (imageData: any) => {
    setImagePickerVisibility(false);
    manageProcessing(true);
    const data = {
      ...imageData,
      uri: imageData.path,
    };
    changeProfilePicture(data);
  };

  const changeProfilePicture = async (imageData: any) => {
    try {
      const response = await changeProfilePictureService(
        imageData,
        uploadFileType.avatar,
      );
      manageProcessing(false);
      if (response) {
        updateProfile(userDetail._id);
      }
    } catch (err: any) {
      manageProcessing(false);
      console.log(err);
    }
  };

  const onRemoveProfile = () => {
    setImagePickerVisibility(false);
    updateProfile('');
  };

  const renderProfileAvatar = () => {
    const source = image
      ? { uri: `${getImageUrl(image)}` }
      : AppImages.blankProfile;
    return (
      <EditAvatar
        source={source}
        onPress={() => setImagePickerVisibility(true)}
      />
    );
  };

  return (
    <AppViewHoc removeKeyBoardAvoidView={true}>
      <AppHeader
        title={translations.PROFILE_HEADER}
        showDrawer={true}
        navigation={navigation}
      />
      <KeyBoardAvoidViewHoc addScrollView={true}>
        <View style={outer}>
          {renderProfileAvatar()}
          <Space type={spaceType.large} />
          <TextInputComponent
            onChangeText={(text: string) => onChangeText(text, 'name')}
            value={name}
            autoCapitalize={'sentences'}
            placeholder={translations.NAME}
            returnKeyType={'next'}
            setRef={refName}
            leftImage={AppImages.userInput}
            viewStyle={[flexDirection, CommonStyle.alignItems]}
            style={[flex]}
            error={error?.name && error?.nameErrorMessage}
            onSubmitEditing={() => {}}
          />
          <Space type={spaceType.small} />
          <TextInputComponent
            onChangeText={(text: string) => onChangeText(text, 'email')}
            value={email}
            autoCapitalize={'none'}
            placeholder={translations.EMAIL}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            setRef={refEmail}
            editable={false}
            leftImage={AppImages.email}
            viewStyle={[flexDirection, CommonStyle.alignItems]}
            style={[flex, { color: appTheme.inputPlaceholder }]}
            error={error?.email && error?.emailErrorMessage}
            onSubmitEditing={() => {}}
          />
          <Space type={spaceType.small} />
          <TextInputComponent
            onChangeText={(text: string) => onChangeText(text, 'phone')}
            value={phone}
            autoCapitalize={'none'}
            placeholder={translations.PROFILE_PHONE_NO}
            keyboardType={'phone-pad'}
            returnKeyType={'next'}
            setRef={refEmail}
            leftImage={AppImages.phone}
            viewStyle={[flexDirection, CommonStyle.alignItems]}
            style={[flex]}
            maxLength={10}
            error={error?.phone && error?.phonErrorMessage}
            onSubmitEditing={() => {}}
          />
          <Space type={spaceType.small} />
          <TouchableOpacity onPress={() => setDateModalVisibility(true)}>
            <TextInputComponent
              pointerEvents={'none'}
              value={dob ? normalformateDate(dob) : dob}
              autoCapitalize={'none'}
              placeholder={translations.PROFILE_DOB}
              keyboardType={'email-address'}
              returnKeyType={'next'}
              setRef={refEmail}
              leftImage={AppImages.calender}
              viewStyle={[flexDirection, CommonStyle.alignItems]}
              style={[flex]}
              editable={false}
              error={error?.dob && error?.errorDobMessage}
              onSubmitEditing={() => {}}
            />
          </TouchableOpacity>
          <Space type={spaceType.small} />
          <TouchableOpacity onPress={() => setDropDownVisibility(true)}>
            <TextInputComponent
              pointerEvents={'none'}
              onChangeText={(text: string) => onChangeText(text, 'gender')}
              value={gender}
              placeholder={translations.PROFILE_GENDER}
              setRef={refEmail}
              leftImage={AppImages.gender}
              rightImage={AppImages.arrow_down}
              viewStyle={[flexDirection, CommonStyle.alignItems]}
              style={[flex]}
              editable={false}
              error={error?.gender && error?.errorGenderMessage}
              onSubmitEditing={() => {}}
            />
          </TouchableOpacity>

          {/* <Space type={spaceType.small} /> */}
          {/* <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={appTheme.gradient}
            style={underlineColor}>
            <TextInputComponent
              value={translations.PROFILE_TOKEN}
              autoCapitalize={'none'}
              leftImage={AppImages.avaiable_token}
              viewStyle={[
                flexDirection,
                CommonStyle.alignItems,
                {
                  backgroundColor: appTheme.blackBg,
                  margin: 1,
                  borderRadius: 9,
                },
              ]}
              style={[flex, { fontSize: 16, fontWeight: 'bold' }]}
              editable={false}
              rightText={token===0?'0':token}
              rightTextStyle={rightText}
            />
          </LinearGradient> */}
          <Space type={spaceType.small} />
          <GradientButton
            title={translations.PROFILE_BUTTON_TEXT}
            isProcessing={isProcessing}
            onPress={checkValidation}
            exStyle={marginTop}
          />
        </View>
      </KeyBoardAvoidViewHoc>
      {dateModalVisibility && (
        <DateInputs
          date={dob ? new Date(dob) : new Date()}
          onChange={(date: string) => {
            onChangeText(date, 'dob');
            setDateModalVisibility(false);
          }}
          onClose={() => setDateModalVisibility(false)}
        />
      )}
      {dropDownVisibility && (
        <DropDownList
          data={DATA}
          onPress={(item: any) => {
            onChangeText(item.title, 'gender');
            setDropDownVisibility(false);
          }}
          onClose={() => {
            setDropDownVisibility(false);
          }}
        />
      )}
      <ImagePickerModal
        visible={imagePickerVisible}
        onClose={() => setImagePickerVisibility(false)}
        onImageSelect={onImageSelect}
        onRemoveSelect={onRemoveProfile}
      />
    </AppViewHoc>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: 50,
  },
  title: {
    marginTop: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 25,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  underlineColor: {
    top: 5,
    flex: 1,
    borderRadius: 8,
  },
  rightText: {
    marginRight: 25,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile;
