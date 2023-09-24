import { StyleSheet } from 'react-native';
import React from 'react';
import { G_LayoutStyles } from '../common/styles/Layout.styles';
import Animated from 'react-native-reanimated';

interface IRoundedImageButonProps {
  image: any;
  sharedTransitionTag: string;
  borderColor?: string;
}

const RoundedImageButton = ({
  image,
  sharedTransitionTag,
  borderColor,
}: IRoundedImageButonProps) => {
  return (
    <Animated.View
      sharedTransitionTag={sharedTransitionTag + 'aa'}
      style={{
        height: 50,
        width: 50,
        borderWidth: 1,
        padding: 15,
        borderRadius: 1000,
        borderColor: borderColor ? borderColor : 'black',
        ...G_LayoutStyles['flex-Row-JCC-AIC'],
      }}
    >
      <Animated.Image
        sharedTransitionTag={sharedTransitionTag + 'bb'}
        style={{
          height: '100%',
          width: '100%',
        }}
        source={image}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default RoundedImageButton;

const styles = StyleSheet.create({});
