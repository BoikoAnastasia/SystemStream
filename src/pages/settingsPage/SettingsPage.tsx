import { FC, JSX, useEffect, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
// store
import { AppDispatch } from '../../store/store';
import { fetchStreamKey, postStreamKey } from '../../store/actions/StreamActions';
// components
import { settingLayout } from '../../layout/SettingLayout';
// mui
import { Box, FormControl, InputAdornment, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// styles
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledIconButton,
  StyledInputLabel,
  StyledOutlinedInputModal,
  StyledTitleH3,
} from '../../components/StylesComponents';

export const SettingsPage: FC = settingLayout((): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError, isLoading } = useAppSelector((state) => state.settings);

  const [showKey, setShowKey] = useState(false);
  const [streamKey, setStreamKey] = useState('');

  const handleClickShowKey = () => setShowKey((show) => !show);
  const handleMouseDownKey = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpKey = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (data !== null) {
      setStreamKey(data.streamKey);
    }
  }, [data]);

  const getStreamKey = () => {
    dispatch(fetchStreamKey());
  };

  const changeKey = () => {
    dispatch(postStreamKey());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100%', maxWidth: 360, height: '100%' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Настройки стрима" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Box>
        <StyledTitleH3>Получение ключа</StyledTitleH3>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <FormControl variant="outlined" sx={{ width: '100%' }}>
            <StyledInputLabel htmlFor="outlined-adornment-key">Ключ</StyledInputLabel>
            <StyledOutlinedInputModal
              label="Ключ"
              name="key"
              type={showKey ? 'text' : 'password'}
              value={streamKey}
              aria-readonly
              endAdornment={
                <InputAdornment position="end">
                  <StyledIconButton
                    aria-label={showKey ? 'hide key' : 'show key'}
                    onClick={handleClickShowKey}
                    onMouseDown={handleMouseDownKey}
                    onMouseUp={handleMouseUpKey}
                    edge="end"
                  >
                    {showKey ? <VisibilityOff /> : <Visibility />}
                  </StyledIconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {isError && <Box sx={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{isError}</Box>}
          <StyledFollowButton
            sx={{ fontWeight: 500, width: '250px', padding: 0, height: '45px', margin: 0 }}
            onClick={getStreamKey}
          >
            Получить код
          </StyledFollowButton>
          <StyledFilterButton onClick={changeKey}>Сбросить</StyledFilterButton>
        </Box>
      </Box>
    </Box>
  );
});
