import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useMemo } from 'react';
import { Resolution } from '../../constants/Screen';
import { SharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Spacer from '../common/Spacer';
import TodoDisplayCard from './TodoDisplayCard';
import { ITodo, TodoTypes } from '../todos/types/interface';

interface ITodosRendererProps {
  activeIndexSharedValue: SharedValue<number>;
  todos: Record<TodoTypes, ITodo>;
}

const TodosRenderer = ({
  activeIndexSharedValue,
  todos,
}: ITodosRendererProps) => {
  const datas = Object.values(todos);
  const cardWidth = 0.8 * Resolution.SCREEN_WIDTH;

  ////spacing between each cards in a flatList
  const spaceWidth = 0.05 * Resolution.SCREEN_WIDTH;

  const ScrollSnapOffsets = useMemo(() => {
    return datas.map((_, index) => {
      return cardWidth * index + spaceWidth * Math.max(0, index - 1);
    });
  }, []);

  ////Used for getting current index of the list - when index changes we have to change background color
  const momentunScrollEndHandle = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const activeIndex = ScrollSnapOffsets.findIndex(
      el => el === e.nativeEvent.contentOffset.x
    );
    activeIndexSharedValue.value = withSpring(activeIndex);
  };

  return (
    <FlatList
      data={datas}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={'normal'}
      initialNumToRender={15}
      snapToAlignment={'center'}
      snapToOffsets={ScrollSnapOffsets}
      onMomentumScrollEnd={momentunScrollEndHandle}
      ListFooterComponent={<Spacer width={spaceWidth * 2} height={0} />}
      ListHeaderComponent={<Spacer width={spaceWidth} height={0} />}
      ItemSeparatorComponent={() => <Spacer width={spaceWidth} height={0} />}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => (
        <TodoDisplayCard
          height={350}
          width={cardWidth}
          name={item.name}
          image={item.image}
          totalTasks={item.tasks.length}
          todoColor={item.backgroundColor}
        />
      )}
    />
  );
};

export default TodosRenderer;
