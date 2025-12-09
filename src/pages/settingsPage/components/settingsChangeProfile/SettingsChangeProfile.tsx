import { useState } from 'react';
import { useDispatch } from 'react-redux';
// store
import { AppDispatch } from '../../../../store/store';
import { checkExistEmail, checkExistNickname } from '../../../../store/actions/UserActions';
import {
  changeProfileData,
  settingBackgroundImage,
  settingProfileImage,
} from '../../../../store/actions/SettingsActions';
// coomponents
import { SocialLinksEditor } from '../socialLinksEditor/SocialLinksEditor';
// formik
import { Formik, Form, Field, FieldArray } from 'formik';
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

      // фильтруем пустые соцсети
      const profileData = {
        ...values,
        socialLinks: (values.socialLinks || []).filter((link) => link.url && link.url.trim() !== ''),
      };
      delete profileData.backgroundImage;
      delete profileData.profileImage;

      const changeProfileResult = await dispatch(changeProfileData(profileData));
      if (!changeProfileResult.success) {
        throw new Error(changeProfileResult.message);
      }

      if (values.profileImage) {
        dispatch(settingProfileImage(values.profileImage));
      }

      if (values.backgroundImage) {
        dispatch(settingBackgroundImage(values.backgroundImage));
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
                    <Field name={item.value}>
                      {({ form }: any) => (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              form.setFieldValue(item.value, event.currentTarget.files?.[0] || null);
                            }}
                            disabled={item.disabled || false}
                          />
                          {form.touched[item.value] && form.errors[item.value] && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{form.errors[item.value]}</div>
                          )}
                        </>
                      )}
                    </Field>
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
