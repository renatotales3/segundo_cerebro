// /src/app/navigation/index.tsx
import { Task, Note, Event, ReadingItem, Habit, Goal, Transaction, Grade } from '../store/types';

export type TabParamList = {
  Dashboard: undefined;
  Notes: undefined;
  Tasks: undefined;
  Calendar: undefined;
  Reading: undefined;
  Habits: undefined;
  Goals: undefined;
  Finance: undefined;
  Studies: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Main: undefined; // Rota para o TabNavigator
  NoteModal: { note?: Note };
  TaskModal: { task?: Task };
  EventModal: { event?: Event };
  ReadingModal: { item?: ReadingItem };
  HabitModal: { habit?: Habit };
  GoalModal: { goal?: Goal };
  TransactionModal: { transaction?: Transaction };
  GradeModal: { grade?: Grade };
};
