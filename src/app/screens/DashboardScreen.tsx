// /src/app/screens/DashboardScreen.tsx
import React, from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useTasksStore } from '../store/slices/tasks';
import { useFinanceStore } from '../store/slices/finance';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import ChartPie from '../components/ChartPie';
import ChartBar from '../components/ChartBar';

// screenshot-point: Tela principal do Dashboard com KPIs, gráficos e um layout limpo.
const DashboardScreen = () => {
  const tasks = useTasksStore(state => state.tasks);
  const transactions = useFinanceStore(state => state.transactions);

  // Lógica de insights (seria movida para utils/insights.ts)
  const tasksToday = tasks.filter(t => !t.completed).length; // Simplificado
  const monthlyBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const expenseData = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
        const category = t.category;
        if (!acc[category]) acc[category] = 0;
        acc[category] += Math.abs(t.amount);
        return acc;
    }, {} as Record<string, number>);
    
  const chartData = Object.entries(expenseData).map(([key, value]) => ({ x: key, y: value }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Meu Dia</Text>
        
        <View style={styles.kpiGrid}>
            <StatCard label="Tarefas para Hoje" value={tasksToday.toString()} icon="check-circle" />
            <StatCard label="Saldo do Mês" value={`R$ ${monthlyBalance.toFixed(2)}`} icon="wallet" />
        </View>

        <SectionHeader title="Visão Financeira" />
        <ChartPie data={chartData} />

        <SectionHeader title="Produtividade" />
        {/* Gráfico de barras seria implementado aqui */}
        {/* <ChartBar data={...} /> */}

        {/* Mais seções para Hábitos, Metas, etc. */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F9' },
  container: { padding: spacing.medium },
  header: { ...typography.h1, marginBottom: spacing.large },
  kpiGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.medium, marginBottom: spacing.large },
});

export default DashboardScreen;
