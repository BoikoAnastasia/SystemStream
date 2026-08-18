export type SettingsSection = 'profile' | 'security' | 'support';

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
    value: 'support',
    title: 'Поддержка',
    description: 'Тикеты и апелляции',
    path: '/settings/support',
  },
];

export const isSettingsSection = (value?: string): value is SettingsSection =>
  value === 'profile' || value === 'security' || value === 'support';

export const resolveSettingsSection = (section?: string): SettingsSection | null => {
  if (!section) return null;
  // Old bookmark /settings/appeals → support
  if (section === 'appeals') return 'support';
  if (section === 'balance') return SETTINGS_DEFAULT_SECTION;
  return isSettingsSection(section) ? section : null;
};
