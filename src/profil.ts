export type Profile = {
  name: string;
  email: string;
  phone: string;
};

let current: Profile = {
  name: 'khouloud fakraoui',
  email: 'khouloud.fakraoui@gmail.com',
  phone: '',
};

export const getProfile = () => current;
export const setProfile = (p: Profile) => {
  current = p;
};

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');