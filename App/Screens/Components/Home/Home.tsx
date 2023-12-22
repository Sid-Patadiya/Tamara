import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Alert, BackHandler, Linking } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '@AppContext/index';
import {
  AppHeader,
  AppViewHoc,
  AssetImage,
  HomeCategory,
} from '@CommonComponent/index';
import { navigateToNextScreen } from '@Utils/Helper';
import { Route } from '@Routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeCategory } from '@Actions/HomeActions';
import AppImages from '@Theme/AppImages';
import VersionCheck from 'react-native-version-check';
import * as RNLocalize from 'react-native-localize';

const styles = StyleSheet.create({
  tamaraLogo: {
    height: 40,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
  },
});

const Home = ({ navigation }: any) => {
  const { translations, updateUserProfile } = useContext(AppContext);
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  // const { category } = useSelector((state: any) => state.home || []);

  // useEffect(() => {
  //   const relode = navigation.addListener('focus', () => {
  //     // dispatch(getHomeCategory());
  //     updateUserProfile();
  //   });
  //   return relode;
  // }, [navigation]);

  const onCategoryPress = async (item: any) => {
    let updateNeeded = await VersionCheck.needUpdate();

    if (updateNeeded && updateNeeded.isNeeded) {
      //Alert the user and redirect to the app url
      Alert.alert('', translations.UPDATE_LATEST, [
        {
          text: translations.UPDATE,
          onPress: () => {
            BackHandler.exitApp();
            updateNeeded?.storeUrl && Linking.openURL(updateNeeded?.storeUrl);
          },
        },
      ]);
    } else {
      navigateToNextScreen(navigation, {
        name: Route.ChatScreen,
        params: { categoryKey: item.key, categoryName: item.title },
      });
    }
  };

  return (
    <AppViewHoc addSafeAreaView={false} addScrollView={false}>
      <View style={CommonStyle.flex1}>
        <AppHeader title={''} showDrawer={true} navigation={navigation} />
        <AssetImage
          localImage
          source={AppImages.tamaraLogo}
          imageStyle={styles.tamaraLogo}
          resizeMode={'contain'}
        />
        <HomeCategory category={[]} onPress={onCategoryPress} />
      </View>
    </AppViewHoc>
  );
};

export default Home;
