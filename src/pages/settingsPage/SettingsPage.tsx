import { ComponentType, FC, JSX, useEffect, useState } from 'react';
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
  component?: ComponentType<any>;
}
const itemsList: IListSettings[] = [
  {
    value: 'key',
    title: 'Настройки профиля',
    component: SettingsChangeProfile,
  },
  {
    value: 'stream',
    title: 'Настройки стрима',
    component: SettingsKey,
  },
  {
    value: 'balance',
    title: 'Пополнить баланс',
  },
];

export const SettingsPage: FC = settingLayout((): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<IListSettings | null>(itemsList[0]);

  useEffect(() => {
    const saved = localStorage.getItem('settings-selected');
    if (saved) {
      const found = itemsList.find((i) => i.value === saved);
      if (found) setSelectedItem(found);
    }
  }, []);

  const handleSelect = (item: IListSettings) => {
    setSelectedItem(item);
    localStorage.setItem('settings-selected', item.value);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }} className="container">
      <Box sx={{ width: '100%', maxWidth: 360, height: '100%' }}>
        <nav aria-label="main mailbox folders">
          <List>
            {itemsList &&
              itemsList.map((item: IListSettings) => (
                <ListItem disablePadding key={item.value}>
                  <ListItemButton onClick={() => handleSelect(item)}>
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
