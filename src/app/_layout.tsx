import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="quiz" options={{ gestureEnabled: false }} />
        <Stack.Screen name="answer-correct" options={{ gestureEnabled: false, animation: 'fade' }} />
        <Stack.Screen name="answer-wrong" options={{ gestureEnabled: false, animation: 'fade' }} />
        <Stack.Screen name="results" options={{ gestureEnabled: false }} />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}