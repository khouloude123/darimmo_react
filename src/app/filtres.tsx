import { Slider } from '@miblanchard/react-native-slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LISTINGS } from '../data';
import { DEFAULT_FILTERS, RANGE, Sort, applyFilters, getFilters, setFilters } from '../filters';
import { C } from '../theme';

// Liste des types de biens disponibles dans le formulaire.
const TYPES = ['appartement', 'villa', 'terrain', 'local', 'bureau'];

// Options de tri disponibles pour l'utilisateur.
const SORTS: { key: Sort; label: string }[] = [
  { key: 'recent', label: 'Plus récents' },
  { key: 'prix_asc', label: 'Prix croissant' },
  { key: 'prix_desc', label: 'Prix décroissant' },
];

// Formatte un nombre avec les séparateurs français.
const fmt = (n: number) => n.toLocaleString('fr-FR');

// Composant principal de l'écran des filtres.
export default function Filtres() {
  // Récupère le routeur pour naviguer entre écrans.
  const router = useRouter();

  // État local des filtres actuels.
  // getFilters() récupère les filtres enregistrés dans le stockage local.
  const [f, setF] = useState(getFilters());

  // État pour savoir si le menu de tri est ouvert ou fermé.
  const [open, setOpen] = useState(false);

  // Valeurs de plage de prix selon le mode de transaction.
  const r = RANGE[f.mode];

  // Nombre total d'annonces correspondant aux filtres courants.
  const count = applyFilters(LISTINGS, f).length;

  // Change le mode de transaction (acheter ou louer).
  // En même temps, on réinitialise la plage de prix pour correspondre à ce mode.
  const changeMode = (m: 'acheter' | 'louer') =>
    setF({ ...f, mode: m, minPrice: RANGE[m].min, maxPrice: RANGE[m].max });

  // Applique les filtres sélectionnés et revient à l'écran précédent.
  const apply = () => {
    setFilters(f);
    router.back();
  };

  return (
    // Fond sombre semi-transparent derrière le panneau de filtres.
    <View style={s.overlay}>
      {/* Zone cliquable pour fermer la modale si l'utilisateur touche à l'extérieur. */}
      <Pressable style={{ flex: 1 }} onPress={() => router.back()} />

      {/* Panneau principal des filtres avec la zone sûre de l'iPhone. */}
      <SafeAreaView edges={['bottom']} style={s.sheet}>
        {/* Poignée visuelle en haut du panneau pour simuler un bottom sheet. */}
        <View style={s.handle} />

        {/* Contenu scrollable du formulaire. */}
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}>
          {/* Ligne du titre + bouton Réinitialiser. */}
          <View style={s.headRow}>
            <Text style={s.title}>Filtres</Text>
            <TouchableOpacity onPress={() => setF({ ...DEFAULT_FILTERS })}>
              <Text style={s.reset}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>

          {/* Section: type de transaction. */}
          <Text style={s.label}>Transaction</Text>
          <View style={s.row}>
            {(['acheter', 'louer'] as const).map((m) => (
              <TouchableOpacity
                key={m}
                style={[s.btn, f.mode === m && s.on]}
                onPress={() => changeMode(m)}
              >
                <Text style={[s.btnText, f.mode === m && s.onText]}>
                  {m === 'acheter' ? 'Acheter' : 'Louer'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section: type de bien. */}
          <Text style={s.label}>Type de bien</Text>
          <View style={s.wrap}>
            {TYPES.map((t) => (
              <TouchableOpacity
                key={t}
                style={[s.pill, f.type === t && s.on]}
                onPress={() => setF({ ...f, type: f.type === t ? null : t })}
              >
                <Text style={[s.btnText, f.type === t && s.onText]}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section: prix avec affichage de la plage actuelle. */}
          <View style={s.labelRow}>
            <Text style={s.labelInline}>Prix</Text>
            <Text style={s.value}>
              {fmt(f.minPrice)} – {fmt(f.maxPrice)} DT
            </Text>
          </View>
          <Slider
            value={[f.minPrice, f.maxPrice]}
            minimumValue={r.min}
            maximumValue={r.max}
            step={r.step}
            minimumTrackTintColor={C.blue}
            maximumTrackTintColor={C.border}
            thumbTintColor="#fff"
            thumbStyle={s.thumb}
            onValueChange={(v) => setF({ ...f, minPrice: v[0], maxPrice: v[1] })}
          />

          {/* Section: nombre minimum de chambres. */}
          <Text style={s.label}>Chambres</Text>
          <View style={s.row}>
            {[1, 2, 3, 4].map((n) => (
              <TouchableOpacity
                key={n}
                style={[s.square, f.minCh === n && s.on]}
                onPress={() => setF({ ...f, minCh: f.minCh === n ? null : n })}
              >
                <Text style={[s.btnText, f.minCh === n && s.onText]}>
                  {n === 4 ? '4+' : n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Section: rayon autour de moi. */}
          <View style={s.labelRow}>
            <Text style={s.labelInline}>Rayon autour de moi</Text>
            <Text style={s.value}>{f.radius} km</Text>
          </View>
          <Slider
            value={f.radius}
            minimumValue={1}
            maximumValue={50}
            step={1}
            minimumTrackTintColor={C.blue}
            maximumTrackTintColor={C.border}
            thumbTintColor="#fff"
            thumbStyle={s.thumb}
            onValueChange={(v) => setF({ ...f, radius: v[0] })}
          />

          {/* Section: tri des résultats. */}
          <Text style={s.label}>Trier par</Text>
          <TouchableOpacity style={s.select} onPress={() => setOpen(!open)}>
            <Text style={s.btnText}>{SORTS.find((x) => x.key === f.sort)?.label}</Text>
            <Text style={{ color: C.muted }}>{open ? '⌃' : '⌄'}</Text>
          </TouchableOpacity>

          {/* Affiche la liste des options si le menu est ouvert. */}
          {open &&
            SORTS.map((o) => (
              <TouchableOpacity
                key={o.key}
                style={s.option}
                onPress={() => {
                  setF({ ...f, sort: o.key });
                  setOpen(false);
                }}
              >
                <Text style={[s.btnText, f.sort === o.key && { color: C.blue }]}>
                  {o.label}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        {/* Bas de page avec le bouton pour afficher les résultats. */}
        <View style={s.bottom}>
          <TouchableOpacity style={s.apply} onPress={apply}>
            <Text style={s.applyText}>
              Afficher {count} bien{count > 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

// Styles du composant.
const s = StyleSheet.create({
  // Fond semi-transparent derrière le sheet.
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)' },

  // Panneau principal des filtres.
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
  },

  // Poignée du bottom sheet.
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.border,
    alignSelf: 'center',
    marginVertical: 12,
  },

  // Ligne du header du filtre.
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  // Titre principal.
  title: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: C.text },

  // Texte du bouton reset.
  reset: { fontFamily: 'Inter_600SemiBold', color: C.blue },

  // Libellé des sections.
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: C.text,
    marginTop: 20,
    marginBottom: 10,
  },

  // Ligne contenant un libellé et une valeur.
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 4,
  },

  // Libellé inline.
  labelInline: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text },

  // Valeur affichée à droite.
  value: { fontFamily: 'Inter_400Regular', fontSize: 14, color: C.muted },

  // Ligne horizontale de boutons.
  row: { flexDirection: 'row', gap: 10 },

  // Conteneur avec boutons en wrap.
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

  // Bouton principal (mode transaction, chambre, etc.).
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bouton rond ou pill pour le type de bien.
  pill: {
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bouton carré pour nombre de chambres.
  square: {
    width: 52,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style appliqué lorsqu'un bouton est sélectionné.
  on: { backgroundColor: C.blue, borderColor: C.blue },

  // Texte standard des boutons.
  btnText: { fontFamily: 'Inter_600SemiBold', color: C.text },

  // Texte blanc lorsqu'un bouton est activé.
  onText: { color: '#fff' },

  // Style du curseur du slider.
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: C.blue,
  },

  // Sélecteur de tri.
  select: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Option de tri dans la liste déroulante.
  option: { paddingVertical: 12, paddingHorizontal: 14 },

  // Zone du bouton "Afficher X bien(s)".
  bottom: { padding: 16, borderTopWidth: 1, borderTopColor: C.border },

  // Bouton principal d'application des filtres.
  apply: {
    height: 52,
    borderRadius: 14,
    backgroundColor: C.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Texte du bouton d'application.
  applyText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#fff' },
});