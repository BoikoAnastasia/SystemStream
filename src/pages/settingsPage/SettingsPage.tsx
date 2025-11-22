import { ComponentType, FC, JSX, useState } from 'react';
// components
import { settingLayout } from '../../layout/SettingLayout';
// mui
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
// styles
import { SettingsKey } from './components/settingsKey/SettingsKey';
import { SettingsChangeProfile } from './components/settingsChangeProfile/SettingsChangeProfile';

interface IListSettings {
  value: string;
  title: string;
  href: string;
  component?: ComponentType<any>;
}
const itemsList: IListSettings[] = [
  {
    value: 'key',
    title: 'Настройки профиля',
    href: '#',
    component: SettingsChangeProfile,
  },
  {
    value: 'stream',
    title: 'Настройки стрима',
    component: SettingsKey,
    href: '#',
  },
  {
    value: 'balance',
    title: 'Пополнить баланс',
    href: '#',
  },
];

export const SettingsPage: FC = settingLayout((): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<IListSettings | null>(itemsList[0]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }} className="container">
      <Box sx={{ width: '100%', maxWidth: 360, height: '100%' }}>
        <nav aria-label="main mailbox folders">
          <List>
            {itemsList &&
              itemsList.map((item: IListSettings) => (
                <ListItem disablePadding key={item.value}>
                  <ListItemButton href={item.href} onClick={() => setSelectedItem(item)}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </nav>
      </Box>
      <Box sx={{ width: '100%' }}>{selectedItem?.component && <selectedItem.component />}</Box>
    </Box>
  );
});
