export type Listing = {
  id: string;
  price: string;
  priceNum: number;
  title: string;
  place: string;
  type: 'appartement' | 'villa' | 'terrain' | 'local';
  ch: number;
  sdb: number;
  m2: number;
  colors: [string, string];
  fav: boolean;
  mode: 'acheter' | 'louer';
    lat: number;
    lng: number;
};
export const LISTINGS: Listing[] = [
  { id: '1', price: '485 000 DT', priceNum: 485000, title: 'Villa avec jardin et piscine', place: 'La Marsa', lat: 0.42, lng: 0.50, type: 'villa', ch: 4, sdb: 3, m2: 240, colors: ['#1E3A8A', '#14B8A6'], fav: true, mode: 'acheter' },
  { id: '2', price: '560 000 DT', priceNum: 560000, title: 'Villa moderne S+4', place: 'La Marsa', lat: 0.46, lng: 0.68, type: 'villa', ch: 5, sdb: 3, m2: 280, colors: ['#0F766E', '#93C5FD'], fav: false, mode: 'acheter' },
  { id: '3', price: '395 000 DT', priceNum: 395000, title: 'Villa jumelée proche plage', place: 'Gammarth', lat: 0.30, lng: 0.20, type: 'villa', ch: 3, sdb: 2, m2: 190, colors: ['#F59E0B', '#1E3A8A'], fav: false, mode: 'acheter' },
  { id: '4', price: '1 200 DT / mois', priceNum: 1200, title: 'Appartement S+2 vue mer', place: 'Les Berges du Lac', lat: 0.58, lng: 0.30, type: 'appartement', ch: 2, sdb: 1, m2: 95, colors: ['#0F766E', '#93C5FD'], fav: false, mode: 'louer' },
  { id: '5', price: '900 DT / mois', priceNum: 900, title: 'Appartement S+1 meublé', place: 'Ennasr', lat: 0.36, lng: 0.78, type: 'appartement', ch: 1, sdb: 1, m2: 60, colors: ['#1E3A8A', '#14B8A6'], fav: true, mode: 'louer' },
  { id: '6', price: '220 000 DT', priceNum: 220000, title: 'Terrain constructible', place: 'Hammamet', lat: 0.66, lng: 0.62, type: 'terrain', ch: 0, sdb: 0, m2: 500, colors: ['#F59E0B', '#1E3A8A'], fav: false, mode: 'acheter' },
];