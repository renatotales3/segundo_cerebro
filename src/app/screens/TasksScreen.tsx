// /src/app/screens/TasksScreen.tsx
import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useTasksStore } from '../store/slices/tasks';
import Card from '../components/Card';
import SoftButton from '../components/SoftButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import EmptyState from '../components/EmptyState';
import { spacing } from '../theme/spacing';

type TasksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const TasksScreen = () => {
  const navigation = useNavigation<TasksScreenNavigationProp>();
  const tasks = useTasksStore(state => state.tasks);
  const { deleteTask, toggleTaskCompletion } = useTasksStore();

  return (
    <SafeAreaView style={styles.container}>
      {tasks.length === 0 ? (
        <EmptyState title="Sem tarefas" message="Crie sua primeira tarefa para começar a se organizar." />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subtitle={`Prioridade: ${item.priority}`}
              progress={item.progress}
              onPress={() => navigation.navigate('TaskModal', { task: item })}
            />
          )}
          contentContainerStyle={{ padding: spacing.medium }}
        />
      )}
      <View style={styles.fabContainer}>
          <SoftButton 
            title="Nova Tarefa" 
            icon="plus" 
            onPress={() => navigation.navigate('TaskModal', {})} 
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F9' },
  fabContainer: { position: 'absolute', bottom: 30, left: 20, right: 20 },
});

export default TasksScreen;
