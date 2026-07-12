import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { Box, TextField } from '@mui/material';
import * as Yup from 'yup';
import { AppDispatch } from '../../../store/store';
import { checkExistEmail } from '../../../store/actions/UserActions';
import { changeProfileData } from '../../../store/actions/SettingsActions';
import { useAppSelector } from '../../../hooks/redux';
import { useSettingsNotice } from '../context/SettingsNoticeContext';
import { passwordSchema } from '../../../validation/validation';
import { SettingsFieldBlock, SettingsFormActions } from '../components/ProfileImageField';
import { settingsFieldSx, settingsPanelSx } from '../settings.styles';
import { StyledSettingsSectionHint, StyledSettingsSectionTitle } from '../StyledSettingsPage';

const securitySchema = Yup.object({
  email: Yup.string()
    .nullable()
    .notRequired()
    .test('email', 'Введите корректный email', (value) => {
      if (!value) return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  currentPassword: Yup.string().when('newPassword', {
    is: (val: string) => Boolean(val?.trim()),
    then: (schema) => schema.required('Введите текущий пароль'),
    otherwise: (schema) => schema.notRequired(),
  }),
  newPassword: Yup.string()
    .nullable()
    .notRequired()
    .test('password', 'Некорректный пароль', (value) => {
      if (!value) return true;
      try {
        passwordSchema.validateSync(value);
        return true;
      } catch {
        return false;
      }
    }),
});

type SecurityForm = {
  email: string;
  currentPassword: string;
  newPassword: string;
};

export const SettingsSecuritySection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: userData } = useAppSelector((state) => state.user);
  const { showNotice } = useSettingsNotice();

  const initialValues: SecurityForm = {
    email: '',
    currentPassword: '',
    newPassword: '',
  };

  const onSubmit = async (values: SecurityForm, { setFieldError, setSubmitting, resetForm }: any) => {
    const hasAnyValue = !!values.email?.trim() || !!values.newPassword?.trim();

    if (!hasAnyValue) {
      showNotice('Заполните email или новый пароль', 'warning');
      return;
    }

    if (values.newPassword && !values.currentPassword) {
      showNotice('Для смены пароля нужен текущий пароль', 'warning');
      return;
    }

    setSubmitting(true);
    const formData = new FormData();

    try {
      if (values.email) {
        const emailResult = await checkExistEmail(values.email);
        if (!emailResult.success) throw new Error(emailResult.message);
        if (emailResult.data?.exists && values.email !== userData?.email) {
          setFieldError('email', 'Данная почта уже используется');
          return;
        }
      }

      if (values.email) formData.append('Email', values.email);
      if (values.currentPassword) formData.append('CurrentPassword', values.currentPassword);
      if (values.newPassword) formData.append('NewPassword', values.newPassword);

      const result = await dispatch(changeProfileData(formData));
      if (!result.success) throw new Error(result.message);

      showNotice('Настройки безопасности обновлены', 'success');
      resetForm();
    } catch {
      showNotice('Не удалось сохранить изменения', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={securitySchema} onSubmit={onSubmit}>
      {({ values, handleChange, handleBlur, touched, errors, resetForm, isSubmitting }) => (
        <Form>
          <StyledSettingsSectionTitle>Безопасность</StyledSettingsSectionTitle>
          <StyledSettingsSectionHint>
            Почта и пароль видны только вам. Текущая почта: {userData?.email || '—'}
          </StyledSettingsSectionHint>

          <Box sx={{ ...settingsPanelSx, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <SettingsFieldBlock title="Новая почта" hint="Оставьте пустым, если не меняете">
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder={userData?.email || 'email@example.com'}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={settingsFieldSx}
              />
            </SettingsFieldBlock>

            <SettingsFieldBlock title="Текущий пароль" hint="Нужен только при смене пароля">
              <TextField
                fullWidth
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.currentPassword && Boolean(errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
                sx={settingsFieldSx}
              />
            </SettingsFieldBlock>

            <SettingsFieldBlock title="Новый пароль" hint="Минимум 6 символов, буква и цифра">
              <TextField
                fullWidth
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                sx={settingsFieldSx}
              />
            </SettingsFieldBlock>
          </Box>

          <SettingsFormActions onReset={() => resetForm()} isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};
