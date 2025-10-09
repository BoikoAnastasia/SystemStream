import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// api
import { PostAuth } from '../../API/PostAuth';

// mui
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, InputAdornment } from '@mui/material';
import {
  StyledButtonsForm,
  StyledIButtonForm,
  StyledIconButton,
  StyledInputLabel,
  StyledOutlinedInputModal,
  StyledTextFieldModal,
} from '../StylesComponents';

export const FormLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const authUser = async () => {
    if (username.trim() === '' || password.trim() === '') return;
    console.log(username, password);
    const data = await PostAuth({ emailOrUsername: username, password });
    if (data !== null) {
      console.log('успешно');
      navigate('/user');
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', width: '100%' }}>
      <StyledTextFieldModal
        label="Логин или электронная почта"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
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
        <StyledIButtonForm variant="contained" onClick={authUser}>
          Войти
        </StyledIButtonForm>
        <div style={{ color: 'white', fontSize: '14px' }}>или</div>
        <StyledIButtonForm bgcolor={'#B2B2B2'} c={'#3c474aff'}>
          Продолжить с помощью Google
        </StyledIButtonForm>
      </StyledButtonsForm>
    </form>
  );
};
