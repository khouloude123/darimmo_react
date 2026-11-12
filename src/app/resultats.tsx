import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListingRow } from '../components/ListingCard';
import { LISTINGS } from '../data';
import { applyFilters, getFilters } from '../filters';
import { C } from '../theme';

export default function Resultats() {
  const router = useRouter();
  const [filters, setLocal] = useState(getFilters());

  useFocusEffect(
    useCallback(() => {
      setLocal(getFilters());
    }, [])
  );
  const list = applyFilters(LISTINGS, filters);

  const chips = [
    filters.mode === 'acheter' ? 'Vente' : 'Location',
    filters.type ? filters.type : null,
    filters.minCh ? `${filters.minCh}+ ch` : null,
    `${filters.minPrice.toLocaleString('fr-FR')} – ${filters.maxPrice.toLocaleString('fr-FR')} DT`,
  ].filter(Boolean) as string[];

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.top}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={s.heading}>Résultats</Text>
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
        <Text style={s.countBold}>{list.length} biens</Text> trouvés
      </Text>

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <ListingRow item={item} />}
        ListEmptyComponent={<Text style={s.empty}>Aucun résultat</Text>}
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
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, marginTop: 14 },
  filterChip: { backgroundColor: C.blue, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  filterChipText: { fontFamily: 'Inter_600SemiBold', color: '#fff' },
  chip: { backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  chipText: { fontFamily: 'Inter_400Regular', color: C.text },
  count: { fontFamily: 'Inter_400Regular', color: C.muted, paddingHorizontal: 16, marginTop: 14 },
  countBold: { fontFamily: 'Inter_600SemiBold', color: C.text },
  empty: { textAlign: 'center', fontFamily: 'Inter_400Regular', color: C.muted, paddingVertical: 40 },
});