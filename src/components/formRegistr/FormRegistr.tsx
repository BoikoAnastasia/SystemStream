import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
// reducer
import { checkExistEmail, checkExistNickname, registrationUser } from '../../store/actions/UserActions';
// formik
import { Formik, Form } from 'formik';
import { validationRegist } from '../../validation/validation';
// mui
import { Box, Checkbox, FormControl, FormControlLabel, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// styles
import {
  StyledButtonsForm,
  StyledButtonForm,
  StyledIconButton,
  StyledInputLabel,
  StyledOutlinedInputModal,
  StyledTextFieldModal,
} from '../StylesComponents';
// types
import { IModalForm } from '../../types/share';

export const FormAuth = ({ setMessage }: { setMessage: Dispatch<SetStateAction<string | null>> }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const checkIfUserExist = async (values: IModalForm) => {
    if (!values.email || !values.username) return;
    const resultNickname = await checkExistNickname(values.username);
    if (resultNickname === true) {
      setErrorMessage('Данный ник уже используется');
      return false;
    }
    const resultEmail = await checkExistEmail(values.email);
    if (resultEmail === true) {
      setErrorMessage('Данная почта уже существует');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const regUser = async (values: IModalForm) => {
    setErrorMessage('');
    setMessage('');
    const resCheck = await checkIfUserExist(values);
    if (!resCheck) return;

    const result = await registrationUser({
      username: values.username,
      password: values.password,
      email: values.email!,
    });

    if (result.success) {
      setMessage('Вы успешно прошли регистрацию! Теперь авторизуйтесь.');
    } else {
      setMessage(result.message);
      setErrorMessage(result.message);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', email: '' }}
      validationSchema={validationRegist}
      onSubmit={regUser}
      enableReinitialize={false}
      autoComplete="on"
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
            autoComplete="username"
            inputProps={{
              autoComplete: 'username',
            }}
          />
          <StyledTextFieldModal
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            label="Электронная почта"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            autoComplete="email"
            inputProps={{
              autoComplete: 'email',
            }}
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
              autoComplete="false"
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
              <Box sx={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.password}</Box>
            )}
            {errorMessage && <Box sx={{ color: 'var(--error)', fontSize: '14px' }}>{errorMessage}</Box>}
          </FormControl>
          <FormControlLabel
            sx={{
              fontSize: '12px',
              '.MuiCheckbox-root': {
                color: 'white',
              },
            }}
            required
            control={<Checkbox />}
            label={
              <span style={{ fontSize: '12px' }}>
                Регистрируясь, вы соглашаетесь с{' '}
                <a style={{ color: '#7163f8' }} href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  политикой конфиденциальности
                </a>
              </span>
            }
          />
          <StyledButtonsForm>
            <StyledButtonForm type="submit">Зарегистрироваться</StyledButtonForm>
          </StyledButtonsForm>
        </Form>
      )}
    </Formik>
  );
};
