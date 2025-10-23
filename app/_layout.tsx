import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { clearDatabase, setupDB } from './db/database';
import { useEffect } from 'react';

export default function RootLayout() {
  setupDB();
  //clearDatabase();
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
