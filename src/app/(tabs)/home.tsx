import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListingCard, ListingRow } from '../../components/ListingCard';
import { LISTINGS } from '../../data';
import { C } from '../../theme';


const ICONS = {
  'location-outline': '⌖',
  'notifications-outline': '♧',
  'search-outline': '⌕',
  'options-outline': '☷',
  'business-outline': '▤',
  'home-outline': '⌂',
  'grid-outline': '▦',
  'storefront-outline': '▥',
} as const;

type IconName = keyof typeof ICONS;

function Ionicons({ name, size, color }: { name: IconName; size: number; color: string }) {
  return <Text style={{ fontSize: size, color }}>{ICONS[name]}</Text>;
}

const CATEGORIES: { label: string; icon: IconName }[] = [
  { label: 'Appartement', icon: 'business-outline' },
  { label: 'Villa', icon: 'home-outline' },
  { label: 'Terrain', icon: 'grid-outline' },
  { label: 'Local', icon: 'storefront-outline' },
];

export default function Home() {
  const [mode, setMode] = useState<'acheter' | 'louer'>('acheter');
  const list = LISTINGS.filter((l) => l.mode === mode);
  const router = useRouter();

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={s.headerRow}>
          <View style={{ flex: 1 }}>
            <View style={s.locationRow}>
              <Ionicons name="location-outline" size={14} color={C.muted} />
              <Text style={s.location}>Tunis, Tunisie</Text>
            </View>
            <Text style={s.title}>Trouvez votre chez-vous</Text>
          </View>
          <TouchableOpacity style={s.bell}>
            <Ionicons name="notifications-outline" size={22} color={C.text} />
          </TouchableOpacity>
        </View>

        {/* Recherche + filtres */}
        <View style={s.searchRow}>
          <View style={s.searchBox}>
            <Ionicons name="search-outline" size={20} color={C.muted} />
            <TextInput
              style={s.searchInput}
              placeholder="Ville, quartier, adresse"
              placeholderTextColor={C.muted}
            />
          </View>
          <TouchableOpacity style={s.filterBtn} onPress={() => router.push('/resultats' as never)}>
            <Ionicons name="options-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Acheter / Louer */}
        <View style={s.toggleRow}>
          {(['acheter', 'louer'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMode(m)}
              style={[s.pill, mode === m && s.pillActive]}
            >
              <Text style={[s.pillText, mode === m && s.pillTextActive]}>
                {m === 'acheter' ? 'Acheter' : 'Louer'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Catégories */}
        <View style={s.catRow}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c.label} style={s.cat}>
              <View style={s.catIcon}>
                <Ionicons name={c.icon} size={24} color={C.blue} />
              </View>
              <Text style={s.catLabel}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Près de vous */}
        <View style={s.sectionRow}>
          <Text style={s.section}>Près de vous</Text>
          <Text style={s.link}>Voir tout</Text>
        </View>
        <FlatList
          data={list}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <ListingCard item={item} />}
          ListEmptyComponent={<Text style={s.empty}>Aucun bien pour le moment</Text>}
        />

        {/* Récemment ajoutés */}
        <Text style={[s.section, { marginTop: 24, marginBottom: 12 }]}>Récemment ajoutés</Text>
        {list.map((item) => (
          <ListingRow key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  content: { padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  location: { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted },
  title: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: C.text, marginTop: 4, maxWidth: 260 },
  bell: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff',
    borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center',
  },
  searchRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  searchBox: {
    flex: 1, height: 52, backgroundColor: '#fff', borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 8,
  },
  searchInput: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15 },
  filterBtn: {
    width: 52, height: 52, borderRadius: 16, backgroundColor: C.blue,
    alignItems: 'center', justifyContent: 'center',
  },
  toggleRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  pill: {
    paddingHorizontal: 22, paddingVertical: 12, borderRadius: 24,
    backgroundColor: '#fff', borderWidth: 1, borderColor: C.border,
  },
  pillActive: { backgroundColor: C.blue, borderColor: C.blue },
  pillText: { fontFamily: 'Inter_600SemiBold', color: C.text },
  pillTextActive: { color: '#fff' },
  catRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cat: { alignItems: 'center', width: 78 },
  catIcon: {
    width: 60, height: 60, borderRadius: 18, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  catLabel: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.text },
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 24, marginBottom: 12,
  },
  section: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: C.text },
  link: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: C.blue },
  empty: { fontFamily: 'Inter_400Regular', color: C.muted, paddingVertical: 20 },
});