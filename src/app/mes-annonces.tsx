import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { C } from '../theme';
import { LISTINGS } from '../data';
import { MY_LISTINGS } from '../myListings';

export default function MesAnnonces() {
  const router = useRouter();
  const rows = MY_LISTINGS.map((m) => ({
    status: m.status,
    item: LISTINGS.find((l) => l.id === m.id),
  })).filter((r) => r.item);

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.top}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={s.heading}>Mes annonces</Text>
      </View>

      <FlatList
        data={rows}
        keyExtractor={(r) => r.item!.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={s.empty}>Vous n’avez pas encore d’annonce</Text>
            <TouchableOpacity style={s.cta} onPress={() => router.replace('/publier' as never)}>
              <Text style={s.ctaText}>Publier une annonce</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item: r }) => {
          const l = r.item!;
          const ok = r.status === 'approved';
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={s.row}
              onPress={() => router.push(`/bien/${l.id}` as never)}
            >
              <LinearGradient colors={l.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.thumb}>
                <Text style={{ fontSize: 30, color: 'rgba(255,255,255,0.5)' }}>⌂</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={s.price}>{l.price}</Text>
                <Text style={s.title} numberOfLines={1}>{l.title}</Text>
                <Text style={s.meta} numberOfLines={1}>{l.place}</Text>
                <View style={[s.badge, ok ? s.ok : s.wait]}>
                  <Text style={[s.badgeText, ok ? s.okText : s.waitText]}>
                    {ok ? 'En ligne' : 'En attente de validation'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
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
  empty: { fontFamily: 'Inter_400Regular', color: C.muted, marginBottom: 16 },
  cta: { backgroundColor: C.blue, paddingHorizontal: 22, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  ctaText: { fontFamily: 'Poppins_600SemiBold', color: '#fff' },
  row: { flexDirection: 'row', gap: 12, backgroundColor: '#fff', borderRadius: 18, padding: 10, marginBottom: 12, alignItems: 'center' },
  thumb: { width: 84, height: 84, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  price: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: C.orange },
  title: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: C.text, marginTop: 2 },
  meta: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.muted, marginTop: 2 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginTop: 6 },
  ok: { backgroundColor: '#CCFBF1' },
  wait: { backgroundColor: '#FFEDD5' },
  badgeText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  okText: { color: C.teal },
  waitText: { color: C.orange },
});
