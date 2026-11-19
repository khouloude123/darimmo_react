import { Listing } from './data';

export type Sort = 'recent' | 'prix_asc' | 'prix_desc';

export type Filters = {
  mode: 'acheter' | 'louer';
  type: string | null;
  minCh: number | null;
  minPrice: number;
  maxPrice: number;
  radius: number;
  sort: Sort;
  query: string;
};

export const RANGE = {
  acheter: { min: 0, max: 600000, step: 10000 },
  louer: { min: 0, max: 5000, step: 100 },
};

export const DEFAULT_FILTERS: Filters = {
  mode: 'acheter',
  type: null,
  minCh: null,
  minPrice: RANGE.acheter.min,
  maxPrice: RANGE.acheter.max,
  radius: 10,
  sort: 'recent',
  query: '',
};

let current: Filters = { ...DEFAULT_FILTERS };
export const getFilters = () => current;
export const setFilters = (f: Filters) => {
  current = f;
};

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function applyFilters(list: Listing[], f: Filters): Listing[] {
  const q = norm(f.query.trim());
  const out = list.filter(
    (l) =>
      l.mode === f.mode &&
      (!f.type || l.type === f.type) &&
      (!f.minCh || l.ch >= f.minCh) &&
      l.priceNum >= f.minPrice &&
      l.priceNum <= f.maxPrice &&
      (!q || norm(l.title).includes(q) || norm(l.place).includes(q) || norm(l.type).includes(q))
  );
  if (f.sort === 'prix_asc') out.sort((a, b) => a.priceNum - b.priceNum);
  if (f.sort === 'prix_desc') out.sort((a, b) => b.priceNum - a.priceNum);
  return out;
}
