import React, { useState } from 'react';
import { FormControl, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  StyledButtonsForm,
  StyledIButtonForm,
  StyledIconButton,
  StyledInputLabel,
  StyledOutlinedInputModal,
  StyledTextFieldModal,
} from '../StylesComponents';

//TODO stepper?
//TODO datepicker

export const FormAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', width: '100%' }}>
      <StyledTextFieldModal label="Имя пользователя" />
      <StyledTextFieldModal label="Электронная почта" />
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <StyledInputLabel htmlFor="outlined-adornment-password">Пароль</StyledInputLabel>
        <StyledOutlinedInputModal
          sx={{ borderRadius: '50px' }}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <StyledIconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </StyledIconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <StyledButtonsForm>
        <StyledIButtonForm>Зарегистрироваться</StyledIButtonForm>
      </StyledButtonsForm>
    </form>
  );
};
