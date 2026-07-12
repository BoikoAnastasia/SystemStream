export const settingsPanelSx = {
  p: 2,
  borderRadius: 2,
  bgcolor: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
};

export const settingsFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    bgcolor: 'rgba(255,255,255,0.04)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(142,123,255,0.35)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(142,123,255,0.55)' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.55)' },
  '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.4)' },
};

export const settingsPrimaryButtonSx = {
  textTransform: 'none',
  bgcolor: '#6d5dfb',
  '&:hover': { bgcolor: '#8e7bff' },
};

export const settingsOutlinedButtonSx = {
  textTransform: 'none',
  color: 'rgba(255,255,255,0.85)',
  borderColor: 'rgba(255,255,255,0.18)',
  '&:hover': { borderColor: 'rgba(142,123,255,0.45)', bgcolor: 'rgba(142,123,255,0.08)' },
};
