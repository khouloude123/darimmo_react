import { useEffect, useState } from 'react';
import { favIds, subscribeFavs } from './favorites';

export function useFavs() {
  const [ids, setIds] = useState(favIds());
  useEffect(() => subscribeFavs(() => setIds(favIds())), []);
  return ids;
}