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

export const FormLogin = () => {
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
      <StyledTextFieldModal label="Логин или электронная почта" />
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
        <StyledIButtonForm variant="contained">Войти</StyledIButtonForm>
        <div style={{ color: 'white', fontSize: '14px' }}>или</div>
        <StyledIButtonForm bgcolor={'#B2B2B2'} c={'#3c474aff'}>
          Продолжить с помощью Google
        </StyledIButtonForm>
      </StyledButtonsForm>
    </form>
  );
};
