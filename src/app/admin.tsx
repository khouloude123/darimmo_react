import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { LISTINGS } from '../data';
import { approve, getPending, getStats, refuse, subscribeModeration } from '../moderation';

const BG = '#0B1220';
const CARD = '#111B2E';
const LINE = '#1F2A40';
const TEAL = '#14B8A6';

function Stat({ label, value, color = '#fff' }: { label: string; value: string; color?: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statLabel}>{label}</Text>
      <Text style={[s.statValue, { color }]}>{value}</Text>
    </View>
  );
}

export default function Admin() {
  const router = useRouter();
  const [pending, setPending] = useState(getPending());
  const [stats, setStats] = useState(getStats());

  useEffect(
    () =>
      subscribeModeration(() => {
        setPending([...getPending()]);
        setStats({ ...getStats() });
      }),
    []
  );

  const confirmRefuse = (id: string) =>
    Alert.alert('Refuser l’annonce ?', 'Le vendeur sera informé du refus.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Refuser', style: 'destructive', onPress: () => refuse(id) },
    ]);

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={s.headRow}>
          <View>
            <Text style={s.kicker}>Espace administrateur</Text>
            <Text style={s.title}>Tableau de bord</Text>
          </View>
          <TouchableOpacity style={s.logout} onPress={() => router.replace('/admin-login' as never)}>
            <Text style={s.logoutText}>⏻</Text>
          </TouchableOpacity>
        </View>

        <View style={s.grid}>
          <Stat label="Utilisateurs" value="128" />
          <Stat label="Annonces actives" value={String(LISTINGS.length - pending.length)} />
          <Stat label="À valider" value={String(pending.length)} color="#FDBA74" />
          <Stat label="Traitées" value={String(stats.approved + stats.refused)} color="#FCA5A5" />
        </View>

        <Text style={s.section}>Annonces à valider</Text>
        {pending.length === 0 && <Text style={s.empty}>Aucune annonce en attente</Text>}

        {pending.map((p) => {
          const l = LISTINGS.find((x) => x.id === p.id);
          if (!l) return null;
          return (
            <View key={p.id} style={s.item}>
              <View style={s.itemTop}>
                <LinearGradient colors={l.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.thumb} />
                <View style={{ flex: 1 }}>
                  <Text style={s.itemTitle} numberOfLines={1}>{l.title}</Text>
                  <Text style={s.itemMeta} numberOfLines={1}>Par {p.seller} · {l.place}</Text>
                  <Text style={s.itemPrice}>{l.price}</Text>
                </View>
              </View>
              <View style={s.actions}>
                <TouchableOpacity style={s.approve} onPress={() => approve(p.id)}>
                  <Text style={s.approveText}>Approuver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.refuse} onPress={() => confirmRefuse(p.id)}>
                  <Text style={s.refuseText}>Refuser</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  kicker: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#B6C2D9' },
  title: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: '#fff' },
  logout: { width: 48, height: 48, borderRadius: 24, backgroundColor: CARD, borderWidth: 1, borderColor: LINE, alignItems: 'center', justifyContent: 'center' },
  logoutText: { color: '#fff', fontSize: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20 },
  stat: { width: '47.5%', backgroundColor: CARD, borderRadius: 18, borderWidth: 1, borderColor: LINE, padding: 16 },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#B6C2D9' },
  statValue: { fontFamily: 'Poppins_700Bold', fontSize: 30, marginTop: 4 },
  section: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#fff', marginTop: 26, marginBottom: 12 },
  empty: { fontFamily: 'Inter_400Regular', color: '#B6C2D9', paddingVertical: 24, textAlign: 'center' },
  item: { backgroundColor: CARD, borderRadius: 18, borderWidth: 1, borderColor: LINE, padding: 12, marginBottom: 12 },
  itemTop: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  itemTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#fff' },
  itemMeta: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#B6C2D9', marginTop: 2 },
  itemPrice: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#FDBA74', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  approve: { flex: 1, height: 46, borderRadius: 12, backgroundColor: TEAL, alignItems: 'center', justifyContent: 'center' },
  approveText: { fontFamily: 'Poppins_600SemiBold', color: BG },
  refuse: { flex: 1, height: 46, borderRadius: 12, borderWidth: 1.5, borderColor: '#F87171', alignItems: 'center', justifyContent: 'center' },
  refuseText: { fontFamily: 'Poppins_600SemiBold', color: '#FCA5A5' },
});
