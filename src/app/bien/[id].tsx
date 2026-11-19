import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { C } from '../../theme';
import { LISTINGS } from '../../data';
import { toggleFav } from '../../favorites';
import { useFavs } from '../../useFavs';

export default function Detail() {
  const router = useRouter();
  const favs = useFavs();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = LISTINGS.find((l) => l.id === id);

  if (!item) {
    return (
      <SafeAreaView style={s.screen}>
        <Text style={s.notFound}>Bien introuvable</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.link}>Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        <LinearGradient colors={item.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.photo}>
          <Text style={s.houseIcon}>⌂</Text>
          <TouchableOpacity style={s.round} onPress={() => router.back()}>
            <Text style={s.roundText}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.round, { right: 16, left: undefined }]} onPress={() => toggleFav(item.id)}>
            <Text style={{ color: C.orange, fontSize: 20 }}>{favs.includes(item.id) ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={s.sheet}>
          <View style={s.priceRow}>
            <Text style={s.price}>{item.price}</Text>
            <View style={s.badge}>
              <Text style={s.badgeText}>{item.mode === 'acheter' ? 'À vendre' : 'À louer'}</Text>
            </View>
          </View>
          <Text style={s.title}>{item.title}</Text>
          <Text style={s.place}>{item.place}, Tunis</Text>

          <View style={s.tiles}>
            <Tile value={String(item.ch)} label="Chambres" />
            <Tile value={String(item.sdb)} label="Salles de bain" />
            <Tile value={String(item.m2)} label="m²" />
          </View>

          <Text style={s.section}>Description</Text>
          <Text style={s.desc}>
            Bien lumineux dans un quartier calme et sécurisé, à quelques minutes des commerces et des transports.
          </Text>

          <View style={s.seller}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>SB</Text>
            </View>
            <View>
              <Text style={s.sellerName}>Sami Ben Ali</Text>
              <Text style={s.sellerRole}>Propriétaire</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={s.bottom}>
        <View style={s.bottomRow}>
          <TouchableOpacity style={s.call} onPress={() => Linking.openURL('tel:+21600000000')}>
            <Text style={s.callText}>Appeler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.contact} onPress={() => router.push(`/chat/${item.id}` as never)}>
            <Text style={s.contactText}>Contacter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <View style={s.tile}>
      <Text style={s.tileValue}>{value}</Text>
      <Text style={s.tileLabel}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  notFound: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, textAlign: 'center', marginTop: 80, color: C.text },
  link: { fontFamily: 'Inter_600SemiBold', color: C.blue, textAlign: 'center', marginTop: 16 },
  photo: { height: 300, alignItems: 'center', justifyContent: 'center' },
  houseIcon: { fontSize: 90, color: 'rgba(255,255,255,0.5)' },
  round: {
    position: 'absolute', top: 50, left: 16, width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  roundText: { fontSize: 28, color: C.text, marginTop: -4 },
  sheet: { backgroundColor: C.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -28, padding: 20 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: C.orange },
  badge: { backgroundColor: '#CCFBF1', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  badgeText: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: C.teal },
  title: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: C.text, marginTop: 8 },
  place: { fontFamily: 'Inter_400Regular', color: C.muted, marginTop: 4 },
  tiles: { flexDirection: 'row', gap: 10, marginTop: 18 },
  tile: { flex: 1, backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  tileValue: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: C.text },
  tileLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: C.muted, marginTop: 2, textAlign: 'center' },
  section: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: C.text, marginTop: 22 },
  desc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: C.muted, lineHeight: 21, marginTop: 8 },
  seller: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 14, marginTop: 20 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Poppins_600SemiBold', color: '#fff' },
  sellerName: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text },
  sellerRole: { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted },
  bottom: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: C.border },
  bottomRow: { flexDirection: 'row', gap: 12, padding: 16 },
  call: { flex: 1, height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  callText: { fontFamily: 'Poppins_600SemiBold', color: C.blue, fontSize: 15 },
  contact: { flex: 2, height: 52, borderRadius: 14, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  contactText: { fontFamily: 'Poppins_600SemiBold', color: '#fff', fontSize: 15 },
});
