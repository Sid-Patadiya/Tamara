/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Keyboard,
  Text,
  Platform,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AppContext } from '@AppContext/index';
import { AppHeader, AppViewHoc } from '@CommonComponent/index';
import { GiftedChatComponent } from '@Components/Chat/Component/GiftedChatComponent';
import {
  checkRedability,
  getChatService,
  messageActionService,
  sendMessageService,
} from '@Services/ChatService';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  messageActionOption,
  paginationLimit,
  paginationStartFrom,
} from '@Utils/Constant';
import { share, showToast } from '@Utils/Helper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNIap from 'react-native-iap';
import {
  getObjectFromStore,
  removeStoreItem,
  setObjectInStore,
} from '@Utils/Storage';
import { Authentication } from '@Utils/Enums';
import AppImages from '@Theme/AppImages';
import ThemeColor from '@Theme/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { getUserDetailService } from '@Services/UserService';

let page = paginationStartFrom;

export const productId = Platform.select({
  ios: ['tamara_1.3', 'tamara_1.1'],
  android: ['test1', 'test2'],
});

var onSubmit = false;

const data = [
  { label: 'Arabic', value: '1' },
  { label: 'Bengali', value: '2' },
  { label: 'German', value: '3' },
  { label: 'English', value: '4' },
  { label: 'French', value: '5' },
  { label: 'Gujrati', value: '6' },
  { label: 'Hausa', value: '7' },
  { label: 'Hindi', value: '8' },
  { label: 'Indonesian', value: '9' },
  { label: 'Italian', value: '10' },
  { label: 'Japanese', value: '11' },
  { label: 'Javanese', value: '12' },
  { label: 'Kannada', value: '13' },
  { label: 'Marathi', value: '14' },
  { label: 'Portuguese', value: '15' },
  { label: 'Punjabi', value: '16' },
  { label: 'Russian', value: '17' },
  { label: 'Spanish', value: '18' },
  { label: 'Swahili', value: '19' },
  { label: 'Tamil', value: '20' },
  { label: 'Telugu', value: '21' },
  { label: 'Thai', value: '22' },
  { label: 'Turkish', value: '23' },
  { label: 'Urdu', value: '24' },
  { label: 'Vietnamese', value: '25' },
];

const promptData = [
  { label: 'Check my grammar and punctuation', value: '1' },
  { label: 'Suggest improvements for clarity', value: '2' },
  { label: 'Enhance my writing style', value: '3' },
  { label: 'Assist with word choice', value: '4' },
  { label: 'Provide suggestions for sentence structure', value: '5' },
];

const formality = ['Casual', 'Netural', 'Formal'];

const tone = [
  'Personable',
  'Confident',
  'Empathetic',
  'Engaging',
  'Witty',
  'Direct',
];

