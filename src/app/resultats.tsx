import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { C } from '../theme';
import { LISTINGS } from '../data';
import { DEFAULT_FILTERS, applyFilters, getFilters, setFilters } from '../filters';
import { ListingRow } from '../components/ListingCard';

const fmt = (n: number) => n.toLocaleString('fr-FR');

export default function Resultats() {
  const router = useRouter();
  const [filters, setLocal] = useState(getFilters());

  useFocusEffect(
    useCallback(() => {
      setLocal(getFilters());
    }, [])
  );

  const onSearch = (v: string) => {
    const next = { ...getFilters(), query: v };
    setFilters(next);
    setLocal(next);
  };

  const list = applyFilters(LISTINGS, filters);

  const chips = [
    filters.mode === 'acheter' ? 'Vente' : 'Location',
    filters.type ? filters.type : null,
    filters.minCh ? `${filters.minCh}+ ch` : null,
    `${fmt(filters.minPrice)} – ${fmt(filters.maxPrice)} DT`,
  ].filter(Boolean) as string[];

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.top}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <View style={s.searchBox}>
          <TextInput
            style={s.searchInput}
            value={filters.query}
            onChangeText={onSearch}
            placeholder="Ville, quartier, type..."
            placeholderTextColor={C.muted}
            returnKeyType="search"
          />
          {!!filters.query && (
            <TouchableOpacity onPress={() => onSearch('')} hitSlop={8}>
              <Text style={s.clear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={s.chipsRow}>
        <TouchableOpacity style={s.filterChip} onPress={() => router.push('/filtres' as never)}>
          <Text style={s.filterChipText}>Filtres</Text>
        </TouchableOpacity>
        {chips.map((c) => (
          <View key={c} style={s.chip}>
            <Text style={s.chipText}>{c}</Text>
          </View>
        ))}
      </View>

      <Text style={s.count}>
        <Text style={s.countBold}>{list.length} bien{list.length > 1 ? 's' : ''}</Text> trouvé{list.length > 1 ? 's' : ''}
      </Text>

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <ListingRow item={item} />}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={s.empty}>Aucun résultat pour cette recherche</Text>
            <TouchableOpacity
              style={s.filterChip}
              onPress={() => {
                setFilters({ ...DEFAULT_FILTERS });
                setLocal({ ...DEFAULT_FILTERS });
              }}
            >
              <Text style={s.filterChipText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8 },
  back: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 28, color: C.text, marginTop: -4 },
  searchBox: { flex: 1, height: 48, borderRadius: 14, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 8 },
  searchInput: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text },
  clear: { color: C.muted, fontSize: 16 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, marginTop: 14 },
  filterChip: { backgroundColor: C.blue, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  filterChipText: { fontFamily: 'Inter_600SemiBold', color: '#fff' },
  chip: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  chipText: { fontFamily: 'Inter_400Regular', color: C.text },
  count: { fontFamily: 'Inter_400Regular', color: C.muted, paddingHorizontal: 16, marginTop: 14 },
  countBold: { fontFamily: 'Inter_600SemiBold', color: C.text },
  empty: { textAlign: 'center', fontFamily: 'Inter_400Regular', color: C.muted, paddingVertical: 40 },
});

