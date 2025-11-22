import { useState } from 'react';
import { useDispatch } from 'react-redux';
// formik
import { Formik, Form, Field } from 'formik';
// store
import { AppDispatch } from '../../../../store/store';
import { checkExistEmail } from '../../../../store/actions/UserActions';
import { changeProfileData } from '../../../../store/actions/SettingsActions';
// validation
import { validationChangeProfile } from '../../../../validation/validation';
// mui
import { Box } from '@mui/material';
// styles, share
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

const ListSettingsProfile: { label?: string; type: string; value: ProfileField; title: string; disabled?: boolean }[] =
  [
    {
      type: 'field',
      label: 'Введите почту',
      value: 'email',
      title: 'Изменить почту:',
    },
    {
      type: 'field',
      label: 'Введите пароль',
      value: 'password',
      title: 'Изменить пароль:',
      disabled: true,
    },
    {
      type: 'field',
      label: 'Введите описание',
      value: 'profileDescription',
      title: 'Изменить описание профиля:',
    },
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

const ListSettingsSocial: { label?: string; value: string; disabled?: boolean }[] = [
  {
    label: 'Ссылка на Инстаграмм',
    value: 'instagram',
    disabled: true,
  },
  {
    label: 'Ссылка на Youtube',
    value: 'youtube',
    disabled: true,
  },
  {
    label: 'Ссылка на Вк',
    value: 'vk',
    disabled: true,
  },
];

export const SettingsChangeProfile = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const checkChangeProfile = async (values: IProfileChange, { setFieldError, setSubmitting, resetForm }: any) => {
    setMessage('');
    setSubmitting(true);

    if (values.email) {
      const resultEmail = await checkExistEmail(values.email);
      if (resultEmail === true) {
        setFieldError('email', 'Данная почта уже существует');
        setSubmitting(false);
        return;
      }
    }

    const result = await dispatch(changeProfileData(values));
    setMessage(result?.message || '');
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', profileDescription: '', profileImage: null, backgroundImage: null }}
      validationSchema={validationChangeProfile}
      onSubmit={checkChangeProfile}
      enableReinitialize={false}
    >
      {({ values, handleChange, handleBlur, touched, errors, resetForm }) => (
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
                    disabled={item.disabled || false}
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
            {ListSettingsSocial.map((social) => (
              <StyleListItemSettings key={social.value}>
                <StyledNameComponents sx={{ display: 'block', marginBottom: '10px' }}>
                  {social.label}
                </StyledNameComponents>
                <StyledTextFieldModal disabled onChange={handleChange} onBlur={handleBlur} />
              </StyleListItemSettings>
            ))}
            {message && <Box sx={{ fontSize: '22px' }}>{message}</Box>}
          </StyledListSettings>
          <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'flex-end', marginBottom: '40px' }}>
            <StyledFilterButton type="button" onClick={() => resetForm()}>
              Отмена
            </StyledFilterButton>
            <StyledFollowButton
              type="submit"
              sx={{ fontWeight: 500, width: '150px', padding: 0, height: '45px', margin: 0 }}
            >
              Сохранить
            </StyledFollowButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
