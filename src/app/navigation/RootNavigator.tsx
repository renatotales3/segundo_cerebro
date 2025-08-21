// /src/app/navigation/RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import TaskModal from '../modals/TaskModal';
import TransactionModal from '../modals/TransactionModal';
import { RootStackParamList } from '.';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Grupo principal com as abas */}
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Group>

      {/* Grupo de modais que abrem por cima da tela inteira */}
      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name="TaskModal" component={TaskModal} />
        <Stack.Screen name="TransactionModal" component={TransactionModal} />
        {/* Adicionar outros modais aqui */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootNavigator;
