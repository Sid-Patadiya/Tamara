import { Alert, Platform } from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';
const { Release = 13 } = Platform.constants;

const isIOS = Platform.OS === 'ios';

function showAlert(msg: any) {
  Alert.alert('', msg, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Settings',
      onPress: () => {
        openSettings().catch(() => console.warn('cannot open settings'));
      },
    },
  ]);
}

export const hasCameraPermission = async (withAlert = true) => {
  try {
    const permission = isIOS
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;
    const response: any = await check(permission);
    let camera;
    if (response.camera !== RESULTS.GRANTED) {
      camera = await request(permission);
    }
    if (camera === RESULTS.DENIED || camera === RESULTS.BLOCKED) {
      if (withAlert) {
        showAlert(
          'Permission not granted for camera. You will not able to use camera in this application.',
        );
      }
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const hasPhotoPermission = async (withAlert = true) => {
  try {
    const permissionAndroid =
      parseInt(Release) >= 13
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    const permission = isIOS
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : permissionAndroid;

    const response: any = await check(permission);
    let photo: any;
    if (response.photo !== RESULTS.GRANTED) {
      photo = await request(permission);
      console.log('photo11', photo, Release);
    }
    if (photo === RESULTS.DENIED || photo === RESULTS.BLOCKED) {
      if (withAlert) {
        showAlert(
          'Permission not granted for photos. You will not able to get photos in this application.',
        );
      }
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const showMediaPermissionAlert = async () => {
  const permissions = isIOS
    ? [
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.SPEECH_RECOGNITION,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]
    : [
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ];

  const response = await Promise.all([
    check(permissions[0]),
    check(permissions[1]),
    check(permissions[2]),
  ]);

  const camera = response[0] === RESULTS.GRANTED;
  const microphone = response[1] === RESULTS.GRANTED;
  const photo = response[2] === RESULTS.GRANTED;

  let message =
    'Permission not granted for media.\nYou will not able to access:';
  if (!camera) {
    message += '\n1. Camera Capture';
  }
  if (!camera || !microphone) {
    message += '\n2. Video Capture';
  }

  if (!photo) {
    message += '\n3. Photos';
  }

  let isPermissionRequestedOnSameDay = false;

  if ((!camera || !microphone || !photo) && !isPermissionRequestedOnSameDay) {
    showAlert(message);
    return false;
  }
  return true;
};

export const hasAudioPermission = async (withAlert = false) => {
  try {
    const permission = isIOS
      ? PERMISSIONS.IOS.SPEECH_RECOGNITION
      : PERMISSIONS.ANDROID.RECORD_AUDIO;
    const response: any = await check(permission);
    console.log('RESULTS((((1111', response);

    let audio: any;
    if (response.audio !== RESULTS.GRANTED) {
      audio = await request(permission);
    }
    console.log('RESULTS((((', response);
    if (audio === RESULTS.DENIED || audio === RESULTS.BLOCKED) {
      if (withAlert) {
        showAlert(
          'Permission not granted for audio. You will not able to use audio in this application.',
        );
      }
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const requestAudioPermission = async () => {
  try {
    const permission = isIOS
      ? PERMISSIONS.IOS.SPEECH_RECOGNITION
      : PERMISSIONS.ANDROID.RECORD_AUDIO;
    const response = await check(permission);
    console.log('requestAudioPermission  &&&&&', response);
    let audio: any;
    if (response !== RESULTS.GRANTED) {
      audio = await request(permission);
    }
    if (audio === RESULTS.DENIED || audio === RESULTS.BLOCKED) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
