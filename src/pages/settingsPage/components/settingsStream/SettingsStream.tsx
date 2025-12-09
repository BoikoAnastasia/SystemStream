import { useCallback, useEffect, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../hooks/redux';
import { AppDispatch } from '../../../../store/store';
// store
import { fetchStatusCurrentStream, fetchStreamKey, postStreamKey } from '../../../../store/actions/StreamActions';
// components
import { useHeaderModal } from '../../../../context/HeaderModalContext';
import { SettingUpdateStream } from './SettingUpdateStream';
// mui
import { Box, FormControl, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// styles
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledIconButton,
  StyledInputLabel,
  StyledOutlinedInputModal,
  StyledSpanDark,
  StyledTitleH3,
} from '../../../../components/StylesComponents';
import { ILiveStatusStream } from '../../../../types/share';

export const SettingsKey = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError } = useAppSelector((state) => state.settings);
  const { showAlert } = useHeaderModal();

  const [showKey, setShowKey] = useState(false);
  const [streamKey, setStreamKey] = useState('');
  const [dataCurrentStream, setDataCurrentStream] = useState<ILiveStatusStream | null>(null);

  const handleClickShowKey = () => setShowKey((show) => !show);
  const handleMouseDownKey = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpKey = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (data?.streamKey) {
      setStreamKey(data.streamKey);
    } else {
      setStreamKey('');
    }
  }, [data]);

  useEffect(() => {
    const fetchStatusStream = async () => {
      try {
        const response = await fetchStatusCurrentStream();
        if (!response?.success) throw new Error(response?.message);
        else if (response.success) {
          setDataCurrentStream(response.data);
        }
      } catch (error) {
        showAlert('Не удалось получить текущий стрим', 'error');
      }
    };
    fetchStatusStream();
  }, [showAlert]);

  const getStreamKey = useCallback(() => {
    if (data?.streamKey) return;
    dispatch(fetchStreamKey());
  }, [data, dispatch]);

  useEffect(() => {
    getStreamKey();
  }, [getStreamKey]);

  const changeKey = () => {
    dispatch(postStreamKey());
  };

  return (
    <>
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
      <StyledTitleH3 sx={{ marginTop: '20px' }}>Изменить текущий стрим:</StyledTitleH3>
      <Box>
        {dataCurrentStream?.streamInfo ? (
          <SettingUpdateStream dataCurrentStream={dataCurrentStream} showAlert={showAlert} />
        ) : (
          <StyledSpanDark>Стрим еще не начат</StyledSpanDark>
        )}
      </Box>
    </>
  );
};
