import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import ThemeColor from '@Theme/Colors';
import AppImages from '@Theme/AppImages';
import { AppViewHoc } from '@CommonComponent/AppViewHoc';
import CommonStyle from '@Theme/CommonStyle';
import LinearGradient from 'react-native-linear-gradient';
import { AppContext } from '@AppContext/index';
import { goToNextScreen } from '@Utils/Helper';
import { useNavigation } from '@react-navigation/native';
import { Route } from '@Routes/AppRoutes';

const slides = [
  {
    image: AppImages.onboard1,
    msg: 'Check my grammar \n and punctuation',
  },
  {
    image: AppImages.onboard2,
    msg: 'Suggest improvements \n for clarity',
  },
  {
    image: AppImages.onboard1,
    msg: 'Enhance my writing \n style',
  },
  {
    image: AppImages.onboard2,
    msg: 'Assist with word choice \n',
  },
  {
    image: AppImages.onboard1,
    msg: 'Provide suggestions for \n sentence structure',
  },
];

const OnBoarding = (props: any) => {
  const navigation = useNavigation();
  const { appTheme, guestUser, translations } = useContext(AppContext);

  const [data, setData] = useState(slides);
  const scrollref = useRef();

  useEffect(() => {
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //   scrollref.current.scrollToIndex({ index: 0 });
    // });
    // return unsubscribe;
  }, [props.navigation]);

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.directtxt}>{item.msg}</Text>

        <FastImage
          source={item.image}
          style={{
            width: width / 1.1,
            height: height / 1.7,
          }}
          resizeMode="contain"
        />

        <View style={styles.sliderbutton}>
          {data.map((dotitem: any, dotindex: number) => {
            return (
              <View
                style={{
                  backgroundColor: ThemeColor.lightGreen,
                  height: index === dotindex ? 28 : 20,
                  width: index === dotindex ? 28 : 20,
                  borderRadius: 30,
                  marginHorizontal: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <LinearGradient
                  colors={appTheme.gradient}
                  start={{ x: 0.0, y: 1.0 }}
                  key={index}
                  end={{ x: 1.0, y: 1.0 }}
                  style={{
                    height: index === dotindex ? 20 : 13,
                    width: index === dotindex ? 20 : 13,
                    borderRadius: 30,
                  }}></LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <AppViewHoc addSafeAreaView={false} addScrollView={false}>
      <View style={CommonStyle.flex1}>
        {/* <ScrollView
          bounces={false}
          nestedScrollEnabled
          //   keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}> */}
        <FlatList
          data={data}
          ref={scrollref}
          renderItem={renderItem}
          pagingEnabled
          horizontal
          scrollEnabled
          onMomentumScrollEnd={event => {
            const index = Math.floor(
              event.nativeEvent.contentOffset.x /
                event.nativeEvent.layoutMeasurement.width,
            );
            console.log(index);
            if (index === 4) {
              goToNextScreen(navigation, Route.LoginScreen);
            }
          }}
          showsHorizontalScrollIndicator={false}
        />
        {/* </ScrollView> */}
      </View>
    </AppViewHoc>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    marginTop: 50,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  sliderbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  directtxt: {
    marginBottom: 50,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: ThemeColor.white,
  },

  redioview: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderColor: ThemeColor.primary,
    borderWidth: 2,
    marginHorizontal: 8,
  },
});
