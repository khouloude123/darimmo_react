import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });
  if (!loaded && !error) return null;
  return (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="filtres"
      options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }}
    />
  </Stack>
);
}