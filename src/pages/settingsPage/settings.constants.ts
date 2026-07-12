export type SettingsSection = 'profile' | 'security' | 'balance';

export type SettingsNavItem = {
  value: SettingsSection;
  title: string;
  description: string;
  path: string;
};

export const SETTINGS_DEFAULT_SECTION: SettingsSection = 'profile';

export const getSettingsNavItems = (): SettingsNavItem[] => [
  {
    value: 'profile',
    title: 'Профиль',
    description: 'Ник, описание, аватар, соцсети',
    path: '/settings/profile',
  },
  {
    value: 'security',
    title: 'Безопасность',
    description: 'Почта и смена пароля',
    path: '/settings/security',
  },
  {
    value: 'balance',
    title: 'Баланс',
    description: 'Пополнение и история',
    path: '/settings/balance',
  },
];

export const isSettingsSection = (value?: string): value is SettingsSection =>
  value === 'profile' || value === 'security' || value === 'balance';

export const resolveSettingsSection = (section?: string): SettingsSection | null => {
  if (!section) return null;
  return isSettingsSection(section) ? section : null;
};
