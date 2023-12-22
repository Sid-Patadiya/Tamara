/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Keyboard,
  Text,
} from 'react-native';
import {
  Bubble,
  Composer,
  ComposerProps,
  GiftedChat,
  InputToolbar,
  Send,
  TimeProps,
} from 'react-native-gifted-chat';
import dayjs from 'dayjs';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';
import {
  CustomText,
  EmptyComponent,
  Loading,
  RNVoice,
} from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { messageActionOption } from '@Utils/Constant';
import { isIOS } from '@Utils/Constant';
import { deviceHasNotch, showToast } from '@Utils/Helper';
export function GiftedChatComponent(props: any) {
  const {
    messages,
    isLoadingData,
    isSendingMessage,
    sendMessage,
    inputMessage,
    setInputMessage,
    isRecordingOn,
    setIsRecordingOn,
    manageMessageAction,
    isLoadMoreCalled,
    onLoadMore,
    showMic,
    redabilityScore,
    isTyping
  } = props;

  const { appTheme, userDetail, translations } = useContext(AppContext);
  const rnVoiceRef: any = useRef(null);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        rnVoiceRef?.current?.stopVoiceRecording();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const onVoiceResult = (value: any) => {
    setInputMessage(`${value[0]}`);
  };

  const setRecordingOn = (value: any) => {
    setIsRecordingOn(value);
  };

  const onMessageActionsPress = (type: any, messageDetail: any) => {
    if (type === messageActionOption.delete) {
      const msg =
        userDetail._id === messageDetail.user._id
          ? translations.WILL_BE_DELETED
          : translations.WILL_BE_DELETED_FROM_HISTORY;
      Alert.alert('', msg, [
        {
          text: translations.CANCEL,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: translations.DELETE,
          onPress: () => {
            manageMessageAction(type, messageDetail);
          },
        },
      ]);
    } else {
      manageMessageAction(type, messageDetail);
    }
  };

  const onMessageType = (text: any) => {
    // rnVoiceRef?.current?.stopVoiceRecording();
    setInputMessage(text);
  };

  const renderMessageOptionImage = (
    imageSource: any,
    type: any,
    messageDetail: any,
  ) => {
    return (
      <TouchableHighlight
        onPress={() => onMessageActionsPress(type, messageDetail)}
        activeOpacity={1}
        style={{ marginRight: 5, padding: 5 }}>
        <Image
          source={imageSource}
          resizeMode="contain"
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
        />
      </TouchableHighlight>
    );
  };

  const renderMessageOption = (messageDetail: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
        }}>
        <View style={{ flexDirection: 'row' }}>
          {renderMessageOptionImage(
            messageDetail?.isLike ? AppImages.likeActive : AppImages.like,
            messageActionOption.like,
            messageDetail,
          )}
          {renderMessageOptionImage(
            messageDetail?.isDisLike
              ? AppImages.disLikeActive
              : AppImages.disLike,
            messageActionOption.disLike,
            messageDetail,
          )}
          {renderMessageOptionImage(
            messageDetail?.isSave ? AppImages.saveActive : AppImages.save,
            messageDetail?.isSave
              ? messageActionOption.unSave
              : messageActionOption.save,
            messageDetail,
          )}
          {/* {renderMessageOptionImage(
            AppImages.translator,
            messageActionOption.translator,
            messageDetail,
          )} */}
          {renderMessageOptionImage(
            AppImages.share,
            messageActionOption.share,
            messageDetail,
          )}
          {renderMessageOptionImage(
            AppImages.deleteWhite,
            messageActionOption.delete,
            messageDetail,
          )}
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            // marginLeft: 20,
          }}>
          {renderMessageOptionImage(
            messageDetail?.isSave ? AppImages.saveActive : AppImages.save,
            messageDetail?.isSave
              ? messageActionOption.unSave
              : messageActionOption.save,
            messageDetail,
          )}
          {renderMessageOptionImage(
            AppImages.translator,
            messageActionOption.translator,
            messageDetail,
          )} 
          {renderMessageOptionImage(
            AppImages.share,
            messageActionOption.share,
            messageDetail,
          )}
          {renderMessageOptionImage(
            AppImages.deleteWhite,
            messageActionOption.delete,
            messageDetail,
          )}
        </View>  */}
      </View>
    );
  };

  const renderOwnerMessageOption = (messageDetail: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {renderMessageOptionImage(
            AppImages.deleteWhite,
            messageActionOption.delete,
            messageDetail,
          )}
        </View>
      </View>
    );
  };

  const renderTime = (timeProps: TimeProps) => {
    return (
      <View
        style={[
          CommonStyle.rowAlignItems,
          {
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
          },
        ]}>
        {timeProps.currentMessage.user._id === userDetail._id
          ? renderOwnerMessageOption(timeProps.currentMessage)
          : null}
        <CustomText medium style={[{ color: appTheme.whiteText }]}>
          {dayjs(timeProps.currentMessage.createdAt).locale('en').format('LT')}
        </CustomText>
        {timeProps.currentMessage.user._id !== userDetail._id
          ? renderMessageOption(timeProps.currentMessage)
          : null}
      </View>
    );
  };

  const renderBubble = (props: any) => {
    return (
      <View style={{ marginBottom: 5 }}>
        <CustomText
          medium
          style={[
            {
              margin: 5,
              color: appTheme.whiteText,
              alignSelf: props.position === 'right' ? 'flex-end' : 'flex-start',
            },
          ]}>
          {`${
            props.position === 'right' ? 'you' : props.currentMessage.user.name
          }`}
        </CustomText>
        <Bubble
          {...props}
          textStyle={{
            left: {
              color: appTheme.whiteText,
            },
            right: {
              color: appTheme.whiteText,
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: appTheme.bubbleLeft,
            },
            right: {
              backgroundColor: appTheme.bubbleRight,
            },
          }}
        />
      </View>
    );
  };

  const renderSendButton = (props: any) => {
    const sendButtonStyle = {
      width: 40,
      height: 40,
    };
    return (
      <Send
        {...props}
        disabled={isSendingMessage ? true : inputMessage == '' ? true : false}
        containerStyle={{
          justifyContent: 'center',
          marginLeft: 10,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          disabled={isSendingMessage ? true : inputMessage == '' ? true : false}
          style={{
            opacity: isSendingMessage ? 0.4 : 0.9,
          }}
          onPress={() => {
            if (inputMessage && !isSendingMessage) {
              rnVoiceRef?.current?.stopVoiceRecording();
              setIsRecordingOn(false);
              if (userDetail?.userToken === 0) {
                showToast(
                  'Your Free token has been expired, please buy tokens',
                );
              } else sendMessage(inputMessage);
            }
          }}>
          {/* {isSendingMessage ? (
            <View style={[CommonStyle.center, sendButtonStyle]}>
              <Loading />
            </View>
          ) : ( */}
          <Image
            source={AppImages.sendButton}
            style={sendButtonStyle}
            resizeMode={'contain'}
          />
          {/* )} */}
        </TouchableOpacity>
      </Send>
    );
  };

  const renderInputToolbar = (inputToolbarProps: any) => {
    return (
      <InputToolbar
        {...inputToolbarProps}
        containerStyle={{
          backgroundColor: '#76767679',
          padding: 10,
          // paddingTop: redabilityScore.length === 0 ? 15 : 25,
          paddingTop: 10,
          marginBottom: 10,
        }}
        renderSend={renderSendButton}
        renderComposer={renderComposer}
      />
    );
  };

  const renderComposer = (props: ComposerProps) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#2B2B2B',
            borderRadius: 10,
            paddingHorizontal: 10,
          }}>
          <Composer
            {...props}
            textInputProps={{ spellCheck: true, autoCorrect: true }}
            textInputStyle={{ color: appTheme.whiteText }}
            placeholder={translations.INPUT_CHAT_PLACEHOLDER}
            text={inputMessage}
            onTextChanged={onMessageType}
          />
          {showMic ? (
            <RNVoice
              ref={rnVoiceRef}
              onVoiceResult={onVoiceResult}
              isRecordingOn={isRecordingOn}
              setRecordingOn={setRecordingOn}
              showMic={showMic}
            />
          ) : null}
        </View>
        {/* <Text
          style={{
            color: appTheme.bubbleLeft,
            fontWeight: '500',
            fontSize: 15,
            alignSelf: 'center',
            marginLeft: '45%',
            top: -20,
            position: 'absolute',
          }}>
          {redabilityScore}
        </Text> */}
        {isTyping && (
          <Text
            style={{
              color: appTheme.bubbleLeft,
              fontWeight: '500',
              fontSize: 15,
              alignSelf: 'center',
              // marginLeft: '45%',
              top: -30,
              position: 'absolute',
            }}>
            Typing...
          </Text>
        )}
      </>
    );
  };

  const renderChatEmpty = () => {
    return (
      <EmptyComponent
        textStyle={{ transform: [{ scaleY: -1 }] }}
        text={translations.CHAT_EMPTY}
        isLoading={isLoadingData}
      />
    );
  };

  const renderLoadEarlier = () => {
    if (isLoadMoreCalled) {
      return (
        <View style={{ marginVertical: 20 }}>
          <Loading />
        </View>
      );
    }
    return null;
  };

  return (
    <GiftedChat
      messages={messages}
      renderTime={renderTime}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      maxComposerHeight={isIOS ? 112 : 112}
      minInputToolbarHeight={deviceHasNotch ? 70 : 80}
      alwaysShowSend
      renderAvatar={() => null}
      // inverted={false}
      bottomOffset={getBottomSpace()}
      renderChatEmpty={renderChatEmpty}
      loadEarlier={true}
      renderLoadEarlier={renderLoadEarlier}
      onLoadEarlier={onLoadMore}
      keyboardShouldPersistTaps={'handled'}
      infiniteScroll={true}
      user={{
        _id: userDetail._id,
      }}
    />
  );
}
