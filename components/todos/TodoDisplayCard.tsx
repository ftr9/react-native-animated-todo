import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ProgressIndicator from '../common/ProgressIndicator';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import RoundedImageButton from '../common/RoundedImageButton';
import { G_TextStyle, G_LayoutStyles } from '../common/styles';
import { colors } from '../../constants/Colors';
import AnimatedPressable from '../common/AnimatedPressable';
import useTasksStore from './store/useTasks.store';
import { TodoTypes } from './types/interface';

interface ITodoCardProps {
  height: number;
  width: number;
  name: string;
  image: any;
  totalTasks: number;
  todoColor: string;
}

const TodoDisplayCard = ({
  height,
  width,
  name,
  totalTasks,
  image,
  todoColor,
}: ITodoCardProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const sharedOpacityValue = useSharedValue(1);
  const { getCompletedTaskInPercentage } = useTasksStore();
  const animatedOpacityValue = useAnimatedStyle(() => {
    return {
      opacity: sharedOpacityValue.value,
    };
  });

  useEffect(() => {
    //trick to display three dots icon a bit late
    //@reason - when we come back it doesn't quickly show
    sharedOpacityValue.value = withTiming(pathName === '/' ? 1 : 0, {
      duration: 1000,
    });
  }, [pathName]);

  return (
    <AnimatedPressable
      onPress={() => {
        router.push(`/todoDetail/${name}`);
      }}
      style={{
        ...styles.todoCardContainer,
        height,
        width,
      }}
      sharedTransitionTag={`<TodoCard-${name} />`}
    >
      {/**Header */}

      <View style={G_LayoutStyles['flex-Row-JCC-AIC']}>
        <RoundedImageButton
          borderColor={todoColor}
          image={image}
          sharedTransitionTag={`ola123-${name}`}
        />
        <Animated.View style={animatedOpacityValue}>
          <Ionicons name={'ellipsis-vertical'} size={18} color={'#adb5bd'} />
        </Animated.View>
      </View>
      {/**Footer */}
      <View>
        <Animated.Text
          sharedTransitionTag={`<TodoCard2-${name} />`}
          style={{ ...G_TextStyle.smallGrayText, fontSize: 16 }}
        >
          {totalTasks} Tasks
        </Animated.Text>
        <Animated.Text
          sharedTransitionTag={`<TodoCard3-${name} />`}
          style={G_TextStyle.semiLargeText}
        >
          {name}
        </Animated.Text>
        <ProgressIndicator
          progressPercentage={getCompletedTaskInPercentage(name as TodoTypes)}
          progressColor={todoColor}
          sharedTransitionTag={`<ProgressIndicator-${name as TodoTypes} />`}
        />
      </View>
    </AnimatedPressable>
  );
};

export default TodoDisplayCard;

const styles = StyleSheet.create({
  todoCardContainer: {
    position: 'relative',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.PRIMARY,
  },
  todoCardBgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
  },
});
