export type Pending = { id: string; seller: string };

let pending: Pending[] = [
  { id: '4', seller: 'Sami Ben Ali' },
  { id: '6', seller: 'Leila Trabelsi' },
];
let approved = 0;
let refused = 0;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((fn) => fn());

export const getPending = () => pending;
export const getStats = () => ({ approved, refused });

export function approve(id: string) {
  pending = pending.filter((p) => p.id !== id);
  approved += 1;
  emit();
}

export function refuse(id: string) {
  pending = pending.filter((p) => p.id !== id);
  refused += 1;
  emit();
}

export function subscribeModeration(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
