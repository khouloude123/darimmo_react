
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getConversation, sendMessage } from '../../chat';
import { LISTINGS } from '../../data';
import { C } from '../../theme';

export default function Chat() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = LISTINGS.find((l) => l.id === id);
  const [messages, setMessages] = useState(getConversation(String(id)).messages);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);
  const conv = getConversation(String(id));

  const send = () => {
    const t = text.trim();
    if (!t) return;
    sendMessage(String(id), t);
    setMessages(getConversation(String(id)).messages);
    setText('');
  };

  return (
    <SafeAreaView style={s.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={s.header}>
          <TouchableOpacity style={s.back} onPress={() => router.back()}>
            <Text style={s.backText}>‹</Text>
          </TouchableOpacity>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{conv.initials}</Text>
          </View>
          <View>
            <Text style={s.name}>{conv.name}</Text>
            <Text style={s.online}>En ligne</Text>
          </View>
        </View>

        {listing && (
          <TouchableOpacity
            style={s.listing}
            onPress={() => router.push(`/bien/${listing.id}` as never)}
          >
            <View style={[s.thumb, { backgroundColor: listing.colors[0] }]} />
            <View style={{ flex: 1 }}>
              <Text style={s.lTitle} numberOfLines={1}>{listing.title}</Text>
              <Text style={s.lPrice}>{listing.price}</Text>
            </View>
          </TouchableOpacity>
        )}

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={<Text style={s.day}>Aujourd’hui</Text>}
          ListEmptyComponent={<Text style={s.empty}>Envoyez le premier message</Text>}
          renderItem={({ item }) => (
            <View style={[s.bubble, item.from === 'me' ? s.me : s.them]}>
              <Text style={[s.msg, item.from === 'me' && { color: '#fff' }]}>{item.text}</Text>
            </View>
          )}
        />

        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            value={text}
            onChangeText={setText}
            placeholder="Écrire un message"
            placeholderTextColor={C.muted}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity style={s.send} onPress={send}>
            <Text style={s.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: C.border },
  back: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 30, color: C.text, marginTop: -4 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: 'Poppins_600SemiBold', color: '#fff' },
  name: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: C.text },
  online: { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.teal },
  listing: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', margin: 12, padding: 10, borderRadius: 16 },
  thumb: { width: 44, height: 44, borderRadius: 10 },
  lTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: C.text },
  lPrice: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: C.orange },
  day: { textAlign: 'center', fontFamily: 'Inter_400Regular', fontSize: 12, color: C.muted, marginBottom: 6 },
  empty: { textAlign: 'center', fontFamily: 'Inter_400Regular', color: C.muted, paddingVertical: 30 },
  bubble: { maxWidth: '78%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  them: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 6 },
  me: { alignSelf: 'flex-end', backgroundColor: C.blue, borderBottomRightRadius: 6 },
  msg: { fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text, lineHeight: 21 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: C.border },
  input: { flex: 1, height: 48, borderRadius: 24, borderWidth: 1, borderColor: C.border, backgroundColor: C.bg, paddingHorizontal: 18, fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text },
  send: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#fff', fontSize: 18 },
});