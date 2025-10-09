import React, { useState } from 'react';
// api
import { PostReg } from '../../API/PostReg';
// mui
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const regUser = async () => {
    if (username.trim() === '' || password.trim() === '' || email.trim() === '') return;
    console.log(username, password, email);
    const data = await PostReg({ username, password, email });
    if (data !== null) {
      console.log('успешно');
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', width: '100%' }}>
      <StyledTextFieldModal onChange={(e) => setUsername(e.target.value)} value={username} label="Имя пользователя" />
      <StyledTextFieldModal onChange={(e) => setEmail(e.target.value)} value={email} label="Электронная почта" />
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <StyledInputLabel htmlFor="outlined-adornment-password">Пароль</StyledInputLabel>
        <StyledOutlinedInputModal
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
        <StyledIButtonForm onClick={regUser}>Зарегистрироваться</StyledIButtonForm>
      </StyledButtonsForm>
    </form>
  );
};
