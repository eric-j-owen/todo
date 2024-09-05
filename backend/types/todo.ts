export interface ITodo {
  _id?: string;
  task: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
