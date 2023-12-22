/* eslint-disable react-native/no-inline-styles */
import { AppContext } from '@AppContext/index';
import React, { useContext } from 'react';
import {
  TouchableOpacity,
  Modal,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { CustomText } from '@CommonComponent/CustomText';
import { TextInputComponent } from '@CommonComponent/index';
import { Space, spaceType } from '@CommonComponent/Space';
import { GradientButton } from '@SubComponents/index';
import { isDateValid } from '@Utils/Helper';
import CommonStyle from '@Theme/CommonStyle';
import { height } from '@Utils/Constant';

const DateInputs = (props: any) => {
  const { date, onClose, onChange } = props;
  const dateDefault = isDateValid(date) ? date : new Date();
  return (
    <DatePicker
      modal
      open={true}
      date={dateDefault}
      mode={'date'}
      onConfirm={onChange}
      onCancel={onClose}
      textColor="black"
      maximumDate={new Date()}
    />
  );
};

const DropDownList = (props: any) => {
  const { appTheme } = useContext(AppContext);
  const { onClose, data, onPress } = props;
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      supportedOrientations={['portrait']}
      onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={[
          CommonStyle.center,
          CommonStyle.flex1,
          { backgroundColor: appTheme.savePopUpBg },
        ]}>
        <View style={[{ height: '60%', justifyContent: 'center' }]}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={[
              style.dropDownBg,
              {
                flexGrow: 1,
                alignSelf: 'center',
                paddingVertical: 20,
                backgroundColor: appTheme.blackBg,
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[CommonStyle.flex1, { padding: 10 }]}
                onPress={() => onPress(item)}>
                <CustomText
                  large
                  style={[{ color: appTheme.whiteText, textAlign: 'center' }]}>
                  {item?.title}
                </CustomText>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const SavePopUp = (props: any) => {
  const { appTheme } = useContext(AppContext);
  const {
    onClose,
    ButtonTitle,
    headerText,
    ButtonPress,
    isProcessing,
    error,
    textStyle,
    leftImage,
    onSubmitEditing,
    value,
    placeholder,
    viewStyle,
    onChangeText,
  } = props;
  const { popupBackground, headerTextStyle, exStyle } = style;
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      supportedOrientations={['portrait']}
      onRequestClose={onClose}>
      <View
        style={[popupBackground, { backgroundColor: appTheme.savePopUpBg }]}>
        <View style={style.messageView}>
          <CustomText
            xlarge
            numberOfLines={1}
            style={[
              headerTextStyle,
              { color: appTheme.blackBg },
            ]}>{`${headerText}`}</CustomText>
          <Space type={spaceType.small} />
          <TextInputComponent
            onChangeText={onChangeText}
            value={value}
            autoCapitalize={'none'}
            placeholder={placeholder}
            viewStyle={viewStyle}
            style={textStyle}
            leftImage={leftImage}
            onSubmitEditing={onSubmitEditing}
            error={error}
          />
          <Space type={spaceType.small} />
          <GradientButton
            title={ButtonTitle}
            isProcessing={isProcessing}
            onPress={ButtonPress}
            exStyle={exStyle}
          />
          <Space type={spaceType.small} />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  popupBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageView: {
    width: 285,
    height: 178,
    backgroundColor: 'white',
    padding: 10,
  },
  headerTextStyle: {
    textAlign: 'center',
  },
  exStyle: {
    marginHorizontal: 50,
  },
  dropDownBg: {
    width: '90%',
  },
});
export { DateInputs, DropDownList, SavePopUp };
