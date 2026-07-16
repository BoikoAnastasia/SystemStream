export type StaffSection = 'reports';

export type StaffNavItem = {
  value: StaffSection;
  title: string;
  description: string;
  path: string;
};

export const STAFF_DEFAULT_SECTION: StaffSection = 'reports';

export const getStaffNavItems = (): StaffNavItem[] => [
  {
    value: 'reports',
    title: 'Жалобы',
    description: 'Очередь Trust & Safety',
    path: '/staff/reports',
  },
];

export const isStaffSection = (value?: string): value is StaffSection => value === 'reports';
