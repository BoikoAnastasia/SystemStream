import { Autocomplete } from '@mui/material';
import { StyledTextFieldModal } from '../../StylesComponents';
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
      renderInput={(params) => <StyledTextFieldModal {...params} label="Категории" />}
    />
  );
};

// "page": 1,
//   "pageSize": 20,
//   "totalCategories": 5,
//   "categories": [
//     {
//       "id": 5,
//       "name": "Chess",
//       "bannerImageUrl": null
//     },
//     {
//       "id": 1,
//       "name": "Counter Strike",
//       "bannerImageUrl": null
//     },
//     {
//       "id": 2,
//       "name": "Fortnite",
//       "bannerImageUrl": null
//     },
//     {
//       "id": 3,
//       "name": "Just Chatting",
//       "bannerImageUrl": null
//     },
//     {
//       "id": 4,
//       "name": "Music",
//       "bannerImageUrl": null
//     }
//   ]
