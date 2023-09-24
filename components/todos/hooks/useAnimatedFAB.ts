import { Keyboard } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Resolution } from '../../../constants/Screen';

const ANIMATION_CONFIG = {
  duration: 500,
};
const useAnimatedFAB = () => {
  const FABRightSharedPosition = useSharedValue(15);
  const FABSharedWidth = useSharedValue(60);
  const FABSharedBorderRadius = useSharedValue(100);
  const FABYSharedPosition = useSharedValue(0);

  const FABAnimatedYPosition = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: FABYSharedPosition.value }],
    };
  });

  const FABAnimatedWidthStyle = useAnimatedStyle(() => {
    return {
      width: FABSharedWidth.value,
    };
  });

  const FABAnimatedRightStyle = useAnimatedStyle(() => {
    return {
      right: FABRightSharedPosition.value,
    };
  });

  const FABAnimatedBorderRadius = useAnimatedStyle(() => {
    return {
      borderRadius: FABSharedBorderRadius.value,
    };
  });

  useEffect(() => {
    const keyboardOpenListener = Keyboard.addListener('keyboardDidShow', e => {
      FABYSharedPosition.value = withTiming(-e.endCoordinates.height);
      FABSharedWidth.value = withTiming(
        Resolution.SCREEN_WIDTH,
        ANIMATION_CONFIG
      );
      FABRightSharedPosition.value = withTiming(0, ANIMATION_CONFIG);
      FABSharedBorderRadius.value = withTiming(0, ANIMATION_CONFIG);
    });

    const keyboardCloseListener = Keyboard.addListener('keyboardDidHide', e => {
      FABYSharedPosition.value = withTiming(0, ANIMATION_CONFIG);
      FABSharedWidth.value = withTiming(60, ANIMATION_CONFIG);
      FABRightSharedPosition.value = withTiming(15, ANIMATION_CONFIG);
      FABSharedBorderRadius.value = withTiming(100, ANIMATION_CONFIG);
    });
    return () => {
      keyboardOpenListener.remove();
      keyboardCloseListener.remove();
    };
  }, []);

  return {
    FABAnimatedYPosition,
    FABAnimatedWidthStyle,
    FABAnimatedRightStyle,
    FABAnimatedBorderRadius,
  };
};

export default useAnimatedFAB;
