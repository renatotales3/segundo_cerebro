// /src/app/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PhosphorIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { softUI } from '../theme/softUI';

// Importando as telas
import DashboardScreen from '../screens/DashboardScreen';
import NotesScreen from '../screens/NotesScreen';
import TasksScreen from '../screens/TasksScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';
// ... importar outras telas

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          // Mapeamento de rotas para ícones do Phosphor
          switch (route.name) {
            case 'Dashboard': iconName = focused ? 'house-fill' : 'house'; break;
            case 'Notes': iconName = focused ? 'note-pencil-fill' : 'note-pencil'; break;
            case 'Tasks': iconName = focused ? 'check-circle-fill' : 'check-circle'; break;
            case 'Calendar': iconName = focused ? 'calendar-fill' : 'calendar'; break;
            case 'Settings': iconName = focused ? 'gear-six-fill' : 'gear-six'; break;
            default: iconName = 'question-fill';
          }
          return <PhosphorIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          ...softUI.navShadow,
          height: 90,
          paddingBottom: 30,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_600SemiBold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      {/* Adicionar outras telas aqui conforme forem implementadas */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
