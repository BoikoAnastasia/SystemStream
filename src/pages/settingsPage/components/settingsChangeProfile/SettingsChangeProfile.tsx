import { useState } from 'react';
import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../../../../store/store';
import { checkExistEmail, checkExistNickname } from '../../../../store/actions/UserActions';
import { changeProfileData } from '../../../../store/actions/SettingsActions';
// coomponents
import { SocialLinksEditor } from '../socialLinksEditor/SocialLinksEditor';
import { FileInputField } from '../../../../components/ui/fileInputField/FileInputField';
// formik
import { Formik, Form, FieldArray } from 'formik';
// validation
import { validationChangeProfile } from '../../../../validation/validation';
//hooks, context
import { useAppSelector } from '../../../../hooks/redux';
import { useHeaderModal } from '../../../../context/HeaderModalContext';
// mui, style, types
import { Box } from '@mui/material';
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledListSettings,
  StyledNameComponents,
  StyledTextFieldModal,
  StyledTitleH3,
  StyleListItemSettings,
} from '../../../../components/StylesComponents';
import { IProfileChange } from '../../../../types/share';

type ProfileField = keyof IProfileChange;

const listSettingsProfile: { label?: string; type: string; value: ProfileField; title: string; disabled?: boolean }[] =
  [
    { type: 'field', label: 'Введите ник', value: 'nickname', title: 'Изменить ник:' },
    { type: 'field', label: 'Введите почту', value: 'email', title: 'Изменить почту:' },
    { type: 'field', label: 'Введите новый пароль', value: 'newPassword', title: 'Изменить пароль:' },
    { type: 'field', label: 'Введите текущий пароль', value: 'currentPassword', title: 'Текущий пароль:' },
    { type: 'field', label: 'Введите описание', value: 'profileDescription', title: 'Изменить описание профиля:' },
    {
      type: 'file',
      value: 'profileImage',
      title: 'Изменить картинку профиля:',
    },
    {
      type: 'file',
      value: 'backgroundImage',
      title: 'Изменить фоновую картинку:',
    },
  ];

export const SettingsChangeProfile = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { data: userData } = useAppSelector((state) => state.user);
  const { showAlert } = useHeaderModal();

  const initialValues: IProfileChange = {
    nickname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    profileDescription: userData ? userData.profileDescription : '',
    profileImage: null,
    backgroundImage: null,
    socialLinks: userData ? userData.socialLinks : [],
  };

  const checkChangeProfile = async (values: IProfileChange, { setFieldError, setSubmitting }: any) => {
    setMessage('');
    // проверка на все пустые поля
    const hasAnyValue =
      !!values.nickname?.trim() ||
      !!values.email?.trim() ||
      !!values.currentPassword?.trim() ||
      !!values.newPassword?.trim() ||
      !!values.profileDescription?.trim() ||
      !!values.profileImage ||
      !!values.backgroundImage ||
      (values.socialLinks || []).some((link) => link.url?.trim() !== '');

    if (!hasAnyValue) {
      showAlert('Нельзя отправлять пустые данные.', 'warning');
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    try {
      // проверка никнейма
      if (values.nickname) {
        const nicknameResult = await checkExistNickname(values.nickname);
        if (!nicknameResult.success) throw new Error(nicknameResult.message);
        if (nicknameResult.data?.exists) {
          setFieldError('username', 'Данный ник уже используется');
          return;
        }
      }

      // проверка email
      if (values.email) {
        const emailResult = await checkExistEmail(values.email);
        if (!emailResult.success) throw new Error(emailResult.message);
        if (emailResult.data?.exists) {
          setFieldError('email', 'Данная почта уже существует');
          return;
        }
      }

      if (values.nickname) formData.append('Nickname', values.nickname);
      if (values.email) formData.append('Email', values.email);
      if (values.currentPassword) formData.append('CurrentPassword', values.currentPassword);
      if (values.newPassword) formData.append('NewPassword', values.newPassword);
      if (values.profileDescription) {
        formData.append('ProfileDescription', values.profileDescription);
      }
      // файлы
      if (values.profileImage) {
        formData.append('ProfileImage', values.profileImage);
      }
      if (values.backgroundImage) {
        formData.append('BackgroundImage', values.backgroundImage);
      }

      const filteredSocialLinks = (values.socialLinks || []).filter((link) => link.url && link.url.trim() !== '');

      formData.append('SocialLinks', JSON.stringify(filteredSocialLinks));
      console.log('formData - profile', formData);
      const changeProfileResult = await dispatch(changeProfileData(formData));
      if (!changeProfileResult.success) {
        throw new Error(changeProfileResult.message);
      }

      showAlert('Профиль обновлен.', 'success');
    } catch (error: any) {
      showAlert('Произошла ошибка.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationChangeProfile}
      onSubmit={checkChangeProfile}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, touched, errors, resetForm, setFieldValue }) => {
        return (
          <Form>
            <StyledTitleH3>Изменение данных профиля</StyledTitleH3>
            <StyledListSettings>
              {listSettingsProfile.map((item) => (
                <StyleListItemSettings key={item.value}>
                  <StyledNameComponents sx={{ display: 'block', marginBottom: '10px' }}>
                    {item.title}
                  </StyledNameComponents>
                  {item.type === 'field' ? (
                    <StyledTextFieldModal
                      label={item.label}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[item.value]}
                      error={touched[item.value] && Boolean(errors[item.value])}
                      helperText={touched[item.value] && errors[item.value]}
                      name={item.value}
                    />
                  ) : (
                    <FileInputField
                      item={item}
                      value={values[item.value] as File | null}
                      setFieldValue={setFieldValue}
                      touched={touched[item.value]}
                      error={errors[item.value]}
                      disabled={item.disabled}
                    />
                  )}
                </StyleListItemSettings>
              ))}
            </StyledListSettings>

            <StyledTitleH3>Социальные сети</StyledTitleH3>
            <FieldArray name="socialLinks">
              {(arrayHelpers) => <SocialLinksEditor arrayHelpers={arrayHelpers} />}
            </FieldArray>
            {message && <Box sx={{ color: 'var(--error)', fontSize: '14px', marginTop: '-10px' }}>{message}</Box>}
            <Box
              sx={{
                display: 'flex',
                gap: '40px',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                margin: '40px 0',
              }}
            >
              <StyledFilterButton type="button" onClick={() => resetForm()}>
                Отмена
              </StyledFilterButton>
              <StyledFollowButton type="submit" sx={{ fontWeight: 500, width: '150px', height: '45px', margin: 0 }}>
                Сохранить
              </StyledFollowButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
