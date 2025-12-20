import { useState } from 'react';
// formik
import * as Yup from 'yup';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
// styles
import {
  StyledFilterButton,
  StyledFollowButton,
  StyledNameComponents,
  StyledSpanDark,
  StyledTextFieldModal,
} from '../../../../components/StylesComponents';
// mui
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
// types
import { ISocialLink } from '../../../../types/share';

interface SocialLinksEditorProps {
  arrayHelpers: FieldArrayRenderProps;
}

export const SocialLinksEditor = ({ arrayHelpers }: SocialLinksEditorProps) => {
  const { values } = useFormikContext<any>();
  const { push, remove, replace } = arrayHelpers;
  const socialLinks = values.socialLinks || [];

  const [platformName, setPlatformName] = useState('');
  const [platformUrl, setPlatformUrl] = useState('');

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingUrl, setEditingUrl] = useState('');

  const [urlError, setUrlError] = useState<string | null>(null);
  const [editingUrlError, setEditingUrlError] = useState<string | null>(null);

  // Валидация при вводе нового URL
  const handleUrlChange = async (value: string) => {
    setPlatformUrl(value);
    try {
      await Yup.string().url('Некорректная ссылка').validate(value);
      setUrlError(null);
    } catch (err: any) {
      setUrlError(err.message);
    }
  };

  // Валидация при редактировании URL
  const handleEditingUrlChange = async (value: string) => {
    setEditingUrl(value);
    try {
      await Yup.string().url('Некорректная ссылка').validate(value);
      setEditingUrlError(null);
    } catch (err: any) {
      setEditingUrlError(err.message);
    }
  };

  // Добавление новой ссылки
  const pushNewSocials = async () => {
    const trimmedName = platformName.trim();
    const trimmedUrl = platformUrl.trim();
    if (!trimmedName || !trimmedUrl || urlError || socialLinks.length >= 5) return;

    try {
      await Yup.string().url('Некорректная ссылка').validate(trimmedUrl);
      push({ platform: trimmedName, url: trimmedUrl });

      // Чистим поля после добавления
      setPlatformName('');
      setPlatformUrl('');
      setUrlError(null);
    } catch (err: any) {
      setUrlError(err.message);
      alert(err.message);
    }
  };

  return (
    <Box>
      <StyledNameComponents sx={{ display: 'block', marginBottom: '10px' }}>Ссылки на соцсети</StyledNameComponents>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
        {/* Добавление новой ссылки */}
        <StyledSpanDark>Вы можете добавить до 5 соцсетей, они будут отображаться в вашем профиле.</StyledSpanDark>
        <StyledTextFieldModal
          label="Название ссылки (текст ссылки)"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
        />
        <StyledTextFieldModal
          label="URL ссылки (куда ведет эта ссылка? Введите полный url, например https://stream.com)"
          value={platformUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          helperText={urlError}
          error={!!urlError}
        />
        <StyledFollowButton
          sx={{ alignSelf: 'flex-end' }}
          disabled={!platformName.trim() || !platformUrl.trim() || !!urlError || socialLinks.length >= 5}
          onClick={pushNewSocials}
        >
          Добавить
        </StyledFollowButton>
      </Box>
      {/* Список соцсетей */}
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {socialLinks.length > 0 && <StyledSpanDark>Ваши добавленные ссылки:</StyledSpanDark>}
        {socialLinks.map((link: ISocialLink, i: number) => {
          // Редактирование
          if (editingIndex === i) {
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                }}
              >
                <StyledTextFieldModal
                  label="Название ссылки"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <StyledTextFieldModal
                  label="URL ссылки"
                  value={editingUrl}
                  onChange={(e) => handleEditingUrlChange(e.target.value)}
                  helperText={editingUrlError}
                  error={!!editingUrlError}
                />
                {editingUrlError && <Box style={{ color: 'red' }}>{editingUrlError}</Box>}
                <Box sx={{ display: 'flex', gap: 1, alignSelf: 'flex-end' }}>
                  <StyledFilterButton onClick={() => setEditingIndex(null)}>Отмена</StyledFilterButton>
                  <StyledFollowButton
                    sx={{ margin: 0 }}
                    disabled={!!editingUrlError}
                    onClick={() => {
                      replace(i, { platform: editingName.trim(), url: editingUrl.trim() });
                      setEditingIndex(null);
                    }}
                  >
                    Изменить
                  </StyledFollowButton>
                </Box>
              </Box>
            );
          }

          // Обычный вывод
          return (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '10px',
              }}
            >
              <Box>
                <strong>{link.platform}</strong>: {link.url}
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setEditingIndex(i);
                    setEditingName(link.platform);
                    setEditingUrl(link.url);
                  }}
                >
                  <CreateIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={() => remove(i)}>
                  <DeleteIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
