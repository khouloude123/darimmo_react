export type MyListing = { id: string; status: 'approved' | 'pending' };

export const MY_LISTINGS: MyListing[] = [
  { id: '1', status: 'approved' },
  { id: '2', status: 'approved' },
  { id: '6', status: 'pending' },
];
