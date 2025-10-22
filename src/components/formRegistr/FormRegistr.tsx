import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
// reducer
import { registrationUser } from '../../store/reducers/ActionCreate';
// formik
import { Formik, Form } from 'formik';
import { validationRegist } from '../../validation/validation';
// mui
import { Box, FormControl, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  StyledButtonsForm,
  StyledButtonForm,
  StyledIconButton,
  StyledInputLabel,
  StyledOutlinedInputModal,
  StyledTextFieldModal,
} from '../StylesComponents';
import { IModalForm } from '../../types/share';

//TODO stepper?
//TODO datepicker

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

  const regUser = async (values: IModalForm) => {
    setErrorMessage('');
    setMessage('');

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
            {errorMessage && (
              <Box sx={{ color: 'var(--error)', fontSize: '14px', marginTop: '-10px' }}>{errorMessage}</Box>
            )}
          </FormControl>
          <StyledButtonsForm>
            <StyledButtonForm type="submit">Зарегистрироваться</StyledButtonForm>
          </StyledButtonsForm>
        </Form>
      )}
    </Formik>
  );
};
