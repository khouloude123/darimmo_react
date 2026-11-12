import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C } from '../../theme';

const TYPES = ['appartement', 'villa', 'terrain', 'local', 'bureau'];
const STEP_TITLES = ['Type de bien', 'Informations', 'Photos et position', 'Récapitulatif'];
const MAX_PHOTOS = 10;

type Form = {
  mode: 'acheter' | 'louer';
  type: string;
  title: string;
  place: string;
  price: string;
  ch: string;
  sdb: string;
  m2: string;
  desc: string;
  photos: string[];
  pin: { x: number; y: number } | null;
};

const EMPTY: Form = {
  mode: 'acheter', type: 'villa', title: '', place: '', price: '',
  ch: '', sdb: '', m2: '', desc: '', photos: [], pin: null,
};

export default function Publier() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [f, setF] = useState<Form>(EMPTY);
  const [mapSize, setMapSize] = useState({ w: 0, h: 0 });

  const set = (patch: Partial<Form>) => setF({ ...f, ...patch });

  const addPhotos = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission refusée', 'Autorisez l’accès aux photos pour ajouter des images.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - f.photos.length,
      quality: 0.7,
    });
    if (!res.canceled) {
      set({ photos: [...f.photos, ...res.assets.map((a) => a.uri)].slice(0, MAX_PHOTOS) });
    }
  };

  const removePhoto = (uri: string) => set({ photos: f.photos.filter((p) => p !== uri) });

  const validate = (): string | null => {
    if (step === 2) {
      if (!f.title.trim()) return 'Veuillez saisir un titre.';
      if (!f.place.trim()) return 'Veuillez saisir la ville ou le quartier.';
      if (!f.price.trim() || isNaN(Number(f.price))) return 'Veuillez saisir un prix valide (chiffres seulement).';
    }
    if (step === 3) {
      if (f.photos.length === 0) return 'Ajoutez au moins une photo.';
      if (!f.pin) return 'Touchez la carte pour placer le repère.';
    }
    return null;
  };

  const next = () => {
    const err = validate();
    if (err) {
      Alert.alert('Champ manquant', err);
      return;
    }
    setStep(step + 1);
  };

  const publish = () => {
    // Plus tard : envoi à Supabase avec moderation = 'pending'
    Alert.alert(
      'Annonce envoyée',
      'Votre annonce sera visible après validation par un administrateur.',
      [
        {
          text: 'OK',
          onPress: () => {
            setF(EMPTY);
            setStep(1);
            router.replace('/home' as never);
          },
        },
      ]
    );
  };

  const close = () => {
    if (f.title || f.photos.length) {
      Alert.alert('Quitter ?', 'Les informations saisies seront perdues.', [
        { text: 'Rester', style: 'cancel' },
        {
          text: 'Quitter',
          style: 'destructive',
          onPress: () => {
            setF(EMPTY);
            setStep(1);
            router.replace('/home' as never);
          },
        },
      ]);
    } else {
      router.replace('/home' as never);
    }
  };

  const priceLabel = f.mode === 'acheter' ? 'Prix (DT)' : 'Loyer par mois (DT)';

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      {/* En-tête */}
      <View style={s.top}>
        <TouchableOpacity style={s.close} onPress={close}>
          <Text style={s.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={s.heading}>Publier une annonce</Text>
      </View>

      {/* Progression */}
      <View style={s.progress}>
        {[1, 2, 3, 4].map((n) => (
          <View key={n} style={[s.seg, n <= step && s.segOn]} />
        ))}
      </View>
      <Text style={s.stepText}>Étape {step} sur 4 · {STEP_TITLES[step - 1]}</Text>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        {/* ÉTAPE 1 */}
        {step === 1 && (
          <>
            <Text style={s.label}>Transaction</Text>
            <View style={s.row}>
              {(['acheter', 'louer'] as const).map((m) => (
                <TouchableOpacity key={m} style={[s.btn, f.mode === m && s.on]} onPress={() => set({ mode: m })}>
                  <Text style={[s.btnText, f.mode === m && s.onText]}>{m === 'acheter' ? 'Vendre' : 'Louer'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={s.label}>Type de bien</Text>
            <View style={s.wrap}>
              {TYPES.map((t) => (
                <TouchableOpacity key={t} style={[s.pill, f.type === t && s.on]} onPress={() => set({ type: t })}>
                  <Text style={[s.btnText, f.type === t && s.onText]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* ÉTAPE 2 */}
        {step === 2 && (
          <>
            <Text style={s.label}>Titre</Text>
            <TextInput style={s.input} value={f.title} onChangeText={(v) => set({ title: v })} placeholder="Ex : Villa avec jardin" placeholderTextColor={C.muted} />

            <Text style={s.label}>Ville / quartier</Text>
            <TextInput style={s.input} value={f.place} onChangeText={(v) => set({ place: v })} placeholder="Ex : La Marsa" placeholderTextColor={C.muted} />

            <Text style={s.label}>{priceLabel}</Text>
            <TextInput style={s.input} value={f.price} onChangeText={(v) => set({ price: v.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="485000" placeholderTextColor={C.muted} />

            <View style={s.row}>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Chambres</Text>
                <TextInput style={s.input} value={f.ch} onChangeText={(v) => set({ ch: v.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="0" placeholderTextColor={C.muted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Salles de bain</Text>
                <TextInput style={s.input} value={f.sdb} onChangeText={(v) => set({ sdb: v.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="0" placeholderTextColor={C.muted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Surface m²</Text>
                <TextInput style={s.input} value={f.m2} onChangeText={(v) => set({ m2: v.replace(/[^0-9]/g, '') })} keyboardType="number-pad" placeholder="0" placeholderTextColor={C.muted} />
              </View>
            </View>

            <Text style={s.label}>Description</Text>
            <TextInput
              style={[s.input, { height: 110, paddingTop: 12, textAlignVertical: 'top' }]}
              value={f.desc}
              onChangeText={(v) => set({ price: v })}
              multiline
              placeholder="Décrivez le bien…"
              placeholderTextColor={C.muted}
            />
          </>
        )}

        {/* ÉTAPE 3 */}
        {step === 3 && (
          <>
            <Text style={s.label}>
              Photos <Text style={{ color: C.muted }}>({f.photos.length} sur {MAX_PHOTOS})</Text>
            </Text>
            <View style={s.grid}>
              {f.photos.length < MAX_PHOTOS && (
                <TouchableOpacity style={[s.tile, s.add]} onPress={addPhotos}>
                  <Text style={s.plus}>+</Text>
                  <Text style={s.addText}>Ajouter</Text>
                </TouchableOpacity>
              )}
              {f.photos.map((uri, i) => (
                <View key={uri} style={s.tile}>
                  <Image source={{ uri }} style={s.img} />
                  {i === 0 && (
                    <View style={s.main}>
                      <Text style={s.mainText}>Principale</Text>
                    </View>
                  )}
                  <TouchableOpacity style={s.remove} onPress={() => removePhoto(uri)}>
                    <Text style={s.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={s.label}>Position du bien</Text>
            <Pressable
              style={s.map}
              onLayout={(e) => setMapSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
              onPress={(e) =>
                set({
                  pin: {
                    x: e.nativeEvent.locationX / (mapSize.w || 1),
                    y: e.nativeEvent.locationY / (mapSize.h || 1),
                  },
                })
              }
            >
              <View style={s.water} />
              <View style={[s.roadH, { top: '38%' }]} />
              <View style={[s.roadV, { left: '28%' }]} />
              {f.pin && (
                <Text style={[s.pin, { left: f.pin.x * mapSize.w - 14, top: f.pin.y * mapSize.h - 34 }]}>📍</Text>
              )}
              <View style={s.hint}>
                <Text style={s.hintText}>Touchez la carte pour placer le repère</Text>
              </View>
            </Pressable>
          </>
        )}

        {/* ÉTAPE 4 */}
        {step === 4 && (
          <View style={s.recap}>
            {f.photos[0] && <Image source={{ uri: f.photos[0] }} style={s.recapImg} />}
            <Text style={s.recapPrice}>
              {Number(f.price).toLocaleString('fr-FR')} DT{f.mode === 'louer' ? ' / mois' : ''}
            </Text>
            <Text style={s.recapTitle}>{f.title}</Text>
            <Text style={s.recapMeta}>
              {f.place} · {f.type} · {f.mode === 'acheter' ? 'À vendre' : 'À louer'}
            </Text>
            <Text style={s.recapMeta}>
              {f.ch || 0} ch · {f.sdb || 0} sdb · {f.m2 || 0} m² · {f.photos.length} photo(s)
            </Text>
            {!!f.desc && <Text style={s.recapDesc}>{f.desc}</Text>}
            <Text style={s.note}>L’annonce sera vérifiée par un administrateur avant d’être publiée.</Text>
          </View>
        )}
      </ScrollView>

      {/* Boutons */}
      <View style={s.bottom}>
        {step > 1 && (
          <TouchableOpacity style={s.back} onPress={() => setStep(step - 1)}>
            <Text style={s.backText}>Retour</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={s.next} onPress={step === 4 ? publish : next}>
          <Text style={s.nextText}>{step === 4 ? 'Publier' : 'Continuer'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8 },
  close: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  closeText: { fontSize: 18, color: C.text },
  heading: { fontFamily: 'Poppins_600SemiBold', fontSize: 19, color: C.text },
  progress: { flexDirection: 'row', gap: 6, paddingHorizontal: 16, marginTop: 14 },
  seg: { flex: 1, height: 5, borderRadius: 3, backgroundColor: '#CBD5E1' },
  segOn: { backgroundColor: C.blue },
  stepText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted, paddingHorizontal: 16, marginTop: 8 },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text, marginTop: 16, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 10 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  btn: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  pill: { paddingHorizontal: 18, height: 42, borderRadius: 21, borderWidth: 1, borderColor: C.border, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  on: { backgroundColor: C.blue, borderColor: C.blue },
  btnText: { fontFamily: 'Inter_600SemiBold', color: C.text },
  onText: { color: '#fff' },
  input: { height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: '#fff', paddingHorizontal: 14, fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { width: '31%', aspectRatio: 1, borderRadius: 14, overflow: 'hidden' },
  add: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  plus: { fontSize: 28, color: C.blue },
  addText: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: C.blue },
  img: { width: '100%', height: '100%' },
  main: { position: 'absolute', top: 6, left: 6, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  mainText: { fontFamily: 'Inter_600SemiBold', fontSize: 10, color: C.text },
  remove: { position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(15,23,42,0.7)', alignItems: 'center', justifyContent: 'center' },
  removeText: { color: '#fff', fontSize: 11 },
  map: { height: 200, borderRadius: 18, backgroundColor: '#E8EEF5', overflow: 'hidden' },
  water: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '28%', backgroundColor: '#BFDBFE' },
  roadH: { position: 'absolute', left: 0, right: 0, height: 12, backgroundColor: '#fff' },
  roadV: { position: 'absolute', top: 0, bottom: 0, width: 12, backgroundColor: '#fff' },
  pin: { position: 'absolute', fontSize: 28 },
  hint: { position: 'absolute', left: 10, bottom: 10, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
  hintText: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.text },
  recap: { backgroundColor: '#fff', borderRadius: 20, padding: 16 },
  recapImg: { width: '100%', height: 180, borderRadius: 14, marginBottom: 12 },
  recapPrice: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: C.orange },
  recapTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 17, color: C.text, marginTop: 4 },
  recapMeta: { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted, marginTop: 4 },
  recapDesc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: C.text, marginTop: 12, lineHeight: 21 },
  note: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.teal, marginTop: 14 },
  bottom: { flexDirection: 'row', gap: 12, padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: C.border },
  back: { flex: 1, height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  backText: { fontFamily: 'Poppins_600SemiBold', color: C.blue, fontSize: 15 },
  next: { flex: 2, height: 52, borderRadius: 14, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  nextText: { fontFamily: 'Poppins_600SemiBold', color: '#fff', fontSize: 15 },
});