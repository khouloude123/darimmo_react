import { Tabs } from 'expo-router';
import { Text, type ColorValue } from 'react-native';
import { C } from '../../theme';

type IconName = 'home-outline' | 'location-outline' | 'add-circle' | 'chatbubble-outline' | 'person-outline';

const glyphs: Record<IconName, string> = {
  'home-outline': '⌂',
  'location-outline': '⌖',
  'add-circle': '+',
  'chatbubble-outline': '▤',
  'person-outline': '●',
};

const icon = (name: IconName) =>
  ({ color, size }: { color: ColorValue; size: number }) => (
    <Text style={{ color, fontSize: size, lineHeight: size }}>{glyphs[name]}</Text>
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.blue,
        tabBarInactiveTintColor: C.muted,
        tabBarLabelStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Accueil', tabBarIcon: icon('home-outline') }} />
      <Tabs.Screen name="carte" options={{ title: 'Carte', tabBarIcon: icon('location-outline') }} />
      <Tabs.Screen name="publier" options={{ title: 'Publier', tabBarIcon: icon('add-circle') }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages', tabBarIcon: icon('chatbubble-outline') }} />
      <Tabs.Screen name="profil" options={{ title: 'Profil', tabBarIcon: icon('person-outline') }} />
    </Tabs>
  );
}