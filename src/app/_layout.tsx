import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from '../contexts/I18nContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="auth/login" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="auth/signup" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="auth/forgot-password" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="onboarding/index" 
          options={{ 
            headerShown: false,
            gestureEnabled: false
          }} 
        />
        <Stack.Screen 
          name="home/index" 
          options={{ 
            headerShown: false,
            gestureEnabled: false
          }} 
        />
      </Stack>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
