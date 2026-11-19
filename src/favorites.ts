import { LISTINGS } from './data';

const ids = new Set<string>(LISTINGS.filter((l) => l.fav).map((l) => l.id));
const listeners = new Set<() => void>();

export const isFav = (id: string) => ids.has(id);
export const favIds = () => Array.from(ids);

export function toggleFav(id: string) {
  if (ids.has(id)) ids.delete(id);
  else ids.add(id);
  listeners.forEach((fn) => fn());
}

export function subscribeFavs(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}