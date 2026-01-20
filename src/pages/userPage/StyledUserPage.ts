import { Avatar, Box, FormControl, InputLabel, Select, styled } from '@mui/material';

export const StyledFilters = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
});

export const StyledScheduleFormControl = styled(FormControl)({
  color: 'var(--color-link)',
  borderRadius: '10px',
  background: 'var(--background-tabs)',
  width: '25%',
  height: 45,
  '@media (max-width: 768px)': {
    width: '100%',
  },
});

export const StyledScheduleInputLabel = styled(InputLabel)({
  width: '100%',
  color: 'var(--color-link)',
  '&.Mui-focused': {
    color: 'var(--color-link)',
  },
  '& MuiOutlinedInput-input': {
    borderColor: 'var(--color-link)',
  },
});

export const StyledScheduleSelect = styled(Select)(() => ({
  width: '100%',
  color: 'var(--color-link)',
  height: 45,
  // // Border color (default, hover, focused)
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '12px',
    borderColor: 'var(--color-link) !important',
  },
  '& .MuiSelect-icon': {
    color: 'var(--color-link)',
  },
}));

export const StyledInfo = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  maxWidth: '50%',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#0000001c',
  zIndex: 2,
  '@media (max-width: 768px)': {
    maxWidth: '100%',
    alignItems: 'center',
  },
});

export const StyledBannerAvatar = styled(Avatar)(() => ({
  height: '150px',
  width: '150px',
}));

export const StyledAboutSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  lineHeight: 1.6,
});

export const StyledVideoSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const StyledVideoGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '20px',
  padding: '0 20px',
});

export const ContainerProfileComponents = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  paddingBottom: '40px',
}));

export const StyledProfileSection = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  height: '330px',
  padding: '20px 60px 40px',
  borderRadius: '20px',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    height: 'auto',
    padding: '20px',
  },
});

export const StyledBannerUserName = styled('h1')(() => ({
  fontSize: '40px',
  fontWeight: 'bold',
  color: 'var(--white)',
  '@media (max-width: 1024px)': {
    fontSize: '40px',
  },
}));

export const StyledBannerUserInfo = styled('h1')(() => ({
  fontSize: '28px',
  fontWeight: 400,
  color: '#bbb',
  '@media (max-width: 1024px)': {
    fontSize: '24px',
  },
}));
