// /src/app/modals/TaskModal.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useTasksStore } from '../store/slices/tasks';
import { Task } from '../store/types';
import SoftInput from '../components/SoftInput';
import SoftButton from '../components/SoftButton';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type TaskModalRouteProp = RouteProp<{ params: { task?: Task } }, 'params'>;

const TaskModal = () => {
  const route = useRoute<TaskModalRouteProp>();
  const navigation = useNavigation();
  const { addTask, updateTask } = useTasksStore();
  
  const existingTask = route.params?.task;
  const [title, setTitle] = useState(existingTask?.title || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(existingTask?.priority || 'medium');

  const handleSave = () => {
    if (title.trim() === '') return; // Validação simples
    
    if (existingTask) {
      updateTask({ ...existingTask, title, priority });
    } else {
      const newTask: Omit<Task, 'id' | 'createdAt' | 'completed' | 'progress'> = {
        title,
        priority,
      };
      addTask(newTask);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.modal}>
            <Text style={styles.header}>{existingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
            <SoftInput placeholder="Título da tarefa" value={title} onChangeText={setTitle} />
            {/* Aqui iriam outros inputs para prioridade, data, etc. */}
            <SoftButton title="Salvar" onPress={handleSave} />
            <SoftButton title="Cancelar" onPress={() => navigation.goBack()} type="secondary" />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modal: { backgroundColor: '#FFFFFF', margin: spacing.large, borderRadius: 16, padding: spacing.large, gap: spacing.medium },
    header: { ...typography.h2, textAlign: 'center', marginBottom: spacing.medium },
});

export default TaskModal;
