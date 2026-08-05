import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// reducer
import {
  checkExistEmail,
  checkExistNickname,
  loginUser,
  registrationUser,
  userProfile,
} from '../../store/actions/UserActions';
import { AppDispatch } from '../../store/store';
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
  StyledTextFieldOutlined,
  StyledTextFieldRegular,
  StyledFollowButton,
} from '../StylesComponents';
// types
import { IModalRegistForm } from '../../types/share';
import { useHeaderModal } from '../../context/HeaderModalContext';

export const FormAuth = ({
  handleClose,
  setMessage,
}: {
  handleClose: () => void;
  setMessage: Dispatch<SetStateAction<string | null>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

      const loggedIn = await loginUser({ loginOrEmail: values.email!, password: values.password });
      if (!loggedIn.ok) {
        if (loggedIn.status === 429) {
          showAlert(loggedIn.message || 'Слишком много запросов. Подождите минуту.', 'error');
          return;
        }
        setMessage('Аккаунт создан — войдите на вкладке «Вход».');
        resetForm();
        return;
      }

      const action = await dispatch(userProfile());
      const userData = action?.payload;
      setMessage(null);
      handleClose();
      navigate(`/${userData?.nickname || values.username}`);
      resetForm();
    } catch (error: any) {
      showAlert(error?.message || 'Произошла ошибка при регистрации.', 'error');
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
          <StyledTextFieldRegular
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
          <StyledTextFieldRegular
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
            <StyledTextFieldOutlined
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
