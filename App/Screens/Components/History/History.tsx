/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { AppContext } from '@AppContext/index';
import {
  AppHeader,
  AppViewHoc,
  List,
  CustomText,
  AssetImage,
} from '@CommonComponent/index';
import {
  messageActionOption,
  paginationLimit,
  paginationStartFrom,
} from '@Utils/Constant';
import {
  getHistoryListService,
  messageActionService,
} from '@Services/ChatService';
import CommonStyle from '@Theme/CommonStyle';
import { normalFormateDateTime, share, showToast } from '@Utils/Helper';
import AppImages from '@Theme/AppImages';

const styles = StyleSheet.create({
  itemView: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
});

let page = paginationStartFrom;

const History = ({ navigation }: any) => {
  const { translations, appTheme } = useContext(AppContext);
  const { itemView } = styles;
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreCalled, setLoadMoreCalled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [historyData, setHistoryData] = useState<any>([]);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      getList();
    });
    return unsubscribe;
  }, [navigation]);

  const getList = async () => {
    try {
      const params = {
        numberofdocs: paginationLimit,
        currentpage: page,
      };
      const response = await getHistoryListService(params);
      setIsLoading(false);
      setLoadMoreCalled(false);
      setRefreshing(false);
      if (response?.data?.data) {
        const data =
          page === 1
            ? response.data.data
            : [...historyData, ...response.data.data];
        setHistoryData(data);
        page === 1 && setTotalData(response.data.totalCount);
      }
    } catch (err: any) {
      setIsLoading(false);
      setLoadMoreCalled(false);
      console.log(err);
    }
  };

  const onEndReached = () => {
    if (totalData > historyData?.length && !loadMoreCalled && !refreshing) {
      page = page + 1;
      setLoadMoreCalled(true);
      getList();
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    page = paginationStartFrom;
    setIsLoading(true);
    setLoadMoreCalled(false);
    getList();
  };

  const getDate = (date: any) => {
    return normalFormateDateTime(date);
  };

  const updateList = (history: any) => {
    const result = historyData.filter((item: any) => item._id !== history._id);
    setHistoryData(result);
    setTotalData(totalData - 1);
  };

  const deleteHistory = async (item: any) => {
    try {
      const params = { messageid: item.message_id };
      const response = await messageActionService(
        params,
        messageActionOption.unSave,
      );
      showToast(response?.data);
      if (response?.data) {
        updateList(item);
      }
    } catch (error: any) {
      // showToast(error?.response?.data?.data);
      console.log(error);
    }
  };

  const deleteHistoryAlert = (item: any) => {
    Alert.alert('', translations.DELETE_HISTORY, [
      {
        text: translations.CANCEL,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: translations.DELETE,
        onPress: () => deleteHistory(item),
      },
    ]);
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
        <View
          style={[
            itemView,
            CommonStyle.flex1,
            {
              backgroundColor: appTheme.inputBg,
            },
          ]}>
          <View style={[CommonStyle.flex1, CommonStyle.rowAlignItems]}>
            <CustomText
              style={[CommonStyle.flex1, { color: appTheme.whiteText }]}>
              {item.categoryname || 'TAMARA bot!'}
            </CustomText>
            <AssetImage
              isLoadFromLocal
              source={AppImages.delete}
              imageStyle={{ width: 20, height: 20 }}
              resizeMode={'contain'}
              onPress={() => deleteHistoryAlert(item)}
            />
            <AssetImage
              isLoadFromLocal
              source={AppImages.share}
              containerStyle={{ marginLeft: 15 }}
              imageStyle={{ width: 20, height: 20 }}
              resizeMode={'contain'}
              onPress={() => share(item.text)}
            />
          </View>
          <CustomText
            // numberOfLines={5}
            style={[
              { color: appTheme.whiteText },
            ]}>{`${item.text}`}</CustomText>
          <CustomText
            style={[
              {
                color: appTheme.inputPlaceholder,
                alignSelf: 'flex-end',
                marginTop: 5,
              },
            ]}>{`${getDate(item.createdAt)}`}</CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppViewHoc addScrollView={false}>
      <AppHeader
        title={translations.HISTORY}
        showDrawer={true}
        navigation={navigation}
      />
      <List
        data={historyData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        isLoading={isLoading}
        isLoadMoreCalled={loadMoreCalled}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
      />
    </AppViewHoc>
  );
};

export default History;
