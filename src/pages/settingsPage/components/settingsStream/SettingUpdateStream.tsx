// formik
import { Field, Form, Formik } from 'formik';
// store
import { updateCurrentStream } from '../../../../store/actions/StreamActions';
// mui
import { Box, Chip, Paper, Stack } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
// validation
import { validationChangeCurrentStream } from '../../../../validation/validation';
// style, type
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledListSettings,
  StyledNameComponents,
  StyledSpanDark,
  StyledTextFieldModal,
  StyleListItemSettings,
} from '../../../../components/StylesComponents';
import { AlertType, IChip, ILiveStatusStream, IUpdateStream } from '../../../../types/share';

type StreamField = keyof IUpdateStream;

export const SettingUpdateStream = ({
  dataCurrentStream,
  showAlert,
  chipData,
  setChipData,
  newChip,
  setNewChip,
}: {
  dataCurrentStream: ILiveStatusStream;
  showAlert: (message: string, type?: AlertType) => void;
  chipData: IChip[];
  setChipData: React.Dispatch<React.SetStateAction<IChip[]>>;
  newChip: string;
  setNewChip: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (!dataCurrentStream.streamInfo) return <Box>Стрим еще не начат</Box>;
  const streamInfo = dataCurrentStream.streamInfo;

  const listSettingsStream: { label?: string; type: string; value: StreamField; title: string; disabled?: boolean }[] =
    [
      { type: 'field', label: 'Введите название стрима', value: 'streamName', title: 'Изменить название:' },
      { type: 'field', label: 'Выберите категорию видео', value: 'category', title: 'Добавьте категорию' },
      { type: 'chip', label: 'Добавьте тег', value: 'tags', title: 'Добавьте теги стрима' },
      {
        type: 'file',
        value: 'previewUrl',
        title: 'Загрузить превью стрима:',
      },
    ];

  const initialValues: IUpdateStream = {
    streamName: streamInfo ? streamInfo.streamName : '',
    previewUrl: streamInfo ? streamInfo.previewUrl : null,
    tags: chipData.map((chip) => chip.label),
  };
  // TODO fix clear dubs tags

  const addNewChip = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && newChip.trim() !== '') {
      e.preventDefault();

      const isDuplicate = chipData.some(
        (chip) => chip.label.toLocaleLowerCase() === newChip.trim().toLocaleLowerCase()
      );

      if (isDuplicate) {
        showAlert('Такой тег уже добавлен', 'warning');
        setNewChip('');
        return;
      }

      const newChipObject = { key: Date.now().toString(), label: newChip.trim() };
      setChipData((prev) => [...prev, newChipObject]);
      setNewChip('');
    }
  };

  const handleDelete = (chipToDelete: IChip) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const checkChangeStream = async (values: IUpdateStream, { setFieldError, setSubmitting }: any) => {
    const hasAnyValue =
      !!values.streamName?.trim() || !!values.previewUrl || (values.tags || []).some((tag) => tag?.trim() !== '');

    if (!hasAnyValue) {
      return;
    }
    setSubmitting(true);

    try {
      const valuesToSubmit = {
        streamName: values.streamName,
        category: values.category,
        previewUrl: values.previewUrl,
        tags: chipData.map((chip) => chip.label),
      };
      console.log(valuesToSubmit);
      const changeStreamData = await updateCurrentStream(valuesToSubmit);
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
                  ) : item.type === 'chip' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <StyledSpanDark>Вы можете добавить до 5 тегов, они будут отображаться на стриме.</StyledSpanDark>
                      <StyledTextFieldModal
                        label={item.label}
                        onChange={(e) => setNewChip(e.target.value)}
                        disabled={chipData.length >= 5}
                        onKeyDown={(e) => addNewChip(e)}
                        onBlur={handleBlur}
                        value={newChip}
                      />
                      <Paper sx={{ display: 'flex', background: 'transparent' }} component="ul">
                        {chipData &&
                          chipData.map((data) => {
                            let icon;
                            if (data.label === 'React') {
                              icon = <TagFacesIcon />;
                            }
                            return (
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  icon={icon}
                                  label={data.label}
                                  onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                  variant="outlined"
                                  sx={{
                                    color: 'white',
                                    '& .MuiChip-deleteIcon': { color: 'white', '&:hover': { color: 'grey' } },
                                  }}
                                />
                              </Stack>
                            );
                          })}
                      </Paper>
                    </Box>
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
