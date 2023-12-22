import React from 'react';
import { View, StyleSheet } from 'react-native';
import CommonStyle from '@Theme/CommonStyle';
import { AssetImage } from '@CommonComponent/index';
import AppImages from '@Theme/AppImages';
import { isIOS } from '@Utils/Constant';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});

const SocialIcon = (props: any) => {
  const { viewStyle } = props;

  return (
    <View style={[CommonStyle.rowCenter, viewStyle]}>
      {/* <AssetImage
        isLoadFromLocal
        source={AppImages.facebook}
        imageStyle={styles.icon}
        containerStyle={{ marginHorizontal: 10 }}
        onPress={() => props.onPress('Facebook')}
      /> */}
      {isIOS && appleAuth.isSupported ? (
        <AssetImage
          isLoadFromLocal
          source={AppImages.apple}
          imageStyle={[styles.icon]}
          containerStyle={{ marginHorizontal: 5 }}
          onPress={() => props.onPress('apple')}
        />
      ) : null}
      {/* <AssetImage
        isLoadFromLocal
        source={AppImages.twitter}
        imageStyle={[styles.icon]}
        containerStyle={{ marginHorizontal: 15 }}
        onPress={() => props.onPress('twitter')}
      /> */}
      <AssetImage
        isLoadFromLocal
        source={AppImages.google}
        imageStyle={styles.icon}
        containerStyle={{ marginHorizontal: 10 }}
        onPress={() => props.onPress('google')}
      />
    </View>
  );
};

export { SocialIcon };
