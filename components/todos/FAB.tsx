import { StyleSheet } from 'react-native';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/Colors';
import AnimatedPressable from '../common/AnimatedPressable';
import useAnimatedFAB from './hooks/useAnimatedFAB';

interface IFAB {
  onClick: () => void;
  bgColor?: string;
}

const FAB = ({ onClick, bgColor }: IFAB) => {
  const {
    FABAnimatedBorderRadius,
    FABAnimatedRightStyle,
    FABAnimatedWidthStyle,
    FABAnimatedYPosition,
  } = useAnimatedFAB();

  return (
    <AnimatedPressable
      onPress={onClick}
      style={[
        styles.FABContainer,
        { backgroundColor: bgColor ? bgColor : 'blue' },
        FABAnimatedYPosition,
        FABAnimatedWidthStyle,
        FABAnimatedRightStyle,
        FABAnimatedRightStyle,
        FABAnimatedBorderRadius,
      ]}
    >
      <Ionicons name="add" color={colors.PRIMARY} size={28} />
    </AnimatedPressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  FABContainer: {
    position: 'absolute',
    height: 60,
    justifyContent: 'center',
    width: 60,
    alignItems: 'center',
    zIndex: 10000,
    borderRadius: 100,
    bottom: 20,
    right: 15,
  },
});
