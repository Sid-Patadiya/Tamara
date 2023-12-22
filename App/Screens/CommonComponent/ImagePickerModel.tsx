import React, { useContext } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CustomText } from '@CommonComponent/CustomText';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import {
  hasPhotoPermission,
  hasCameraPermission,
} from '@Services/PermissionService';

const styles = StyleSheet.create({
  model: {
    flex: 1,
    backgroundColor: 'rgba(82,82,82,0.3)',
  },
  modelContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleStyles: {
    fontWeight: '500',
    fontSize: 20,
    padding: 10,
  },
  closeIcon: {
    fontSize: 20,
    margin: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  optionItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

const filePickerDefaultType: any = {
  imagePicker: {
    mediaType: 'photo',
    cropping: true,
    compressImageQuality: 0.7,
  },
  cameraPikers: {
    mediaType: 'camera',
    cropping: true,
    width: 400,
    height: 400,
    compressImageQuality: 0.7,
  },
};

const ImagePickerModal = (props: any) => {
  const { visible, onClose, onImageSelect, onRemoveSelect } = props;
  const { appTheme } = useContext(AppContext);
  const ImagePickerService = async (type: string) => {
    try {
      if (type === 'image') {
        if (!(await hasPhotoPermission(true))) {
          return;
        }
        const image = await ImagePicker.openPicker(
          filePickerDefaultType.imagePicker,
        );
        onImageSelect(image);
      } else {
        if (!(await hasCameraPermission(true))) {
          return;
        }
        const camera = await ImagePicker.openCamera(
          filePickerDefaultType.cameraPikers,
        );
        onImageSelect(camera);
      }
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  const renderPickerOption = (title: any, onPress: any) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        <CustomText large style={{ color: appTheme.inputBg, fontSize: 18 }}>
          {`${title}`}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={CommonStyle.flex1}>
        <Modal transparent={true} animationType={'slide'} visible={visible}>
          <View style={styles.model}>
            <TouchableOpacity style={CommonStyle.flex1} onPress={onClose} />
            <View style={styles.modelContainer}>
              <View style={styles.titleContainer}>
                <CustomText
                  large
                  style={[styles.titleStyles, { color: appTheme.inputBg }]}>
                  {'Select Option'}
                </CustomText>
              </View>
              <View style={{ paddingBottom: 30 }}>
                {renderPickerOption('Camera', () => ImagePickerService(''))}
                {renderPickerOption('Gallery', () =>
                  ImagePickerService('image'),
                )}
                {renderPickerOption('Remove', () => onRemoveSelect())}
                {renderPickerOption('Cancel', onClose)}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export { ImagePickerModal };
