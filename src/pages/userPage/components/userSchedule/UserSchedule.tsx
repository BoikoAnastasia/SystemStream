import { useState } from 'react';
// components
import { ScheduleCard } from '../../../../components/scheduleCard/ScheduleCard';
// hooks
import { useDeviceDetect } from '../../../../hooks/useDeviceDetect';
// mui
import { Box, MenuItem } from '@mui/material';
// styles
import {
  ContainerProfileComponents,
  StyledBannerUserName,
  StyledFilterButton,
  StyledFilters,
  StyledScheduleFormControl,
  StyledScheduleInputLabel,
  StyledScheduleSelect,
  StyledVideoGrid,
} from '../../../../components/StylesComponents';

export const UserSchedule = () => {
  const filters = [
    { value: 'Все', id: 'all' },
    { value: 'Игры', id: 'game' },
    { value: 'Музыка', id: 'music' },
    { value: 'Подкасты', id: 'podcast' },
    { value: 'Киберспорт', id: 'kibersport' },
  ];

  const { isMobile } = useDeviceDetect();
  const [period, setPeriod] = useState<string>('day');
  const [activeFilter, setActiveFilter] = useState<string>('Все');

  const handleChange = (event: any) => {
    setPeriod(event.target.value as string);
  };

  return (
    <ContainerProfileComponents>
      <StyledBannerUserName>Расписание стримов</StyledBannerUserName>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <StyledFilters>
          {filters &&
            filters.map((filter) => (
              <StyledFilterButton
                key={filter.id}
                className={activeFilter === filter.value ? 'active' : ''}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.value}
              </StyledFilterButton>
            ))}
        </StyledFilters>
        <StyledScheduleFormControl>
          <StyledScheduleInputLabel id="demo-simple-select-label">Период</StyledScheduleInputLabel>
          <StyledScheduleSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={period}
            label="Период"
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: '#121026c9',
                  color: '#A1A1B5',
                  backdropFilter: 'blur(10px)',
                  '& .MuiMenuItem-root': {
                    fontSize: '14px',
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&.Mui-selected': {
                      background: 'rgba(63, 75, 163, 0.56)',
                      color: '#fff',
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value={'day'}>Сегодня</MenuItem>
            <MenuItem value={'week'}>Эта неделя</MenuItem>
            <MenuItem value={'mouth'}>Этот месяц</MenuItem>
          </StyledScheduleSelect>
        </StyledScheduleFormControl>
      </Box>
      <StyledVideoGrid>
        <ScheduleCard live={true} />
        <ScheduleCard live={false} />
        <ScheduleCard live={false} />
        <ScheduleCard live={true} />
      </StyledVideoGrid>
    </ContainerProfileComponents>
  );
};
