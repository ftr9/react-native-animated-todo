export type TodoTypes = 'Work' | 'Personal' | 'Gym';

export interface ITask {
  name: string;
  isCompleted: boolean;
}

export interface ITodo {
  name: string;
  image: any;
  backgroundColor: string;
  tasks: ITask[];
}
