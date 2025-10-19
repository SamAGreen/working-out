import { Stack } from 'expo-router';
import { setupExercises } from './db/database';

export default function RootLayout() {
  setupExercises();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
