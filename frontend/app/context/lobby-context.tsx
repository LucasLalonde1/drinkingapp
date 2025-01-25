/**
 * Provides global context of the lobbies state for the FRONTEND
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Player type for the lobby
interface Player {
  name: string;
  score: number;
}

// Define the Lobby type
interface Lobby {
  lobbyId: string;
  players: Record<string, Player>;
}

// Define the context type
interface LobbyContextType {
  lobby: Lobby | null;
  setLobby: React.Dispatch<React.SetStateAction<Lobby | null>>;
  clearLobby: () => Promise<void>;
}

// Define the props type for the LobbyProvider
interface LobbyProviderProps {
  children: ReactNode;
}

// Create the context
const LobbyContext = createContext<LobbyContextType | null>(null);

// LobbyProvider Component
export const LobbyProvider: React.FC<LobbyProviderProps> = ({ children }) => {
  const [lobby, setLobby] = useState<Lobby | null>(null);

  // Load lobby data from AsyncStorage on mount
  useEffect(() => {
    const loadLobbyFromStorage = async () => {
      try {
        const storedLobby = await AsyncStorage.getItem('lobby');
        if (storedLobby) {
          setLobby(JSON.parse(storedLobby));
        }
      } catch (error) {
        console.error('Error loading lobby from storage:', error);
      }
    };

    loadLobbyFromStorage();
  }, []);

  // Save lobby to AsyncStorage whenever it changes
  useEffect(() => {
    const saveLobbyToStorage = async () => {
      try {
        if (lobby) {
          await AsyncStorage.setItem('lobby', JSON.stringify(lobby));
        } else {
          await AsyncStorage.removeItem('lobby'); // Remove if lobby is null
        }
      } catch (error) {
        console.error('Error saving lobby to storage:', error);
      }
    };

    saveLobbyToStorage();
  }, [lobby]);

  // Clear lobby state and remove from AsyncStorage
  const clearLobby = async () => {
    try {
      setLobby(null);
      await AsyncStorage.removeItem('lobby');
    } catch (error) {
      console.error('Error clearing lobby:', error);
    }
  };

  return (
    <LobbyContext.Provider value={{ lobby, setLobby, clearLobby }}>
      {children}
    </LobbyContext.Provider>
  );
};

// Custom Hook to use the LobbyContext
export const useLobbyContext = (): LobbyContextType => {
  const context = useContext(LobbyContext);
  if (!context) {
    throw new Error('useLobby must be used within a LobbyProvider');
  }
  return context;
};
