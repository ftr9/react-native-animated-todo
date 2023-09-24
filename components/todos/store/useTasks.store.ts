import { create } from 'zustand';

import { ITask, ITodo, TodoTypes } from '../types/interface';

interface IuseTaskStore {
  todos: Record<TodoTypes, ITodo>;
  setTask: (todotype: TodoTypes, task: ITask) => void;
  updateTask: (
    todotype: TodoTypes,
    index: number,
    isCompleted: boolean
  ) => void;
  removeTask: (todoType: TodoTypes, index: number) => void;
  getCompletedTaskInPercentage: (todoType: TodoTypes) => number;
}

const useTasksStore = create<IuseTaskStore>((set, get) => {
  return {
    todos: {
      Personal: {
        name: 'Personal',
        image: require('../../../assets/images/icons/user.png'),
        backgroundColor: '#212529',
        tasks: [
          { name: 'Bath', isCompleted: true },
          { name: 'Go to Gym', isCompleted: false },
        ],
      },
      Gym: {
        name: 'Gym',
        backgroundColor: '#364fc7',
        image: require('../../../assets/images/icons/gym.png'),
        tasks: [
          { name: '20 pull ups', isCompleted: false },
          { name: '20 push ups', isCompleted: true },
        ],
      },
      Work: {
        name: 'Work',
        backgroundColor: '#087f5b',
        image: require('../../../assets/images/icons/briefcase.png'),
        tasks: [
          { name: 'Design review', isCompleted: true },
          { name: 'Setting CI/CI pipeline', isCompleted: false },
        ],
      },
    },
    setTask: (todotype, task) => {
      set(state => {
        const newState = { ...state };
        newState.todos[todotype].tasks.push(task);
        return newState;
      });
    },
    updateTask: (todoType, index, isCompleted) => {
      set(state => {
        const newState = { ...state };
        newState.todos[todoType].tasks[index].isCompleted = isCompleted;
        return newState;
      });
    },
    removeTask: (todoType, index) => {
      set(state => {
        const newState = { ...state };
        const tasks = newState.todos[todoType].tasks;
        newState.todos[todoType].tasks = tasks.filter(
          (_, idx) => idx !== index
        );
        return newState;
      });
    },
    getCompletedTaskInPercentage: (todoType: TodoTypes) => {
      const todos = get().todos;
      const totalTasksofTodo = todos[todoType].tasks.length;
      const completedTasksOfTodo = todos[todoType].tasks.filter(
        task => task.isCompleted === true
      ).length;

      return Number(
        ((completedTasksOfTodo / totalTasksofTodo) * 100).toFixed(0)
      );
    },
  };
});

export default useTasksStore;
