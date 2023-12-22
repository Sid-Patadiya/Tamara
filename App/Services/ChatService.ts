import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';
import { messageActionOption } from '@Utils/Constant';

export const getChatService = async (params: any) => {
  console.log('getChatService',params)

  const response = await axios.post(ApiConfig.getChat, params);
  return response.data;
};

export const sendMessageService = async (params: any) => {
  console.log('sendMessageService',params)
  const response = await axios.post(ApiConfig.sendMessage, params);
  return response.data;
};

export const getHistoryListService = async (params: any) => {
  const response = await axios.post(ApiConfig.historyList, params);
  return response.data;
};

export const messageActionService = async (params: any, action: any) => {
  console.log('messageActionService',params)
  let postUrl = '';
  if (action === messageActionOption.like) {
    postUrl = 'like-message';
  } else if (action === messageActionOption.disLike) {
    postUrl = 'like-message';
  } else if (action === messageActionOption.save) {
    postUrl = 'save-message';
  } else if (action === messageActionOption.unSave) {
    postUrl = `deletesavedmessage/${params.messageid}`;
    const response = await axios.delete(`${ApiConfig.messageAction}${postUrl}`);
    return response.data;
  } else if (action === messageActionOption.delete) {
    postUrl = `deletemessage/${params.messageid}`;
    const response = await axios.delete(`${ApiConfig.messageAction}${postUrl}`);
    return response.data;
  }
  const response = await axios.post(
    `${ApiConfig.messageAction}${postUrl}`,
    params,
  );
  return response.data;
};


export const checkRedability = async (params: any) => {
  const response = await axios.post(ApiConfig.checkredability, params);
  return response.data;
};