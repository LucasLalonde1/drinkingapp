import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AuthProvider } from './context/auth-context';
import { LobbyProvider } from './context/lobby-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LobbyProvider>
        <Stack
          screenOptions={{
            // headerShown: false,
          }}>
          {children}
        </Stack>
      </LobbyProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
});
