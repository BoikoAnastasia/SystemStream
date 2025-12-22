// components
import { ComboBox } from '../../../../components/ui/comboBox/ComboBox';
import { FileInputField } from '../../../../components/ui/fileInputField/FileInputField';
// formik
import { Form, Formik } from 'formik';
// store
import { updateCurrentStream } from '../../../../store/actions/SettingsActions';
// mui
import { Box, Chip, Paper, Stack } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
// validation
import { validationChangeCurrentStream } from '../../../../validation/validation';
// styles, type
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledListSettings,
  StyledNameComponents,
  StyledSpanDark,
  StyledTextFieldModal,
  StyleListItemSettings,
} from '../../../../components/StylesComponents';
import { AlertType, ICategories, IChip, ILiveStatusStream, IUpdateStream } from '../../../../types/share';
import { useId, useMemo, useState } from 'react';

type StreamField = keyof IUpdateStream;

export const SettingUpdateStream = ({
  dataCurrentStream,
  showAlert,
  chipData,
  setChipData,
  newChip,
  setNewChip,
  categoryData,
}: {
  dataCurrentStream: ILiveStatusStream | null;
  showAlert: (message: string, type?: AlertType) => void;
  chipData: IChip[];
  setChipData: React.Dispatch<React.SetStateAction<IChip[]>>;
  newChip: string;
  setNewChip: React.Dispatch<React.SetStateAction<string>>;
  categoryData: ICategories[];
}) => {
  const streamInfo = dataCurrentStream?.streamInfo || null;
  const id = useId();
  const [newTag, setNewTag] = useState('');

  const listSettingsStream: { label?: string; type: string; value: StreamField; title: string; disabled?: boolean }[] =
    [
      { type: 'field', label: 'Введите название стрима', value: 'streamName', title: 'Изменить название:' },
      { type: 'combobox', label: 'Выберите категорию видео', value: 'category', title: 'Добавьте категорию' },
      { type: 'chip', label: 'Добавьте тег', value: 'tags', title: 'Добавьте теги стрима' },
      {
        type: 'file',
        value: 'previewUrl',
        title: 'Загрузить превью стрима:',
      },
    ];

  const initialValues: IUpdateStream = useMemo(
    () => ({
      streamName: streamInfo?.streamName ?? '',
      category: streamInfo?.categoryId ?? null,
      previewUrl: null,
      tags: streamInfo?.tags ?? [],
    }),
    [streamInfo]
  );

  // TODO fix clear dubs tags

  const addNewChip = (e: React.KeyboardEvent, values: IUpdateStream, setFieldValue: any) => {
    if (e.key === 'Enter' && newChip.trim()) {
      e.preventDefault();

      const tags = values.tags ?? [];
      if (tags.includes(newChip.trim())) {
        showAlert('Такой тег уже добавлен', 'warning');
        return;
      }

      setFieldValue('tags', [...tags, newChip.trim()]);
      setNewChip('');
    }
  };
  const handleDelete = (chipToDelete: IChip) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.label.trim().toLocaleLowerCase() !== chipToDelete.label.trim().toLocaleLowerCase())
    );
  };

  const checkChangeStream = async (values: IUpdateStream, { setFieldError, setSubmitting }: any) => {
    const hasAnyValue =
      !!values.streamName?.trim() || !!values.previewUrl || (values.tags || []).some((tag) => tag?.trim() !== '');

    if (!hasAnyValue) {
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    try {
      if (values.streamName) formData.append('StreamName', values.streamName);
      if (values.category) formData.append('СategoryId', values.category.toString());
      if (values.previewUrl) formData.append('PreviewImage', values.previewUrl);
      if (values.tags.length > 0) formData.append('Tags', JSON.stringify(values.tags));

      console.log('formData - settings', formData);

      const changeStreamData = await updateCurrentStream(formData);
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
                  ) : item.type === 'combobox' ? (
                    <ComboBox
                      key={values.category}
                      options={categoryData}
                      value={values.category}
                      name="category"
                      setFieldValue={setFieldValue}
                    />
                  ) : item.type === 'chip' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                      <StyledSpanDark>Вы можете добавить до 5 тегов, они будут отображаться на стриме.</StyledSpanDark>
                      <StyledTextFieldModal
                        label={item.label}
                        disabled={chipData.length >= 5}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newTag.trim()) {
                            e.preventDefault();
                            if (values.tags.includes(newTag.trim())) {
                              showAlert('Такой тег уже добавлен', 'warning');
                              return;
                            }
                            setFieldValue('tags', [...values.tags, newTag.trim()]);
                            setNewTag('');
                          }
                        }}
                        onBlur={handleBlur}
                        value={newTag}
                      />
                      <Paper sx={{ display: 'flex', gap: '5px', background: 'transparent' }} component="ul">
                        {values.tags.map((tag: string) => (
                          <Stack key={tag} direction="row" spacing={1}>
                            <Chip
                              icon={tag === 'React' ? <TagFacesIcon /> : undefined}
                              label={tag}
                              onDelete={() =>
                                setFieldValue(
                                  'tags',
                                  values.tags.filter((t: string) => t !== tag)
                                )
                              }
                              variant="outlined"
                              sx={{
                                color: 'white',
                                '& .MuiChip-deleteIcon': { color: 'white', '&:hover': { color: 'grey' } },
                              }}
                            />
                          </Stack>
                        ))}
                      </Paper>
                    </Box>
                  ) : (
                    <FileInputField
                      item={item}
                      value={values[item.value] as File | null}
                      setFieldValue={setFieldValue}
                      touched={touched[item.value]}
                      error={errors[item.value] as string}
                      disabled={item.disabled}
                    />
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
