import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { C } from '../../theme';

type IconName = keyof typeof Ionicons.glyphMap;

const icon = (on: IconName, off: IconName) =>
  ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
    <Ionicons name={focused ? on : off} size={size} color={color} />
  );

function PlusButton({ onPress }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={{
          top: -18, width: 56, height: 56, borderRadius: 28, backgroundColor: C.blue,
          alignItems: 'center', justifyContent: 'center',
          shadowColor: C.blue, shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 8,
        }}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.blue,
        tabBarInactiveTintColor: C.muted,
        tabBarLabelStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
        tabBarStyle: { height: 64, paddingTop: 6, paddingBottom: 8, backgroundColor: '#fff' },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Accueil', tabBarIcon: icon('home', 'home-outline') }} />
      <Tabs.Screen name="carte" options={{ title: 'Carte', tabBarIcon: icon('location', 'location-outline') }} />
      <Tabs.Screen name="publier" options={{ title: '', tabBarButton: (props) => <PlusButton {...props} /> }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages', tabBarIcon: icon('chatbubble', 'chatbubble-outline') }} />
      <Tabs.Screen name="profil" options={{ title: 'Profil', tabBarIcon: icon('person', 'person-outline') }} />
    </Tabs>
  );
}
