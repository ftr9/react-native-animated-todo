import { StyleSheet, Text, StatusBar, View, Keyboard } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import RoundedImageButton from '../../components/common/RoundedImageButton';
import { G_LayoutStyles, G_TextStyle } from '../../components/common/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedPressable from '../../components/common/AnimatedPressable';
import ProgressIndicator from '../../components/common/ProgressIndicator';
import { Ionicons } from '@expo/vector-icons';
import TaskListRenderer from '../../components/todos/TaskListRenderer';
import FAB from '../../components/todos/FAB';
import { Resolution } from '../../constants/Screen';
import AddTaskModal from '../../components/todos/AddTaskModal';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { TodoTypes } from '../../components/todos/types/interface';
import useTasksStore from '../../components/todos/store/useTasks.store';

const TodoDetails = () => {
  const insets = useSafeAreaInsets();
  const { todoType } = useGlobalSearchParams<{ todoType: TodoTypes }>();
  const { todos, setTask, getCompletedTaskInPercentage } = useTasksStore();
  const todoDetails = todos[todoType];
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [taskNameValue, setTaskNameValue] = useState('');
  const router = useRouter();

  const addTodoButtonHandle = () => {
    if (!isAddTaskModalOpen) {
      setAddTaskModalOpen(true);
      return;
    }
    if (!taskNameValue) {
      return;
    }
    Keyboard.dismiss();
    setAddTaskModalOpen(false);
    setTask(todoType, { name: taskNameValue, isCompleted: false });
    setTaskNameValue('');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: todos[todoType].backgroundColor,
      }}
    >
      <StatusBar barStyle={'light-content'} />
      {/**TodoDetails container */}
      <AnimatedPressable
        sharedTransitionTag={`<TodoCard-${todoDetails.name} />`}
        style={{ ...styles.todoDetailsContainer, marginTop: insets.top }}
      >
        {/**Todo Details Header */}
        <Animated.View
          entering={FadeIn.duration(1500)}
          exiting={FadeOut}
          style={[G_LayoutStyles['flex-Row-JCC-AIC'], { padding: 15 }]}
        >
          <Ionicons
            onPress={() => {
              router.back();
            }}
            size={18}
            name="chevron-back-outline"
            color={'black'}
          />

          <Ionicons size={18} name="ellipsis-vertical" color={'black'} />
        </Animated.View>

        {/**Todo Details body */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 40,
            paddingTop: 30,
          }}
        >
          <RoundedImageButton
            sharedTransitionTag={`ola123-${todoDetails.name}`}
            image={todoDetails.image}
            borderColor={todoDetails.backgroundColor}
          />

          <Animated.Text
            sharedTransitionTag={`<TodoCard2-${todoDetails.name} />`}
            style={[G_TextStyle.smallGrayText, { fontSize: 16, marginTop: 20 }]}
          >
            {todoDetails.tasks.length} Tasks
          </Animated.Text>

          <Animated.Text
            sharedTransitionTag={`<TodoCard3-${todoDetails.name} />`}
            style={[G_TextStyle.semiLargeText]}
          >
            {todoDetails.name}
          </Animated.Text>
          <ProgressIndicator
            progressPercentage={getCompletedTaskInPercentage(todoType)}
            progressColor={todoDetails.backgroundColor}
            sharedTransitionTag={`<ProgressIndicator-${todoType} />`}
          />
          <Animated.Text
            entering={FadeIn.duration(500)}
            exiting={FadeOut}
            style={[
              G_TextStyle.smallGrayText,
              { marginTop: 20, marginBottom: 10 },
            ]}
          >
            Task To-Do
          </Animated.Text>
          {/**Show task list */}
          <TaskListRenderer tasks={todoDetails.tasks} todoType={todoType} />
        </View>

        {/**Absolute Add button */}
        <FAB
          bgColor={todoDetails.backgroundColor}
          onClick={addTodoButtonHandle}
        />

        {/**Popup  */}
        {isAddTaskModalOpen && (
          <AddTaskModal>
            <AddTaskModal.Header
              onCloseClick={() => setAddTaskModalOpen(false)}
            />
            <AddTaskModal.InputTask
              value={taskNameValue}
              setValue={setTaskNameValue}
            />
            <AddTaskModal.TaskArea
              image={todoDetails.image}
              todoName={todoDetails.name}
            ></AddTaskModal.TaskArea>
          </AddTaskModal>
        )}
      </AnimatedPressable>
    </View>
  );
};

export default TodoDetails;

const styles = StyleSheet.create({
  todoDetailsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: Resolution.SCREEN_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
  },
});
