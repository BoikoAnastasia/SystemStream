import { Autocomplete } from '@mui/material';
import { StyledTextFieldRegular } from '../../StylesComponents';
import { ICategories } from '../../../types/share';

interface IPropsCombobox {
  options: ICategories[];
  value: number | null;
  setFieldValue: (field: string, value: any) => void;
  name: string;
}

export const ComboBox = ({ options, value, setFieldValue, name }: IPropsCombobox) => {
  const selectedOption = options?.find((opt) => opt.id === value) ?? null;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-setting"
      options={options}
      value={selectedOption}
      getOptionLabel={(option) => option.name ?? ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, option) => {
        setFieldValue('category', option?.id);
      }}
      noOptionsText="Категории не найдены"
      slotProps={{
        paper: {
          sx: {
            background: 'var(--gradient-selected)',
            color: 'var(--white)',
          },
        },
      }}
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'var(--white)',
          },
        },
      }}
      renderInput={(params) => <StyledTextFieldRegular {...params} label="Категории" />}
    />
  );
};
