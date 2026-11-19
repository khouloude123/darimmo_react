import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import { type ReactNode, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfile, initials } from '../../profile';
import { C } from '../../theme';

type RowProps = {
  icon: string;
  label: string;
  right?: ReactNode;
  onPress?: () => void;
  last?: boolean;
};

function Row({ icon, label, right, onPress, last }: RowProps) {
  return (
    <TouchableOpacity activeOpacity={onPress ? 0.7 : 1} onPress={onPress} style={[s.row, !last && s.rowLine]}>
      <Text style={s.rowIcon}>{icon}</Text>
      <Text style={s.rowLabel}>{label}</Text>
      {right}
    </TouchableOpacity>
  );
}

export default function Profil() {
  const router = useRouter();
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(false);
  const [profile, setLocal] = useState(getProfile());

  useFocusEffect(
    useCallback(() => {
      setLocal(getProfile());
    }, [])
  );

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text style={s.heading}>Profil</Text>

        {/* Carte utilisateur */}
        <View style={s.userCard}>
          <LinearGradient colors={[C.blue, '#14B8A6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.avatar}>
            <Text style={s.avatarText}>{initials(profile.name) || '?'}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{profile.name}</Text>
            <Text style={s.email}>{profile.email}</Text>
            <TouchableOpacity onPress={() => router.push('/modifier-profil' as never)}>
              <Text style={s.edit}>Modifier le profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Compteurs */}
        <View style={s.stats}>
          {[
            ['3', 'Annonces'],
            ['12', 'Favoris'],
            ['5', 'Messages'],
          ].map(([n, l]) => (
            <View key={l} style={s.stat}>
              <Text style={s.statNum}>{n}</Text>
              <Text style={s.statLabel}>{l}</Text>
            </View>
          ))}
        </View>

        {/* Réglages */}
        <View style={s.list}>
          <Row icon="⌂" label="Mes annonces" right={<Text style={s.chev}>›</Text>} onPress={() => router.push('/mes-annonces' as never)} />
          <Row icon="♡" label="Mes favoris" right={<Text style={s.chev}>›</Text>} onPress={() => {}} />
          <Row
            icon="🔔"
            label="Notifications"
            right={
              <Switch
                value={notif}
                onValueChange={setNotif}
                trackColor={{ false: C.border, true: C.teal }}
                thumbColor="#fff"
              />
            }
          />
          <Row icon="🌐" label="Langue" right={<Text style={s.value}>Français</Text>} />
          <Row
            icon="☾"
            label="Mode sombre"
            last
            right={
              <Switch
                value={dark}
                onValueChange={setDark}
                trackColor={{ false: C.border, true: C.teal }}
                thumbColor="#fff"
              />
            }
          />
        </View>

        {/* Déconnexion */}
        <TouchableOpacity style={s.logout} onPress={() => router.replace('/login' as never)}>
          <Text style={s.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  heading: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: C.text, marginBottom: 16, marginTop: 8 },
  userCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#fff',
    borderRadius: 22, padding: 18,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  avatar: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: '#fff' },
  name: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: C.text },
  email: { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted, marginTop: 2 },
  edit: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: C.blue, marginTop: 6 },
  stats: { flexDirection: 'row', gap: 10, marginTop: 14 },
  stat: { flex: 1, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  statNum: { fontFamily: 'Poppins_700Bold', fontSize: 20, color: C.blue },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.muted, marginTop: 2 },
  list: { backgroundColor: '#fff', borderRadius: 22, marginTop: 14, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, height: 56 },
  rowLine: { borderBottomWidth: 1, borderBottomColor: C.border },
  rowIcon: { fontSize: 20, color: C.blue, width: 26, textAlign: 'center' },
  rowLabel: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 16, color: C.text },
  chev: { fontSize: 24, color: C.muted },
  value: { fontFamily: 'Inter_400Regular', fontSize: 14, color: C.muted },
  logout: {
    height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: '#FCA5A5',
    alignItems: 'center', justifyContent: 'center', marginTop: 18, backgroundColor: '#fff',
  },
  logoutText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#B91C1C' },
});


