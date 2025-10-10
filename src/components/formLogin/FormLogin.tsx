import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// formik
import { Formik, Form } from 'formik';
import { validationLogin } from '../../validation/validation';
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
import { IModalForm } from '../../types/share';

export const FormLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const authUser = async (values: IModalForm) => {
    const data = await PostAuth({ emailOrUsername: values.username, password: values.password });
    if (data !== null) {
      console.log('успешно');
      navigate('/user');
    }
  };

  return (
    <Formik initialValues={{ username: '', password: '' }} validationSchema={validationLogin} onSubmit={authUser}>
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', width: '100%' }}
        >
          <StyledTextFieldModal
            label="Логин или электронная почта"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            name="username"
          />
          <FormControl variant="outlined" sx={{ width: '100%' }}>
            <StyledInputLabel htmlFor="outlined-adornment-password">Пароль</StyledInputLabel>
            <StyledOutlinedInputModal
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
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
            {touched.password && errors.password && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.password}</div>
            )}
          </FormControl>
          <StyledButtonsForm>
            <StyledIButtonForm variant="contained" type="submit">
              Войти
            </StyledIButtonForm>
            <div style={{ color: 'white', fontSize: '14px' }}>или</div>
            <StyledIButtonForm bgcolor={'#B2B2B2'} c={'#3c474aff'}>
              Продолжить с помощью Google
            </StyledIButtonForm>
          </StyledButtonsForm>
        </Form>
      )}
    </Formik>
  );
};
