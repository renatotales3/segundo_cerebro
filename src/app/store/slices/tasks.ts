// /src/app/store/slices/tasks.ts
import { create } from 'zustand';
import { Task } from '../types';
import * as SQLite from 'expo-sqlite';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Este é um helper para o DB, seria centralizado em db/sqlite.ts na prática
const db = SQLite.openDatabase('segundo-cerebro.db');

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'|'createdAt'|'completed'|'progress'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTasksStore = create<TaskState>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    await db.transactionAsync(async tx => {
      const result = await tx.executeSqlAsync('SELECT * FROM tasks');
      set({ tasks: result.rows as Task[] });
    });
  },
  addTask: async (task) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      completed: false,
      progress: 0,
    };
    await db.transactionAsync(async tx => {
      await tx.executeSqlAsync(
        'INSERT INTO tasks (id, title, priority, createdAt, completed) VALUES (?, ?, ?, ?, ?)',
        [newTask.id, newTask.title, newTask.priority, newTask.createdAt, 0]
      );
    });
    set(state => ({ tasks: [...state.tasks, newTask] }));
  },
  // Implementar updateTask e deleteTask similarmente...
}));
