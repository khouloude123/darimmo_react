import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { C } from '../theme';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={s.screen} contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={[C.blue, C.teal]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.header}>
        <View style={s.logo}>
          <Text style={{ fontSize: 32, color: '#fff' }}>⌂</Text>
        </View>
        <Text style={s.brand}>DarImmo</Text>
        <Text style={s.pitch}>
          Achetez, louez et publiez vos biens immobiliers en toute simplicité.
        </Text>
      </LinearGradient>

      <View style={s.card}>
        <Text style={s.cardTitle}>Connexion client</Text>

        <Text style={s.label}>Email</Text>
        <TextInput
          style={s.input}
          placeholder="nom@exemple.com"
          placeholderTextColor={C.muted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[s.label, { marginTop: 14 }]}>Mot de passe</Text>
        <TextInput
          style={s.input}
          placeholder="••••••••"
          placeholderTextColor={C.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 12 }}>
          <Text style={s.forgot}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.primary} onPress={() => router.replace('/home' as never)}>
          <Text style={s.primaryText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={s.orRow}>
          <View style={s.line} />
          <Text style={s.or}>ou</Text>
          <View style={s.line} />
        </View>

        <TouchableOpacity style={s.google}>
          <Text style={s.googleText}>Continuer avec Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.foot}>
        Pas encore de compte ? <Text style={s.footLink}>Créer un compte</Text>
      </Text>
      <Text style={[s.foot, { marginTop: 8 }]}>
        Administrateur ? <Text style={s.footLink}>Espace admin</Text>
      </Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: { paddingTop: 70, paddingHorizontal: 24, paddingBottom: 90, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  logo: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  brand: { fontFamily: 'Poppins_700Bold', fontSize: 32, color: '#fff', marginTop: 16 },
  pitch: { fontFamily: 'Inter_400Regular', fontSize: 15, color: 'rgba(255,255,255,0.9)', marginTop: 8, lineHeight: 22 },
  card: {
    backgroundColor: '#fff', borderRadius: 28, padding: 24, marginHorizontal: 16, marginTop: -56,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 4,
  },
  cardTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 22, color: C.text, marginBottom: 16 },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: C.text, marginBottom: 6 },
  input: {
    height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: C.bg,
    paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text,
  },
  forgot: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: C.blue },
  primary: { height: 52, borderRadius: 14, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  primaryText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#fff' },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: C.border },
  or: { fontFamily: 'Inter_400Regular', color: C.muted, marginHorizontal: 12 },
  google: { height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  googleText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text },
  foot: { textAlign: 'center', marginTop: 20, fontFamily: 'Inter_400Regular', color: C.muted, fontSize: 14 },
  footLink: { fontFamily: 'Inter_600SemiBold', color: C.blue },
});