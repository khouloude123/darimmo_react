import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Listing } from '../data';
import { C } from '../theme';

// Grande carte (carrousel "Près de vous")
export function ListingCard({ item, width = 270 }: { item: Listing; width?: number }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[s.card, { width }]}>
      <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.photo}>
        <Text style={s.homeIcon}>⌂</Text>
        <View style={s.heart}>
          <Text style={s.heartIcon}>{item.fav ? '♥' : '♡'}</Text>
        </View>
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

// Carte compacte (liste "Récemment ajoutés")
export function ListingRow({ item }: { item: Listing }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={s.row}>
      <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.thumb}>
        <Text style={s.rowHomeIcon}>⌂</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={s.price}>{item.price}</Text>
        <Text style={s.title} numberOfLines={1}>{item.title}</Text>
        <Text style={s.meta} numberOfLines={1}>
          {item.place} · {item.ch} ch · {item.m2} m²
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', marginRight: 14 },
  photo: { height: 150, alignItems: 'center', justifyContent: 'center' },
  homeIcon: { fontSize: 60, color: 'rgba(255,255,255,0.5)' },
  rowHomeIcon: { fontSize: 30, color: 'rgba(255,255,255,0.5)' },
  heart: {
    position: 'absolute', top: 10, right: 10, width: 38, height: 38,
    borderRadius: 19, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  heartIcon: { fontSize: 22, color: C.orange },
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