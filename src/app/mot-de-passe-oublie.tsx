import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { C } from '../theme';

export default function MotDePasseOublie() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const send = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      Alert.alert('Email invalide', 'Veuillez saisir un email valide.');
      return;
    }
    Alert.alert(
      'Email envoyé',
      'Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.top}>
        <TouchableOpacity style={s.back} onPress={() => router.back()}>
          <Text style={s.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={s.heading}>Mot de passe oublié</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={s.info}>
          Saisissez l’email de votre compte. Nous vous enverrons un lien pour choisir un nouveau mot de passe.
        </Text>
        <Text style={s.label}>Email</Text>
        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="nom@exemple.com"
          placeholderTextColor={C.muted}
        />
        <TouchableOpacity style={s.primary} onPress={send}>
          <Text style={s.primaryText}>Envoyer le lien</Text>
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
  info: { fontFamily: 'Inter_400Regular', fontSize: 14, color: C.muted, lineHeight: 21, marginTop: 8, marginBottom: 20 },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: C.text, marginBottom: 6 },
  input: {
    height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: '#fff',
    paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text,
  },
  primary: { height: 52, borderRadius: 14, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  primaryText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#fff' },
});