const Chat = ({ navigation, route }: any) => {
  const categoryKey = route?.params?.categoryKey;
  const categoryName = route?.params?.categoryName;
  // console.log('categoryKey', route?.params);

  const insets = useSafeAreaInsets();
  const { userDetail, translations, appTheme, guestUser } =
    useContext(AppContext);
  const [messages, setMessages] = useState<any>([]);
  const [isLoadingData, setIsLoadingData] = useState<any>(true);
  const [isSendingMessage, setIsSendingMessage] = useState<any>(false);
  const [isTyping, setIsTyping] = useState<any>(false);
  const [inputMessage, setInputMessage] = useState<any>('');
  const [isLoadMore, setIsLoadMore] = useState<any>(true);
  const [isRecordingOn, setIsRecordingOn] = useState<any>(false);
  const [isLoadMoreCalled, setIsLoadMoreCalled] = useState<any>(false);
  const [filterModalVisible, setFilterModalVisible] = useState<any>(false);
  const [showMic, setShowMic] = useState(true);
  const [messageTime, setMessageTime] = useState([]);
  // const [redabilityScore, setRedabilityScore] = useState<string>('');
  const [value, setValue] = useState({
    label: '',
    value: null,
  });

  const [promptValue, setPromptValue] = useState({
    label: '',
    value: null,
  });

  const [formalityValue, setFormalityValue] = useState({
    id: null,
    value: '',
  });

  const [toneValue, setToneValue] = useState({
    id: null,
    value: '',
  });

  // console.log('messages', messages);
  useEffect(() => {
    page = paginationStartFrom;
    onSubmit = false;

    if (guestUser) {
      setMessages([]);
      setIsLoadingData(false);
    } else {
      getChat();
    }

    (async () => {
      const result = await RNIap.initConnection();
      const getPurchaseHistory = await RNIap.getAvailablePurchases();
      const TIME = await getObjectFromStore(Authentication.TIME);
      if (TIME !== null) {
        if (new Date().getTime() - TIME[0] >= 60 * 60 * 1000) {
          await removeStoreItem(Authentication.TIME);
          setMessageTime([]);
        } else {
          setMessageTime(TIME);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowMic(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowMic(true); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const canSendMessage = () => {
    const currentTime = new Date().getTime();
    let messageTimestamps = [];
    // Remove timestamps older than one hour
    messageTimestamps = messageTime.filter(timestamp => {
      return currentTime - timestamp < 60 * 60 * 1000;
    });

    // Check if the number of sent messages is less than 1
    if (messageTimestamps.length < 1) {
      return true;
    } else {
      // Check if one hour has passed since the first message

      return currentTime - messageTime[0] >= 60 * 60 * 1000;
    }
  };

  const generateRandomNumber = () => {
    let randomNumber = '';
    for (let i = 0; i < 16; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  };

  const sendMessage = async (msg: any) => {
    setIsSendingMessage(true);
    if (guestUser) {
      showToast(
        'If you want to perform further then register yourself, right now you are guest user.',
      );
      return;
    }

    var purchases = await RNIap.getAvailablePurchases();
    console.log(purchases, 'purchases');

    if (Platform.OS === 'android') {
      var filter = purchases.filter(item => item.autoRenewingAndroid === true);
      // console.log('filter', filter);
    } else {
      const uniqueArray: any = [];

      productId?.map((itm, idx) => {
        purchases.filter(item => {
          if (item.productId === itm) {
            uniqueArray.push({ productId: item.productId });
          }
        });
      });

      // Create a Set to store unique values
      const uniqueSet = new Set(uniqueArray.map(JSON.stringify));

      var filter = Array.from(uniqueSet).map(JSON.parse);
    }

    let activeplan1 = false;
    let activeplan2 = false;

    filter.forEach(purchase => {
      if (Platform.OS === 'android') {
        if (purchase.productId == 'test1') {
          activeplan1 = true;
        } else if (purchase.productId == 'test2') {
          activeplan1 = false;
          activeplan2 = true;
        }
      } else if (Platform.OS === 'ios') {
        if (purchase.productId == 'tamara_1.3') {
          activeplan1 = true;
        } else if (purchase.productId == 'tamara_1.1') {
          activeplan1 = false;
          activeplan2 = true;
        }
      }
    });
    const { data } = await getUserDetailService();

    if (
      data.email === 'sid1@yopmail.com' ||
      data.email === 'rachusachdeva29@gmail.com' ||
      data.email === 'shikhachaudhary.hiet@gmail.com' ||
      data.email === 'hirendudhat02@gmail.com'
    ) {
      activeplan2 = true;
    }

    if (activeplan1 === false && activeplan2 === false) {
      showToast(translations.BUY_SUBSCRIPTION);
    } else {
      if (activeplan1) {
        if (canSendMessage()) {
          // Add the current timestamp to the array

          try {
            const message: any = {
              _id: generateRandomNumber(),
              message: msg,
              message_from: 'user',
              createdAt: new Date(),
              isLike: false,
              isDisLike: false,
              isSave: false,
              translator: false,
              user: {
                _id: userDetail._id,
                name: userDetail.name,
              },
            };

            const userMessage: any = formateSingleMessage(message) || {};
            await setMessages((previousMessages: any) =>
              GiftedChat.append(previousMessages, [userMessage]),
            );

            // Keyboard.dismiss();
            // setRedabilityScore('');
            setInputMessage('');
            setIsTyping(true);
            setIsSendingMessage(true);

            const params = {
              message: msg,
              category_key: categoryKey,
              tone: onSubmit === true ? toneValue.value : '',
              replyIn: onSubmit === true ? value.label : '',
              formality: onSubmit === true ? formalityValue.value : '',
              promptfilter: onSubmit === true ? promptValue.value : '',
            };
            const response = await sendMessageService(params);

            if (response.data) {
              // set 1 request in hr
              const temp: any = messageTime;

              temp.push(new Date().getTime());

              await setObjectInStore(Authentication.TIME, temp);
              setMessageTime(temp);

              //----
              const data = messages;
              data.pop();
              setMessages(data);

              const userMessage: any =
                formateSingleMessage(response.data?.userMessage) || {};
              const chatGPTMessage: any =
                formateSingleMessage(response.data?.chatGPTMessage) || {};
              await setMessages((previousMessages: any) =>
                GiftedChat.append(previousMessages, [
                  chatGPTMessage,
                  userMessage,
                ]),
              );
            }
            // setInputMessage('');
            setIsSendingMessage(false);
            setIsTyping(false);
          } catch (error: any) {
            setIsSendingMessage(false);
            setIsTyping(false);
            console.log(error.message);
          }
        } else {
          setInputMessage('');
          setIsSendingMessage(false);
          setIsTyping(false);
          showToast(translations.PLAN_LIMIT_REACHED);
        }
      } else if (activeplan2) {
        try {
          const message: any = {
            _id: generateRandomNumber(),
            message: msg,
            message_from: 'user',
            createdAt: new Date(),
            isLike: false,
            isDisLike: false,
            isSave: false,
            translator: false,
            user: {
              _id: userDetail._id,
              name: userDetail.name,
            },
          };
          const userMessage: any = formateSingleMessage(message) || {};
          await setMessages((previousMessages: any) =>
            GiftedChat.append(previousMessages, [userMessage]),
          );
          // Keyboard.dismiss();

          // setRedabilityScore('');
          setInputMessage('');
          setIsSendingMessage(true);
          setIsTyping(true);
          const params = {
            message: msg,
            category_key: categoryKey,
            tone: onSubmit === true ? toneValue.value : '',
            replyIn: onSubmit === true ? value.label : '',
            formality: onSubmit === true ? formalityValue.value : '',
            promptfilter: onSubmit === true ? promptValue.value : '',
          };
          const response = await sendMessageService(params);

          if (response.data) {
            const data = messages;
            data.pop();
            setMessages(data);

            const userMessage: any =
              formateSingleMessage(response.data?.userMessage) || {};

            const chatGPTMessage: any =
              formateSingleMessage(response.data?.chatGPTMessage) || {};

            await setMessages((previousMessages: any) =>
              GiftedChat.append(previousMessages, [
                chatGPTMessage,
                userMessage,
              ]),
            );
          }
          setIsSendingMessage(false);
          setIsTyping(false);
        } catch (error: any) {
          setIsSendingMessage(false);
          setIsTyping(false);
          console.log(error.message);
        }
      }
    }
    // } catch (err: any) {
    //   console.warn(err); // standardized err.code and err.message available
    //   showToast(err.message);
    // }
  };

  const getChat = async (key: boolean) => {
    try {
      if (key !== false) {
        setIsLoadingData(true);
      }

      const params = {
        categorykey: categoryKey,
        numberofdocs: paginationLimit,
        currentpage: page,
      };
      const response = await getChatService(params);
      // console.log('response', response);
      setIsLoadMoreCalled(false);
      setIsLoadingData(false);
      if (response?.data?.data) {
        formatMessages(response.data.data);
        if (response.data.data?.length < paginationLimit) {
          setIsLoadMore(false);
        }
      } else {
        setIsLoadMore(false);
      }
    } catch (error: any) {
      setIsLoadMore(false);
      setIsLoadingData(false);
      setIsLoadMoreCalled(false);
      console.log(error);
    }
  };

  const formateSingleMessage = (msg: any) => {
    let data = {
      _id: msg._id,
      text: msg.message,
      createdAt: msg.createdAt,
      message_from: msg.message_from,
      categorykey: msg.categorykey,
      isLike: msg.isLike,
      isDisLike: msg.isDisLike,
      isSave: msg.isSave,
      translator: msg.translator,
      user: {
        _id: userDetail._id,
        name: userDetail.name,
        avatar: null,
      },
    };
    if (msg.message_from === 'chatgpt') {
      data.user = {
        _id: msg.categorykey,
        name: 'TAMARA bot!',
        avatar: null,
      };
    }
    return data;
  };

  const formatMessages = (messagesResponse: any) => {
    const result = messagesResponse.map((msg: any) => {
      return formateSingleMessage(msg);
    });
    const data = page === 1 ? result : [...messages, ...result];
    setMessages(data);
  };

  const updateMessages = (messageDetail: any, action: any) => {
    let messagesDefault: any = messages;
    let messageResult: any = [];
    if (action === messageActionOption.like) {
      messageResult = messagesDefault.map((item: any) => {
        if (messageDetail._id === item._id) {
          item.isLike = !item.isLike;
          item.isDisLike = item.isLike ? false : item.disLike;
        }
        return item;
      });
    } else if (action === messageActionOption.disLike) {
      messageResult = messagesDefault.map((item: any) => {
        if (messageDetail._id === item._id) {
          item.isDisLike = !item.isDisLike;
          item.isLike = item.isDisLike ? false : item.isLike;
        }
        return item;
      });
    } else if (action === messageActionOption.save) {
      messageResult = messagesDefault.map((item: any) => {
        if (messageDetail._id === item._id) {
          item.isSave = !item.isSave;
        }
        return item;
      });
    } else if (action === messageActionOption.unSave) {
      messageResult = messagesDefault.map((item: any) => {
        if (messageDetail._id === item._id) {
          item.isSave = !item.isSave;
        }
        return item;
      });
    } else if (action === messageActionOption.translator) {
      messageResult = messagesDefault.map((item: any) => {
        if (messageDetail._id === item._id) {
          item.translator = !item.translator;
        }
        return item;
      });
    } else if (action === messageActionOption.delete) {
      messageResult = messagesDefault.filter((item: any) => {
        if (messageDetail._id !== item._id) {
          return item;
        }
      });
    }
    getChat(false);
    // setMessages(messageResult);
  };

  const messageAction = async (
    messageDetail: any,
    action: any,
    params: any,
  ) => {
    try {
      const response = await messageActionService(params, action);
      if (response?.data) {
        updateMessages(messageDetail, action);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const manageMessageAction = (action: any, messageDetail: any) => {
    let params: any = {
      id: messageDetail._id,
    };
    if (action === messageActionOption.like) {
      params.likestatus = !messageDetail.isLike;
      params.dislikestatus =
        !messageDetail.isLike && messageDetail.isDisLike
          ? false
          : messageDetail.isDisLike;
      messageAction(messageDetail, messageActionOption.like, params);
    } else if (action === messageActionOption.disLike) {
      params.likestatus =
        !messageDetail.isDisLike && messageDetail.isLike
          ? false
          : messageDetail.isLike;
      params.dislikestatus = !messageDetail.isDisLike;
      messageAction(messageDetail, messageActionOption.disLike, params);
    } else if (action === messageActionOption.save) {
      params = { messageid: params.id };
      showToast(translations.SAVED_HISTORY);
      messageAction(messageDetail, messageActionOption.save, params);
    } else if (action === messageActionOption.unSave) {
      params = { messageid: params.id };
      messageAction(messageDetail, messageActionOption.unSave, params);
    } else if (action === messageActionOption.translator) {
      messageAction(messageDetail, messageActionOption.translator, params);
    } else if (action === messageActionOption.share) {
      share(messageDetail.text);
    } else if (action === messageActionOption.delete) {
      params = { messageid: params.id };
      messageAction(messageDetail, messageActionOption.delete, params);
    } else {
      console.log('Invalid message action type');
    }
  };

  const onLoadMore = () => {
    if (!isLoadMoreCalled && messages.length && isLoadMore) {
      page = page + 1;
      setIsLoadMoreCalled(true);
      // getChat();
    }
  };
  // useEffect(() => {
  //   (async () => {
  //     const param = {
  //       text: inputMessage,
  //     };
  //     if (inputMessage.length !== 0) {
  //       if (inputMessage.length % 2 === 0) {
  //         const checkRedabilityScore = await checkRedability(param);

  //         setRedabilityScore(checkRedabilityScore.data);
  //       }
  //     } else {
  //       setRedabilityScore('');
  //     }
  //   })();
  // }, [inputMessage]);

  const handleSubmit = () => {
    setFilterModalVisible(false);
    onSubmit = true;
  };

  const handleReset = () => {
    onSubmit = false;
    setFilterModalVisible(false);
    setFormalityValue({
      id: null,
      value: '',
    });
    setToneValue({
      id: null,
      value: '',
    });
    setValue({
      label: '',
      value: null,
    });
    setPromptValue({
      label: '',
      value: null,
    });
  };

  const disable = useCallback(() => {
    if (formalityValue.id === null) {
      return true;
    } else if (toneValue.id === null) {
      return true;
    } else if (value.value === null) {
      return true;
    } else if (promptValue.value === null) {
      return true;
    } else {
      return false;
    }
  }, [formalityValue, toneValue, value, promptValue]);

  const renderItem = (
    item: any,
    index: number,
    onPress: any,
    borderColor: any,
    backgroundColor: any,
    color: any,
  ) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderWidth: 1,
          borderRadius: 30,
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginRight: 5,
          marginTop: 7,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        }}>
        <Text
          style={{
            color: color,
            fontWeight: '500',
            fontSize: 13,
            alignSelf: 'center',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppViewHoc addSafeAreaView={false} removeKeyBoardAvoidView={true}>
      <View style={[CommonStyle.flex1, { marginBottom: insets.bottom - 10 }]}>
        <AppHeader
          title={categoryName}
          navigation={navigation}
          leftImage
          rightImage={AppImages.filter}
          rightImagePress={() => setFilterModalVisible(true)}
        />
        <GiftedChatComponent
          messages={messages}
          isLoadingData={isLoadingData}
          isSendingMessage={isSendingMessage}
          sendMessage={sendMessage}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isRecordingOn={isRecordingOn}
          setIsRecordingOn={setIsRecordingOn}
          manageMessageAction={manageMessageAction}
          isLoadMoreCalled={messages.length && isLoadMore}
          onLoadMore={onLoadMore}
          showMic={showMic}
          isTyping={isTyping}
          // redabilityScore={redabilityScore}
        />
        <Modal
          visible={filterModalVisible}
          onRequestClose={handleReset}
          transparent>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: ThemeColor.semiTransparent,
            }}>
            <View
              style={{
                backgroundColor: ThemeColor.white,
                padding: 20,
                borderRadius: 20,
                marginHorizontal: 10,
              }}>
              <View style={{ borderRadius: 10, borderWidth: 1, padding: 10 }}>
                <Text
                  style={{
                    color: ThemeColor.black,
                    fontWeight: '500',
                    fontSize: 17,
                  }}>
                  Formality
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 5,
                  }}>
                  {formality.map((item, index) => {
                    return renderItem(
                      item,
                      index,
                      () => {
                        setFormalityValue({ id: index, value: item });
                      },
                      formalityValue.id == index
                        ? ThemeColor.bubbleLeft
                        : ThemeColor.gray2,
                      formalityValue.id == index
                        ? ThemeColor.bubbleLeft
                        : ThemeColor.white,
                      formalityValue.id == index
                        ? ThemeColor.white
                        : ThemeColor.gray,
                    );
                  })}
                </View>
                <Text
                  style={{
                    color: ThemeColor.black,
                    fontWeight: '500',
                    fontSize: 17,
                  }}>
                  Tone
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 5,
                  }}>
                  {tone.map((item, index) => {
                    return renderItem(
                      item,
                      index,
                      () => {
                        setToneValue({ id: index, value: item });
                      },
                      toneValue.id == index
                        ? ThemeColor.bubbleLeft
                        : ThemeColor.gray2,
                      toneValue.id == index
                        ? ThemeColor.bubbleLeft
                        : ThemeColor.white,
                      toneValue.id == index
                        ? ThemeColor.white
                        : ThemeColor.gray,
                    );
                  })}
                </View>
                <Text
                  style={{
                    color: ThemeColor.black,
                    fontWeight: '500',
                    fontSize: 17,
                  }}>
                  Prompts
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={promptData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Prompts"
                  value={promptValue.value}
                  onChange={(item: any) => {
                    setPromptValue({
                      label: item.label,
                      value: item.value,
                    });
                  }}
                />
                <Text
                  style={{
                    color: ThemeColor.black,
                    fontWeight: '500',
                    fontSize: 17,
                  }}>
                  I write in
                </Text>

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Language"
                  value={value.value}
                  onChange={(item: any) => {
                    console.log(item);
                    setValue({
                      label: item.label,
                      value: item.value,
                    });
                  }}
                />
                <Text
                  style={{
                    color: ThemeColor.gray2,
                    fontWeight: '500',
                    fontSize: 14,
                    marginTop: 5,
                    // textAlign: 'justify',
                  }}>
                  These text setting will apply to any text you generate with
                  TAMARA.
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    //  disabled={disable()}
                    onPress={handleReset}
                    style={{
                      borderWidth: 1,
                      borderColor: ThemeColor.primary,
                      paddingVertical: 5,
                      borderRadius: 5,
                      paddingHorizontal: 15,
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        color: ThemeColor.black,
                        fontWeight: '500',
                        fontSize: 17,
                      }}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={disable()}
                    onPress={handleSubmit}
                    style={{
                      backgroundColor:
                        disable() == true
                          ? ThemeColor.lightBlue
                          : ThemeColor.bubbleLeft,
                      paddingVertical: 5,
                      borderRadius: 5,
                      paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{
                        color: ThemeColor.white,
                        fontWeight: '500',
                        fontSize: 17,
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleReset}
                  style={{ position: 'absolute', right: 10, top: 10 }}>
                  <Image
                    source={AppImages.cross}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: ThemeColor.black,
                    }}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </AppViewHoc>
  );
};

export default Chat;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: ThemeColor.gray,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: ThemeColor.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
