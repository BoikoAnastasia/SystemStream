// formik
import { Field, Form, Formik } from 'formik';
// store
import { updateCurrentStream } from '../../../../store/actions/StreamActions';
// mui
import { Box } from '@mui/material';
// validation
import { validationChangeCurrentStream } from '../../../../validation/validation';
// style, type
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledListSettings,
  StyledNameComponents,
  StyledTextFieldModal,
  StyledTitleH3,
  StyleListItemSettings,
} from '../../../../components/StylesComponents';
import { AlertType, ILiveStatusStream, IUpdateStream } from '../../../../types/share';

// todo Tags = chip
export const SettingUpdateStream = ({
  dataCurrentStream,
  showAlert,
}: {
  dataCurrentStream: ILiveStatusStream;
  showAlert: (message: string, type?: AlertType) => void;
}) => {
  if (!dataCurrentStream.streamInfo) return <Box>Стрим еще не начат</Box>;
  const streamInfo = dataCurrentStream.streamInfo;

  type ProfileField = keyof IUpdateStream;

  const listSettingsStream: { label?: string; type: string; value: ProfileField; title: string; disabled?: boolean }[] =
    [
      { type: 'field', label: 'Введите название стрима', value: 'streamName', title: 'Изменить название:' },
      {
        type: 'file',
        value: 'previewUrl',
        title: 'Загрузить превью стрима:',
      },
      { type: 'field', label: 'Добавьте тег', value: 'tags', title: 'Добавьте теги стрима' },
    ];

  const initialValues: IUpdateStream = {
    streamName: streamInfo ? streamInfo.streamName : '',
    previewUrl: streamInfo ? streamInfo.previewUrl : '',
    tags: streamInfo ? streamInfo.tags : [],
  };

  const checkChangeStream = async (values: IUpdateStream, { setFieldError, setSubmitting }: any) => {
    const hasAnyValue =
      !!values.streamName?.trim() || !!values.previewUrl || (values.tags || []).some((tag) => tag?.trim() !== '');

    if (!hasAnyValue) {
      return;
    }
    setSubmitting(true);

    try {
      const changeStreamData = await updateCurrentStream(values);
      if (!changeStreamData?.success) {
        throw new Error(changeStreamData?.message);
      }
      showAlert('Профиль обновлен.', 'success');
    } catch (error) {
      showAlert('Произошла ошибка.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationChangeCurrentStream}
      onSubmit={checkChangeStream}
      enableReinitialize={true}
    >
      {({ values, handleChange, handleBlur, touched, errors, resetForm, setFieldValue }) => {
        return (
          <Form>
            <StyledTitleH3>Изменение данных профиля</StyledTitleH3>
            <StyledListSettings>
              {listSettingsStream.map((item) => (
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
            {/* {message && <Box sx={{ color: 'var(--error)', fontSize: '14px', marginTop: '-10px' }}>{message}</Box>} */}
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
