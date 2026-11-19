import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { C } from '../theme';
import { setProfile } from '../profile';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const submit = () => {
    if (!name.trim()) return Alert.alert('Nom obligatoire', 'Veuillez saisir votre nom.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return Alert.alert('Email invalide', 'Veuillez saisir un email valide.');
    if (password.length < 8) return Alert.alert('Mot de passe trop court', 'Minimum 8 caractères.');
    if (password !== confirm) return Alert.alert('Mots de passe différents', 'Les deux mots de passe doivent être identiques.');
    setProfile({ name: name.trim(), email: email.trim(), phone: '' });
    router.replace('/home' as never);
  };

  return (
    <ScrollView style={s.screen} contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={[C.blue, C.teal]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.back}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={s.brand}>Créer un compte</Text>
        <Text style={s.pitch}>Rejoignez DarImmo pour acheter, louer et publier vos biens.</Text>
      </LinearGradient>

      <View style={s.card}>
        <Text style={s.label}>Nom complet</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} placeholder="Votre nom" placeholderTextColor={C.muted} />

        <Text style={[s.label, s.gap]}>Email</Text>
        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="nom@exemple.com"
          placeholderTextColor={C.muted}
        />

        <Text style={[s.label, s.gap]}>Mot de passe</Text>
        <TextInput
          style={s.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="8 caractères minimum"
          placeholderTextColor={C.muted}
        />

        <Text style={[s.label, s.gap]}>Confirmer le mot de passe</Text>
        <TextInput
          style={s.input}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          placeholder="Répétez le mot de passe"
          placeholderTextColor={C.muted}
        />

        <TouchableOpacity style={s.primary} onPress={submit}>
          <Text style={s.primaryText}>Créer mon compte</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.foot}>
        Déjà un compte ?{' '}
        <Text style={s.footLink} onPress={() => router.back()}>Se connecter</Text>
      </Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 80, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  back: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 28, color: '#fff', marginTop: -4 },
  brand: { fontFamily: 'Poppins_700Bold', fontSize: 28, color: '#fff', marginTop: 16 },
  pitch: { fontFamily: 'Inter_400Regular', fontSize: 15, color: 'rgba(255,255,255,0.9)', marginTop: 8, lineHeight: 22 },
  card: {
    backgroundColor: '#fff', borderRadius: 28, padding: 24, marginHorizontal: 16, marginTop: -48,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 4,
  },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: C.text, marginBottom: 6 },
  gap: { marginTop: 14 },
  input: {
    height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: C.bg,
    paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text,
  },
  primary: { height: 52, borderRadius: 14, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center', marginTop: 22 },
  primaryText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#fff' },
  foot: { textAlign: 'center', marginTop: 20, fontFamily: 'Inter_400Regular', color: C.muted, fontSize: 14 },
  footLink: { fontFamily: 'Inter_600SemiBold', color: C.blue },
});
