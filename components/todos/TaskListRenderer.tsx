import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TaskCard from './TaskCard';
import { ITask, TodoTypes } from '../todos/types/interface';
import useTasksStore from './store/useTasks.store';

interface ITaskListRenderer {
  todoType: TodoTypes;
  tasks: ITask[];
}

const TaskListRenderer = ({ tasks, todoType }: ITaskListRenderer) => {
  const { updateTask, removeTask } = useTasksStore();

  const onCheckBoxValueChanged = (taskIndex: number, isCompleted: boolean) => {
    updateTask(todoType, taskIndex, isCompleted);
  };

  const onDeleteTodoHandle = (taskIndex: number) => {
    removeTask(todoType, taskIndex);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
      }}
    >
      {tasks.map((task, idx) => {
        return (
          <TaskCard
            taskIndex={idx}
            name={task.name}
            onCheckBoxValueChange={onCheckBoxValueChanged}
            onDeleteHandle={onDeleteTodoHandle}
            isCompleted={task.isCompleted}
            key={idx}
          />
        );
      })}
    </ScrollView>
  );
};

export default TaskListRenderer;

const styles = StyleSheet.create({});
