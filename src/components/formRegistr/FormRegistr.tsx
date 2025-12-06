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
  StyledIconButton,
  StyledInputLabel,
  StyledOutlinedInputModal,
  StyledTextFieldModal,
  StyledFollowButton,
} from '../StylesComponents';
// types
import { IModalRegistForm } from '../../types/share';
import { useHeaderModal } from '../../context/HeaderModalContext';

export const FormAuth = ({ setMessage }: { setMessage: Dispatch<SetStateAction<string | null>> }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { showAlert } = useHeaderModal();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const regUser = async (values: IModalRegistForm, { setFieldError, setSubmitting, resetForm }: any) => {
    setErrorMessage('');
    setSubmitting(true);
    if (!values.email || !values.username) return;

    try {
      // проверка никнейма
      const nicknameResult = await checkExistNickname(values.username);
      if (!nicknameResult.success) throw new Error(nicknameResult.message);
      if (nicknameResult.data?.exists) {
        setFieldError('username', 'Данный ник уже используется');
        return;
      }

      // проверка email
      const emailResult = await checkExistEmail(values.email);
      if (!emailResult.success) throw new Error(emailResult.message);
      if (emailResult.data?.exists) {
        setFieldError('email', 'Данная почта уже существует');
        return;
      }

      // регистрация
      const registrationResult = await registrationUser(values.username, values.email!, values.password);
      if (!registrationResult.success) {
        throw new Error(registrationResult.message);
      }
      showAlert('Вы успешно прошли регистрацию! Теперь авторизуйтесь.', 'success');
      resetForm();
    } catch (error: any) {
      showAlert('Произошла ошибка.', 'error');
    } finally {
      setSubmitting(false);
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
            <StyledFollowButton type="submit">Зарегистрироваться</StyledFollowButton>
          </StyledButtonsForm>
        </Form>
      )}
    </Formik>
  );
};
