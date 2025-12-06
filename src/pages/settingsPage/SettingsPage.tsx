import { ComponentType, FC, JSX, useEffect, useState } from 'react';
// components
import { settingLayout } from '../../layout/SettingLayout';
import { SettingsChangeProfile } from './components/settingsChangeProfile/SettingsChangeProfile';
import { SettingsKey } from './components/settingsKey/SettingsKey';
// hooks
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
// mui
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

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
  const { isMobile } = useDeviceDetect();

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
    <Box sx={{ display: 'flex', width: '100%', flexDirection: isMobile ? 'column' : 'row' }} className="container">
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 360, height: '100%' }}>
        <List sx={{ position: 'sticky', top: 0 }}>
          {itemsList &&
            itemsList.map((item: IListSettings) => (
              <ListItem disablePadding key={item.value}>
                <ListItemButton onClick={() => handleSelect(item)}>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
      <Box sx={{ width: '100%' }}>{selectedItem?.component && <selectedItem.component />}</Box>
    </Box>
  );
});
