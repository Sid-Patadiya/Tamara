import AppImages from '@Theme/AppImages';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ImageStyle,
  Image,
  Pressable,
} from 'react-native';

interface AssetImageProps {
  imageStyle?: StyleProp<ImageStyle> | any;
  containerStyle?: StyleProp<ViewStyle> | any;
  source: any;
  showLoading?: boolean;
  placeholder?: string;
  errorImage?: string;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat' | any;
  localImage?: boolean;
  isLoadFromLocal?: boolean;
  onPress?: () => void;
}

const AssetImage = (props: AssetImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const renderPlaceholder = () => {
    if (props.placeholder) {
      return (
        <Image
          style={[styles.imageStyle, props.imageStyle]}
          source={{ uri: props.placeholder }}
        />
      );
    } else {
      return <ActivityIndicator />;
    }
  };

  const renderError = () => {
    if (props.errorImage) {
      return (
        <Image
          style={[styles.imageStyle, props.imageStyle]}
          source={{ uri: props.errorImage }}
        />
      );
    } else {
      return <ActivityIndicator />;
    }
  };

  const renderOverLayContainer = () => {
    if (isLoading || isError) {
      return (
        <View
          style={[
            styles.loadingContainer,
            props.imageStyle,
            props.containerStyle,
          ]}>
          {(isLoading && renderPlaceholder()) || renderError()}
        </View>
      );
    }
  };

  if (props.localImage) {
    return (
      <Image
        style={[styles.imageStyle, props.imageStyle]}
        source={props.source}
        resizeMode={props.resizeMode}
      />
    );
  }

  return (
    <Pressable
      onPress={() => props.onPress && props.onPress()}
      style={[styles.container, props.imageStyle, props.containerStyle]}>
      <Image
        style={[styles.imageStyle, props.imageStyle]}
        source={props.isLoadFromLocal ? props.source : { uri: props.source }}
        resizeMode={props.resizeMode}
        onLoadStart={() => {
          setLoading(true);
          setError(false);
        }}
        onLoadEnd={() => {
          setLoading(false);
          setError(false);
        }}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
      {renderOverLayContainer()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { height: 50, width: 50 },
  imageStyle: { height: 50, width: 50 },
  loadingContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const EditAvatar = ({
  size = 100,
  editPencilSize = 30,
  onPress,
  source,
}: any) => {
  const avatarStyle: any = {
    width: size,
    height: size,
    alignSelf: 'center',
  };
  const imageStyle: any = {
    width: size,
    height: size,
    borderRadius: 50,
  };
  const editPencilStyle: any = {
    width: editPencilSize,
    height: editPencilSize,
    position: 'absolute',
    bottom: 0,
    right: 0,
  };
  return (
    <TouchableOpacity onPress={onPress} style={avatarStyle}>
      <Image style={imageStyle} source={source} />
      <Image style={editPencilStyle} source={AppImages.editPencil} />
    </TouchableOpacity>
  );
};

export { AssetImage, EditAvatar };
