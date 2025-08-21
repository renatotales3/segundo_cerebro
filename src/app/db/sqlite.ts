// /src/app/db/sqlite.ts
import * as SQLite from 'expo-sqlite';
import React, { createContext, useContext, useState, useCallback } from 'react';
// Import do schema.sql como um módulo estático. Requer configuração no metro.config.js ou uso de require.
const schemaSQL = require('./schema.sql'); 

const DatabaseContext = createContext(undefined);

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initDb = useCallback(async () => {
    try {
      setIsLoading(true);
      const database = SQLite.openDatabase('segundo-cerebro.db');
      
      await database.transactionAsync(async tx => {
          await tx.executeSqlAsync(schemaSQL);
      });
      
      setDb(database);
    } catch (error) {
      console.error("Erro ao inicializar o banco de dados", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isDbLoading: isLoading, initDb }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
