import { Stack } from 'expo-router';
import { setupExercises } from './db/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  setupExercises();

  return (
    <SafeAreaProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </SafeAreaProvider>
  );
}
