/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useImperativeHandle,
  useContext,
  useEffect,
  forwardRef,
} from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { CustomText } from '@CommonComponent/index';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AppImages from '@Theme/AppImages';
import { hasAudioPermission } from '@Services/PermissionService';
import { showToast } from '@Utils/Helper';

const styles = StyleSheet.create({});

const RNVoice = forwardRef((props: any, ref) => {
  const { appTheme } = useContext(AppContext);
  const { onVoiceResult, isRecordingOn, setRecordingOn, showMic } = props;

  // const [recognized, setRecognized] = useState('');
  // const [volume, setVolume] = useState('');
  // const [error, setError] = useState('');
  // const [end, setEnd] = useState('');
  // const [started, setStarted] = useState('');
  // const [results, setResults] = useState([]);
  // const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    stopVoiceRecording() {
      _stopRecognizing();
    },
  }));

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    // setStarted('√');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    // setRecognized('√');
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    // setEnd('√');
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    // setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    // setResults(e.value);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    // setPartialResults(e.value);
    onVoiceResult(e.value);
  };

  const onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    // setVolume(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    setRecordingOn(true);
    try {
      await Voice.start('en-US');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
  };

  const checkPermission = async () => {
    try {
      if (!(await hasAudioPermission(true))) {
        return;
      }
      _startRecognizing();
    } catch (error: any) {
      console.log(error);
    }
  };

  const _stopRecognizing = async () => {
    try {
      setRecordingOn(false);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    // setRecognized('');
    // setVolume('');
    // setError('');
    // setEnd('');
    // setStarted('');
    // setResults([]);
    // setPartialResults([]);
  };

  return (
    <View>
      {isRecordingOn ? (
        <TouchableOpacity activeOpacity={1} onPress={_stopRecognizing}>
          <Image
            source={AppImages.micOn}
            style={{ width: 25, height: 25, marginLeft: 10 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={1} onPress={checkPermission}>
          <Image
            source={AppImages.mic}
            style={{ width: 25, height: 25, marginLeft: 10 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
      {/* {isRecordingOn && (
        <View style={[CommonStyle.flex1, CommonStyle.rowAlignItems]}>
          <TouchableHighlight onPress={() => {}} style={[{ flex: 0 }]}>
            <CustomText
              style={[{ flex: 0, color: appTheme.whiteText, marginRight: 10 }]}>
              Delete
            </CustomText>
          </TouchableHighlight>
          <CustomText style={[{ color: appTheme.whiteText }]}>
            Recording
          </CustomText>
          <TouchableHighlight style={[{ flex: 0 }]} onPress={_stopRecognizing}>
            <CustomText style={[{ flex: 0, color: appTheme.whiteText }]}>
              Stop
            </CustomText>
          </TouchableHighlight>
        </View>
      )} */}
    </View>
  );
});

export { RNVoice };
