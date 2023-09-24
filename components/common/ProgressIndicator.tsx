import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import useTasksStore from '../todos/store/useTasks.store';
import { TodoTypes } from '../todos/types/interface';

interface IProgressIndicator {
  progressColor?: string;
  sharedTransitionTag?: string;
  progressPercentage: number;
}

//<ProgressIndicator />
const ProgressIndicator = ({
  progressColor,
  sharedTransitionTag,
  progressPercentage,
}: IProgressIndicator) => {
  return (
    <Animated.View sharedTransitionTag={sharedTransitionTag}>
      <Animated.Text
        style={{ ...styles.progressText, color: progressColor }}
        sharedTransitionTag={`${sharedTransitionTag}-1`}
      >
        {progressPercentage}%
      </Animated.Text>
    </Animated.View>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({
  progressText: {
    color: '#adb5bd',
    fontSize: 48,
    fontWeight: '500',
  },
});
