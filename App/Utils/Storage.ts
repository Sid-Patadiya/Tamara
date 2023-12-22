import AsyncStorage from '@react-native-async-storage/async-storage';
import { Authentication } from '@Utils/Enums';

export const setItemInStorage = async (key: string, data: string) => {
  try {
    return await AsyncStorage.setItem(key, data);
  } catch (error) {
    return null;
  }
};

export const getItemFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const removeStoreItem = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export const setObjectInStore = async (key: string, data: any) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const getObjectFromStore = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};

//KEPT THE TYPE ANY FOR NOW. CHANGE ACCORDINGLY
export const storeMultiDelete = async (keyArray: any) => {
  try {
    return await AsyncStorage.multiRemove(keyArray);
  } catch (error) {
    return null;
  }
};

export const clearStorage = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error: any) {
    return null;
  }
};

export const getUserInfoStorage = async () => {
  try {
    const userInfo = await getObjectFromStore(Authentication.USER_INFO);
    if (!userInfo) {
      return false;
    }
    return userInfo;
  } catch (error: any) {
    return null;
  }
};

export const setUserInfoStorage = async (userInfo: any) => {
  try {
    await setObjectInStore(Authentication.USER_INFO, userInfo);
  } catch (error: any) {
    return null;
  }
};

export const getGuestUserStorage = async () => {
  try {
    const data = await getItemFromStorage(Authentication.GUEST_USER);
    if (!data) {
      return false;
    }
    return true;
  } catch (error: any) {
    return false;
  }
};

export const setGuestUserStorage = async () => {
  try {
    await setItemInStorage(Authentication.GUEST_USER, 'true');
  } catch (error: any) {
    return null;
  }
};
