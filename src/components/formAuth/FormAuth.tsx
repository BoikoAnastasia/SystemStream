import React, { useState } from 'react';
// api
import { PostReg } from '../../API/PostReg';
// formik
import { Formik, Form } from 'formik';
import { validationRegist } from '../../validation/validation';
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

interface RegFormValues {
  password: string;
  username: string;
  email: string;
}

export const FormAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const regUser = async (values: RegFormValues) => {
    const data = await PostReg({ username: values.username, password: values.password, email: values.email });
    if (data !== null) {
      console.log('успешно');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', email: '' }}
      validationSchema={validationRegist}
      onSubmit={regUser}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px', width: '100%' }}
        >
          <StyledTextFieldModal
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            name="username"
            label="Имя пользователя"
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <StyledTextFieldModal
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            label="Электронная почта"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <FormControl variant="outlined" sx={{ width: '100%' }}>
            <StyledInputLabel htmlFor="outlined-adornment-password">Пароль</StyledInputLabel>
            <StyledOutlinedInputModal
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
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
            <StyledIButtonForm type="submit">Зарегистрироваться</StyledIButtonForm>
          </StyledButtonsForm>
        </Form>
      )}
    </Formik>
  );
};
