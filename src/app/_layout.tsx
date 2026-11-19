import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });
  const net = useNetInfo();
  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {net.isConnected === false && (
          <View style={{ backgroundColor: '#B91C1C', paddingTop: 36, paddingBottom: 8, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontFamily: 'Inter_600SemiBold', fontSize: 13 }}>
              Pas de connexion internet
            </Text>
          </View>
        )}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="filtres"
            options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }}
          />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
