import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { C } from '../theme';

// Composant d'écran de démarrage (splash screen).
export default function Splash() {
  // Permet la navigation vers une autre route.
  const router = useRouter();

  // Animation de progression utilisée pour faire avancer la barre de chargement.
  const progress = useRef(new Animated.Value(0)).current;

  // Effet exécuté au montage du composant.
  useEffect(() => {
    // Démarre l'animation de la barre de chargement.
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start();

    // Après 2 secondes, redirige vers la page de connexion.
    const t = setTimeout(() => router.replace('/login' as never), 2000);

    // Nettoie le timeout au démontage pour éviter les fuites mémoire.
    return () => clearTimeout(t);
  }, []);

  // Interpolation de la valeur de progression pour transformer [0,1] en largeur de barre.
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    // Fond dégradé bleu/teal de l'écran d'accueil.
    <LinearGradient
      colors={[C.blue, C.teal]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.screen}
    >
      {/* Logo circulaire blanc avec un symbole maison. */}
      <View style={s.logo}>
        <Text style={s.homeIcon}>⌂</Text>
      </View>

      {/* Nom de l'application. */}
      <Text style={s.name}>DarImmo</Text>

      {/* Slogan de présentation. */}
      <Text style={s.tagline}>Votre prochain chez-vous commence ici</Text>

      {/* Partie basse avec la barre de chargement. */}
      <View style={s.bottom}>
        <View style={s.track}>
          <Animated.View style={[s.bar, { width }]} />
        </View>
        <Text style={s.loading}>Chargement…</Text>
      </View>
    </LinearGradient>
  );
}

// Styles du composant.
const s = StyleSheet.create({
  // Conteneur principal plein écran.
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Logo rond blanc.
  logo: {
    width: 112,
    height: 112,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Icône maison dans le logo.
  homeIcon: { fontSize: 64, color: C.blue, lineHeight: 72 },

  // Nom de l'application.
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 40,
    color: '#fff',
    marginTop: 20,
  },

  // Sous-titre de l'application.
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
  },

  // Zone basse de l'écran avec la barre de chargement.
  bottom: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    width: '100%',
  },

  // Fond de la barre de chargement.
  track: {
    width: 140,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },

  // Barre animée qui se remplit.
  bar: { height: 4, backgroundColor: '#fff' },

  // Texte "Chargement…".
  loading: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#fff',
    marginTop: 10,
  },
});