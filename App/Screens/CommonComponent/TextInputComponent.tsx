import React, { useContext } from 'react';
import { View, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import { AssetImage, CustomText } from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';

const styles = StyleSheet.create({
  leftIconContainer: {
    width: 50,
    alignItems: 'center',
  },
  margin10: {
    margin: 10,
  },
  error: {
    width: 18,
    height: 18,
  },
  errorText: {
    marginLeft: 5,
  },
});

const ErrorMessage = (props: any) => {
  const { error } = props;
  const { appTheme, translations }: any = useContext(AppContext);
  return (
    <View
      style={[CommonStyle.flex1, CommonStyle.rowDirection, styles.margin10]}>
      <AssetImage
        isLoadFromLocal
        source={AppImages.error}
        imageStyle={[styles.error]}
        containerStyle={styles.error}
        resizeMode={'contain'}
      />
      <CustomText
        medium
        style={[styles.errorText, { color: appTheme.red }]}>{`${
        translations?.[error] || error || translations.SOME_THING_WENT_WRONG
      }`}</CustomText>
    </View>
  );
};

const TextInputComponent = (props: any) => {
  const { appTheme, translations }: any = useContext(AppContext);

  const {
    children,
    viewStyle,
    value,
    placeholder,
    autoCapitalize = 'none',
    onChangeText,
    style,
    placeholderTextColor = appTheme.inputPlaceholder,
    underlineColorAndroid = appTheme.transparent,
    keyboardType,
    returnKeyType = 'next',
    setRef,
    onSubmitEditing,
    secureTextEntry,
    leftImage,
    leftImageStyle,
    onShowPassword,
    error,
    rightImage,
    rightImagePress,
    maxLength,
    editable,
    rightText,
    rightTextStyle,
    pointerEvents = 'auto',
  } = props;

  return (
    <>
      <View
        pointerEvents={pointerEvents}
        style={[
          { backgroundColor: appTheme.inputBg },
          CommonStyle.inputBg,
          error && { borderWidth: 1, borderColor: appTheme.red },
          viewStyle,
        ]}>
        {leftImage ? (
          <AssetImage
            isLoadFromLocal
            source={leftImage}
            imageStyle={[CommonStyle.inputLeftImage, leftImageStyle]}
            containerStyle={styles.leftIconContainer}
            resizeMode={'contain'}
          />
        ) : null}
        <TextInput
          value={value}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          style={[CommonStyle.input, { color: appTheme.inputText }, style]}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid={underlineColorAndroid}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          ref={setRef}
          editable={editable}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
        />
        {secureTextEntry !== undefined && (
          <Pressable
            onPress={onShowPassword}
            android_ripple={CommonStyle.androidRipple}>
            <View
              style={{
                ...CommonStyle.center,
                ...CommonStyle.inputIcon,
                borderBottomColor: appTheme.border,
              }}>
              <Image
                resizeMode={'contain'}
                source={{
                  uri:
                    (secureTextEntry && AppImages.passwordOpen) ||
                    AppImages.passwordClosed,
                }}
                style={CommonStyle.inputImg}
              />
            </View>
          </Pressable>
        )}
        {rightImage ? (
          <AssetImage
            isLoadFromLocal
            source={rightImage}
            onPress={rightImagePress}
            imageStyle={[CommonStyle.inputLeftImage, leftImageStyle]}
            containerStyle={styles.leftIconContainer}
            resizeMode={'contain'}
          />
        ) : null}

        {rightText ? (
          <CustomText
            medium
            style={[
              styles.errorText,
              { color: appTheme.whiteText },
              rightTextStyle,
            ]}>{`${rightText}`}</CustomText>
        ) : null}

        {children}
      </View>
      {(error && (
        <View style={[CommonStyle.rowAlignItems, styles.margin10]}>
          <AssetImage
            isLoadFromLocal
            source={AppImages.error}
            imageStyle={[styles.error]}
            containerStyle={styles.error}
            resizeMode={'contain'}
          />
          <CustomText
            medium
            style={[
              styles.errorText,
              CommonStyle.flex1,
              { color: appTheme.red },
            ]}>{`${
            translations?.[error] || error || translations.SOME_THING_WENT_WRONG
          }`}</CustomText>
        </View>
      )) ||
        null}
    </>
  );
};

export { TextInputComponent, ErrorMessage };
