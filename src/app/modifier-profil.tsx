import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { C } from '../theme';
import { getProfile, setProfile, initials } from '../profile';

export default function ModifierProfil() {
  const router = useRouter();
  const p = getProfile();
  const [name, setName] = useState(p.name);
  const [email, setEmail] = useState(p.email);
  const [phone, setPhone] = useState(p.phone);

  const save = () => {
    if (!name.trim()) {
      Alert.alert('Nom obligatoire', 'Veuillez saisir votre nom.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      Alert.alert('Email invalide', 'Veuillez saisir un email valide.');
      return;
    }
    setProfile({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    router.back();
  };

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.top}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={s.heading}>Modifier le profil</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <LinearGradient colors={[C.blue, '#14B8A6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.avatar}>
            <Text style={s.avatarText}>{initials(name) || '?'}</Text>
          </LinearGradient>
        </View>

        <Text style={s.label}>Nom complet</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} placeholder="Votre nom" placeholderTextColor={C.muted} />

        <Text style={[s.label, { marginTop: 16 }]}>Email</Text>
        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="nom@exemple.com"
          placeholderTextColor={C.muted}
        />

        <Text style={[s.label, { marginTop: 16 }]}>Téléphone</Text>
        <TextInput
          style={s.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="+216 00 000 000"
          placeholderTextColor={C.muted}
        />
      </ScrollView>

      <View style={s.bottom}>
        <TouchableOpacity style={s.save} onPress={save}>
          <Text style={s.saveText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8 },
  back: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 28, color: C.text, marginTop: -4 },
  heading: { fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: C.text },
  avatar: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Poppins_700Bold', fontSize: 32, color: '#fff' },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: C.text, marginBottom: 6 },
  input: {
    height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: '#fff',
    paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text,
  },
  bottom: { padding: 16, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: '#fff' },
  save: { height: 52, borderRadius: 14, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  saveText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#fff' },
});
