import { LISTINGS, Listing } from './data';
import { Filters, applyFilters } from './filters';
import { toggleFav, favIds } from './favorites';
import { getProfile as readProfile, setProfile, Profile } from './profile';
import { listConversations, getConversation, sendMessage as pushMessage } from './chat';
import { approve, refuse, getPending } from './moderation';

// ===== Auth (TODO Supabase: supabase.auth) =====
export async function login(email: string, password: string) {
  if (!email.trim() || !password) throw new Error('Email et mot de passe requis');
  return { role: 'client' as 'client' | 'admin' };
}

export async function signup(name: string, email: string, password: string) {
  if (password.length < 8) throw new Error('Mot de passe trop court');
  setProfile({ name, email, phone: '' });
  return { role: 'client' as const };
}

export async function logout() {}

// ===== Profil (TODO Supabase: table profiles) =====
export async function getProfile(): Promise<Profile> {
  return readProfile();
}
export async function updateProfile(p: Profile) {
  setProfile(p);
}

// ===== Annonces (TODO Supabase: table listings) =====
export async function getListings(filters?: Filters): Promise<Listing[]> {
  return filters ? applyFilters(LISTINGS, filters) : LISTINGS;
}
export async function getListing(id: string): Promise<Listing | undefined> {
  return LISTINGS.find((l) => l.id === id);
}
export async function createListing(form: Record<string, unknown>): Promise<{ id: string }> {
  // TODO: insert avec moderation = 'pending' + upload photos (Storage)
  return { id: String(Date.now()) };
}

// ===== Favoris (TODO Supabase: table favorites) =====
export async function getFavorites(): Promise<string[]> {
  return favIds();
}
export async function toggleFavorite(id: string) {
  toggleFav(id);
}

// ===== Messagerie (TODO Supabase: table messages + Realtime) =====
export async function getConversations() {
  return listConversations();
}
export async function getMessages(listingId: string) {
  return getConversation(listingId).messages;
}
export async function sendMessage(listingId: string, text: string) {
  pushMessage(listingId, text);
}

// ===== Admin (TODO Supabase: profiles.role = 'admin' + RLS) =====
export async function getPendingListings() {
  return getPending();
}
export async function approveListing(id: string) {
  approve(id);
}
export async function refuseListing(id: string) {
  refuse(id);
}
