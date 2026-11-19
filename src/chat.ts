export type Msg = { id: string; from: 'me' | 'them'; text: string };

export type Conversation = {
  listingId: string;
  name: string;
  initials: string;
  messages: Msg[];
};

const store: Record<string, Conversation> = {
  '1': {
    listingId: '1',
    name: 'Sami Ben Ali',
    initials: 'SB',
    messages: [
      { id: 'a', from: 'them', text: 'Bonjour, la villa est-elle toujours disponible ?' },
      { id: 'b', from: 'me', text: 'Bonjour, oui, elle est disponible. Souhaitez-vous la visiter ?' },
      { id: 'c', from: 'them', text: 'Oui, samedi matin si possible.' },
      { id: 'd', from: 'me', text: 'Parfait, samedi à 10h. Je vous envoie l’adresse exacte.' },
    ],
  },
};

export const listConversations = () => Object.values(store);

export function getConversation(listingId: string): Conversation {
  if (!store[listingId]) {
    store[listingId] = { listingId, name: 'Sami Ben Ali', initials: 'SB', messages: [] };
  }
  return store[listingId];
}

export function sendMessage(listingId: string, text: string) {
  const c = getConversation(listingId);
  c.messages = [...c.messages, { id: String(Date.now()), from: 'me', text }];
}