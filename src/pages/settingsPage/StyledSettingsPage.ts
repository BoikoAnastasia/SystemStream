import { Box, List, ListItem, styled } from '@mui/material';

export const StyledSettingsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
});

export const StyledSettingsLisContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: 360,
  height: '100%',
});

export const StyledListSettings = styled(List)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginBottom: '30px',
});

export const StyleListItemSettings = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: 0,
});
