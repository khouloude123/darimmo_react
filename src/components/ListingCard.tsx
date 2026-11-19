import { useFavs } from '../useFavs';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Listing } from '../data';
import { toggleFav } from '../favorites';
import { C } from '../theme';

function Heart({ id, size = 38 }: { id: string; size?: number }) {
  const favs = useFavs();
  const on = favs.includes(id);
  return (
    <TouchableOpacity
      onPress={(event) => {
        event.stopPropagation?.();
        toggleFav(id);
      }}
      hitSlop={8}
      style={[s.heart, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={{ color: C.orange, fontSize: size * 0.55 }}>{on ? '♥' : '♡'}</Text>
    </TouchableOpacity>
  );
}

export { Heart };

// Grande carte (carrousel "Près de vous")
export function ListingCard({ item, width = 270 }: { item: Listing; width?: number }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[s.card, { width }]}
      onPress={() => router.push(`/bien/${item.id}` as never)}
    >
      <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.photo}>
        <Text style={s.house}>⌂</Text>
        <Heart id={item.id} />
      </LinearGradient>
      <View style={s.body}>
        <Text style={s.price}>{item.price}</Text>
        <Text style={s.title} numberOfLines={1}>{item.title}</Text>
        <Text style={s.meta} numberOfLines={1}>
          {item.place} · {item.ch} ch · {item.sdb} sdb · {item.m2} m²
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Carte compacte (listes)
export function ListingRow({ item }: { item: Listing }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={s.row}
      onPress={() => router.push(`/bien/${item.id}` as never)}
    >
      <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.thumb}>
        <Text style={{ fontSize: 34, color: 'rgba(255,255,255,0.5)' }}>⌂</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={s.price}>{item.price}</Text>
        <Text style={s.title} numberOfLines={1}>{item.title}</Text>
        <Text style={s.meta} numberOfLines={1}>
          {item.place} · {item.ch} ch · {item.m2} m²
        </Text>
      </View>
      <Heart id={item.id} size={34} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', marginRight: 14 },
  photo: { height: 150, alignItems: 'center', justifyContent: 'center' },
  house: { fontSize: 60, color: 'rgba(255,255,255,0.5)' },
  heart: {
    position: 'absolute', top: 10, right: 10, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: 14 },
  price: { fontFamily: 'Poppins_700Bold', fontSize: 17, color: C.orange },
  title: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text, marginTop: 2 },
  meta: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.muted, marginTop: 4 },
  row: {
    flexDirection: 'row', gap: 12, backgroundColor: '#fff', borderRadius: 18,
    padding: 10, marginBottom: 12, alignItems: 'center',
  },
  thumb: { width: 84, height: 84, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
