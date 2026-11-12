import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LISTINGS } from '../../data';
import { applyFilters, getFilters } from '../../filters';
import { C } from '../../theme';

const short = (n: number) => (n >= 10000 ? `${Math.round(n / 1000)} K` : `${n} DT`);

export default function Carte() {
  const router = useRouter();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const list = applyFilters(LISTINGS, getFilters());
  const [selectedId, setSelectedId] = useState(list[0]?.id);
  const selected = list.find((l) => l.id === selectedId) ?? list[0];

  return (
    <View style={s.screen}>
      <View
        style={s.map}
        onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
      >
        {/* Décor : eau, parcs, routes */}
        <View style={s.water} />
        <View style={[s.park, { top: '22%', left: '38%', width: 90, height: 70 }]} />
        <View style={[s.park, { top: '58%', left: '4%', width: 70, height: 70 }]} />
        <View style={[s.roadH, { top: '30%' }]} />
        <View style={[s.roadH, { top: '52%' }]} />
        <View style={[s.roadV, { left: '22%' }]} />
        <View style={[s.roadV, { left: '72%' }]} />

        {/* Marqueurs */}
        {size.w > 0 &&
          list.map((l) => {
            const on = l.id === selected?.id;
            return (
              <TouchableOpacity
                key={l.id}
                onPress={() => setSelectedId(l.id)}
                style={[s.marker, on && s.markerOn, { left: l.lng * (size.w - 70), top: l.lat * (size.h - 40) }]}
              >
                <Text style={[s.markerText, on && s.markerTextOn]}>{short(l.priceNum)}</Text>
              </TouchableOpacity>
            );
          })}
      </View>

      {/* Barre du haut */}
      <SafeAreaView edges={['top']} style={s.top} pointerEvents="box-none">
        <View style={s.topRow}>
          <TouchableOpacity style={s.round} onPress={() => router.back()}>
            <Text style={s.roundText}>‹</Text>
          </TouchableOpacity>
          <View style={s.search}>
            <Text style={s.searchText}>La Marsa</Text>
          </View>
        </View>
        <TouchableOpacity style={s.zone}>
          <Text style={s.zoneText}>Rechercher dans cette zone</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Aperçu */}
      {selected ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={s.preview}
          onPress={() => router.push(`/bien/${selected.id}` as never)}
        >
          <View style={[s.thumb, { backgroundColor: selected.colors[0] }]}>
            <Text style={{ fontSize: 36, color: 'rgba(255,255,255,0.6)' }}>⌂</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.price}>{selected.price}</Text>
            <Text style={s.title} numberOfLines={1}>{selected.title}</Text>
            <Text style={s.meta} numberOfLines={1}>
              {selected.place} · {selected.ch} ch · {selected.m2} m²
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={s.preview}>
          <Text style={s.meta}>Aucun bien dans cette zone</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E8EEF5' },
  map: { flex: 1, backgroundColor: '#E8EEF5', overflow: 'hidden' },
  water: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '25%', backgroundColor: '#BFDBFE' },
  park: { position: 'absolute', backgroundColor: '#D1FAE5', borderRadius: 12 },
  roadH: { position: 'absolute', left: 0, right: 0, height: 12, backgroundColor: '#fff' },
  roadV: { position: 'absolute', top: 0, bottom: 0, width: 12, backgroundColor: '#fff' },
  marker: {
    position: 'absolute', backgroundColor: '#fff', borderWidth: 1.5, borderColor: C.blue,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16,
  },
  markerOn: { backgroundColor: C.blue },
  markerText: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: C.blue },
  markerTextOn: { color: '#fff' },
  top: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 16 },
  topRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  round: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  roundText: { fontSize: 28, color: C.text, marginTop: -4 },
  search: { flex: 1, height: 48, borderRadius: 14, backgroundColor: '#fff', justifyContent: 'center', paddingHorizontal: 16 },
  searchText: { fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text },
  zone: { alignSelf: 'center', marginTop: 12, backgroundColor: C.blue, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
  zoneText: { fontFamily: 'Inter_600SemiBold', color: '#fff', fontSize: 13 },
  preview: {
    position: 'absolute', left: 16, right: 16, bottom: 16, backgroundColor: '#fff', borderRadius: 18,
    padding: 12, flexDirection: 'row', gap: 12, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 5,
  },
  thumb: { width: 84, height: 84, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  price: { fontFamily: 'Poppins_700Bold', fontSize: 17, color: C.orange },
  title: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text, marginTop: 2 },
  meta: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.muted, marginTop: 4 },
});