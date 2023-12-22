import React, { useContext } from 'react';
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native';
import { Loading } from '@CommonComponent/Loading';
import { EmptyComponent } from './EmptyComponent';
import { AppContext } from '@AppContext/index';
import CommonStyle from '@Theme/CommonStyle';

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const List = (props: any) => {
  const {
    data,
    renderItem,
    isLoading,
    isLoadMoreCalled,
    onEndReached,
    refreshing,
    onRefresh,
  } = props;

  const { appTheme } = useContext(AppContext);

  const renderFooter = () => {
    if (!isLoadMoreCalled) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <Loading />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    return <EmptyComponent text={'No Data'} isLoading={isLoading} />;
  };

  return (
    <FlatList
      data={data}
      extraData={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={renderEmptyComponent}
      style={CommonStyle.flex1}
      contentContainerStyle={[
        CommonStyle.listPaddingHorizontal,
        CommonStyle.listPaddingVertical,
        { flexGrow: 1 },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={appTheme.whiteText}
        />
      }
      {...props}
    />
  );
};

export { List };
