import { Text, View } from 'react-native';
import { C } from '../../theme';

export default function Screen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg }}>
      <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 24, color: C.blue }}>Accueil</Text>
    </View>
  );
}