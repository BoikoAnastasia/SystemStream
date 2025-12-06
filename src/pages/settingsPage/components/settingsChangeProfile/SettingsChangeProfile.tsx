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
// formik
import { Formik, Form, FieldArray, Field } from 'formik';
// validation
import { validationChangeProfile } from '../../../../validation/validation';
// mui, style, types
import { Box, MenuItem } from '@mui/material';
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledListSettings,
  StyledNameComponents,
  StyledScheduleFormControl,
  StyledScheduleInputLabel,
  StyledScheduleSelect,
  StyledTextFieldModal,
  StyledTitleH3,
  StyleListItemSettings,
} from '../../../../components/StylesComponents';
import { IProfileChange, ISocialLink } from '../../../../types/share';
type ProfileField = keyof IProfileChange;

const ListSettingsProfile: { label?: string; type: string; value: ProfileField; title: string; disabled?: boolean }[] =
  [
    { type: 'field', label: 'Введите почту', value: 'email', title: 'Изменить почту:' },
    { type: 'field', label: 'Введите ник', value: 'nickname', title: 'Изменить ник:' },
    { type: 'field', label: 'Введите текущий пароль', value: 'currentPassword', title: 'Текущий пароль:' },
    { type: 'field', label: 'Введите новый пароль', value: 'newPassword', title: 'Изменить пароль:' },
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

const ListSettingsSocial: { label?: string; value: string }[] = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter', value: 'twitter' },
];

const initialValues: IProfileChange = {
  nickname: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  profileDescription: '',
  profileImage: null,
  backgroundImage: null,
  socialLinks: [],
};

export const SettingsChangeProfile = () => {
  const [message, setMessage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const checkChangeProfile = async (values: IProfileChange, { setFieldError, setSubmitting }: any) => {
    setMessage('');
    setSubmitting(true);

    try {
      // проверка никнейма
      if (values.nickname) {
        const nicknameResult = await checkExistNickname(values.nickname);
        if (!nicknameResult.success) throw new Error(nicknameResult.message);
        if (nicknameResult.data?.exists) {
          setFieldError('username', 'Данный ник уже используется');
        }
      }

      // проверка email
      if (values.email) {
        const emailResult = await checkExistEmail(values.email);
        if (!emailResult.success) throw new Error(emailResult.message);
        if (emailResult.data?.exists) {
          setFieldError('email', 'Данная почта уже существует');
        }
      }

      // фильтруем пустые соцсети
      const profileData = {
        ...values,
        socialLinks: (values.socialLinks || []).filter((link) => link.url && link.url.trim() !== ''),
      };
      delete profileData.backgroundImage;
      delete profileData.profileImage;

      const result = await dispatch(changeProfileData(profileData));
      setMessage(result?.message || '');
      if (values.profileImage) {
        console.log(values.profileImage);
        dispatch(settingProfileImage(values.profileImage));
      }
      if (values.backgroundImage) {
        dispatch(settingBackgroundImage(values.backgroundImage));
      }
    } catch (error: any) {
      setMessage(error.message || 'Произошла ошибка');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationChangeProfile}
      onSubmit={checkChangeProfile}
      enableReinitialize={false}
    >
      {({ values, handleChange, handleBlur, touched, errors, resetForm, setFieldValue }) => {
        const socialLinks = values.socialLinks || [];

        return (
          <Form>
            <StyledTitleH3>Изменение данных профиля</StyledTitleH3>
            <StyledListSettings>
              {ListSettingsProfile.map((item) => (
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
            <StyledListSettings>
              <FieldArray name="socialLinks">
                {({ push, remove }) => {
                  const freePlatforms = ListSettingsSocial.filter(
                    (p) => !socialLinks.some((s) => s.platform === p.value)
                  );

                  return (
                    <Box>
                      <StyledNameComponents sx={{ display: 'block', marginBottom: '10px' }}>
                        Добавить соцсеть
                      </StyledNameComponents>
                      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <StyledScheduleFormControl sx={{ width: '100%' }}>
                          <StyledScheduleInputLabel id="demo-simple-select-label">
                            Выберите социальную сеть
                          </StyledScheduleInputLabel>
                          <StyledScheduleSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPlatform}
                            onChange={(e) => {
                              const platform = e.target.value;
                              if (!platform) return;
                              push({ platform, url: '' });
                              setSelectedPlatform('');
                            }}
                          >
                            {freePlatforms.map((p) => (
                              <MenuItem key={p.value} value={p.value}>
                                {p.label}
                              </MenuItem>
                            ))}
                          </StyledScheduleSelect>
                        </StyledScheduleFormControl>
                      </Box>

                      <Box sx={{ marginTop: '25px' }}>
                        {socialLinks.map((item: ISocialLink, i: number) => {
                          const platformInfo = ListSettingsSocial.find((p) => p.value === item.platform);
                          const fieldName = `socialLinks[${i}].url`;

                          return (
                            <Box
                              key={i}
                              sx={{
                                marginBottom: '20px',
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                              }}
                            >
                              <StyledNameComponents sx={{ marginBottom: '10px' }}>
                                {platformInfo?.label}
                              </StyledNameComponents>

                              <StyledTextFieldModal
                                name={fieldName}
                                type="url"
                                value={item.url}
                                onChange={(e) => setFieldValue(fieldName, e.target.value)}
                                onBlur={(e) => handleBlur({ ...e, target: { ...e.target, name: fieldName } } as any)}
                                error={Boolean(
                                  (errors as any)?.socialLinks?.[i]?.url && (touched as any)?.socialLinks?.[i]?.url
                                )}
                                helperText={
                                  (errors as any)?.socialLinks?.[i]?.url && (touched as any)?.socialLinks?.[i]?.url
                                    ? (errors as any).socialLinks[i].url
                                    : ''
                                }
                                fullWidth
                              />

                              <StyledFilterButton
                                variant="outlined"
                                color="error"
                                onClick={() => remove(i)}
                                sx={{ marginTop: '10px' }}
                              >
                                Удалить
                              </StyledFilterButton>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                }}
              </FieldArray>

              {message && <Box sx={{ fontSize: '22px', mt: 2 }}>{message}</Box>}
            </StyledListSettings>

            <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'flex-end', marginBottom: '40px' }}>
              <StyledFilterButton type="button" onClick={() => resetForm()}>
                Отмена
              </StyledFilterButton>
              <StyledFollowButton type="submit" sx={{ fontWeight: 500, width: '150px', height: '45px' }}>
                Сохранить
              </StyledFollowButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
