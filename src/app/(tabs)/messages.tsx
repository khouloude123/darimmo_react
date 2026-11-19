import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listConversations } from '../../chat';
import { LISTINGS } from '../../data';
import { C } from '../../theme';

export default function Messages() {
  const router = useRouter();
  const [convs, setConvs] = useState(listConversations());

  useFocusEffect(
    useCallback(() => {
      setConvs([...listConversations()]);
    }, [])
  );

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <Text style={s.heading}>Messages</Text>
      <FlatList
        data={convs}
        keyExtractor={(c) => c.listingId}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        ListEmptyComponent={<Text style={s.empty}>Aucune conversation</Text>}
        renderItem={({ item }) => {
          const listing = LISTINGS.find((l) => l.id === item.listingId);
          const last = item.messages[item.messages.length - 1];
          return (
            <TouchableOpacity style={s.row} onPress={() => router.push(`/chat/${item.listingId}` as never)}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{item.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.listing} numberOfLines={1}>{listing?.title}</Text>
                <Text style={s.last} numberOfLines={1}>{last ? last.text : 'Nouvelle conversation'}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  heading: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: C.text, paddingHorizontal: 16, marginTop: 8 },
  empty: { textAlign: 'center', fontFamily: 'Inter_400Regular', color: C.muted, paddingVertical: 40 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 18, padding: 14 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Poppins_600SemiBold', color: '#fff' },
  name: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text },
  listing: { fontFamily: 'Inter_400Regular', fontSize: 12, color: C.teal, marginTop: 1 },
  last: { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted, marginTop: 3 },
});