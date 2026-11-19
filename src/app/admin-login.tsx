import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const BG = '#0B1220';
const CARD = '#111B2E';
const FIELD = '#0A111F';
const LINE = '#1F2A40';
const TEAL = '#14B8A6';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const submit = () => {
    if (!email.trim() || !password) {
      Alert.alert('Champs manquants', 'Saisissez votre email professionnel et votre mot de passe.');
      return;
    }
    router.replace('/admin' as never);
  };

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.shield}>
        <Text style={{ fontSize: 28, color: TEAL }}>⛨</Text>
      </View>
      <Text style={s.title}>Espace administrateur</Text>
      <Text style={s.sub}>Accès réservé à l’équipe DarImmo : modération des annonces et gestion des utilisateurs.</Text>

      <View style={s.card}>
        <Text style={s.label}>Email professionnel</Text>
        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="admin@darimmo.tn"
          placeholderTextColor="#5B6B85"
        />

        <Text style={[s.label, { marginTop: 14 }]}>Mot de passe</Text>
        <TextInput
          style={s.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor="#5B6B85"
        />

        <TouchableOpacity style={s.remember} onPress={() => setRemember(!remember)}>
          <View style={[s.box, remember && s.boxOn]}>
            {remember && <Text style={s.check}>✓</Text>}
          </View>
          <Text style={s.rememberText}>Rester connecté sur cet appareil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.primary} onPress={submit}>
          <Text style={s.primaryText}>Accéder au tableau de bord</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.foot}>
        Vous êtes un client ?{' '}
        <Text style={s.footLink} onPress={() => router.replace('/login' as never)}>Connexion client</Text>
      </Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG, paddingHorizontal: 20, paddingTop: 40 },
  shield: { width: 56, height: 56, borderRadius: 16, backgroundColor: CARD, borderWidth: 1, borderColor: LINE, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: 'Poppins_700Bold', fontSize: 28, color: '#fff', marginTop: 18 },
  sub: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#B6C2D9', marginTop: 8, lineHeight: 21 },
  card: { backgroundColor: CARD, borderRadius: 24, borderWidth: 1, borderColor: LINE, padding: 20, marginTop: 28 },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#E2E8F0', marginBottom: 6 },
  input: { height: 52, borderRadius: 14, borderWidth: 1, borderColor: LINE, backgroundColor: FIELD, paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 15, color: '#fff' },
  remember: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 },
  box: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: '#5B6B85', alignItems: 'center', justifyContent: 'center' },
  boxOn: { backgroundColor: TEAL, borderColor: TEAL },
  check: { color: BG, fontSize: 14, fontWeight: '700' },
  rememberText: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#E2E8F0' },
  primary: { height: 52, borderRadius: 14, backgroundColor: TEAL, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  primaryText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: BG },
  foot: { textAlign: 'center', marginTop: 24, fontFamily: 'Inter_400Regular', color: '#B6C2D9', fontSize: 14 },
  footLink: { fontFamily: 'Inter_600SemiBold', color: TEAL },
});
