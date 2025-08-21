// /App.tsx
import React, { useEffect, useState } from 'react';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { DatabaseProvider, useDatabase } from './src/app/db/sqlite';
import { ActivityIndicator, View } from 'react-native';
import { colors } from './src/app/theme/colors';

// Componente para carregar dependências assíncronas
const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDbLoading, initDb } = useDatabase();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    initDb();
  }, [initDb]);
  
  // screenshot-point: Tela de loading inicial enquanto DB e fontes carregam.
  if (isDbLoading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <AppInitializer>
          <RootNavigator />
          <StatusBar style="auto" />
        </AppInitializer>
      </NavigationContainer>
    </DatabaseProvider>
  );
}
