import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { C } from '../theme';
import { LISTINGS } from '../data';
import { useFavs } from '../useFavs';
import { ListingRow } from '../components/ListingCard';

export default function Favoris() {
  const router = useRouter();
  const favs = useFavs();
  const list = LISTINGS.filter((l) => favs.includes(l.id));

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.top}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={s.heading}>Mes favoris</Text>
      </View>
      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <ListingRow item={item} />}
        ListEmptyComponent={<Text style={s.empty}>Aucun favori pour le moment</Text>}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8 },
  back: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 28, color: C.text, marginTop: -4 },
  heading: { fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: C.text },
  empty: { textAlign: 'center', fontFamily: 'Inter_400Regular', color: C.muted, paddingVertical: 40 },
});
