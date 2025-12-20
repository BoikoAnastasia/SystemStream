import { useState, useEffect } from 'react';
// context
import { useHeaderModal } from '../../../context/HeaderModalContext';
// mui
import { Box } from '@mui/material';
// styles
import { StyleUploadButton, StyleUploadDrag } from '../../StylesComponents';

interface IFileInputFieldProps {
  item: any;
  value: File | null;
  setFieldValue: (field: string, value: any) => void;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const FileInputField = ({ item, value, setFieldValue, disabled, error, touched }: IFileInputFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { showAlert } = useHeaderModal();

  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    handleChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0] || null;
    handleChange(file);
  };

  const handleChange = (file: File | null) => {
    if (file) {
      // проверка размера
      if (file.size > MAX_SIZE) {
        showAlert('Файл слишком большой (макс. 5MB)', 'error');
        return;
      }

      // проверка типа
      if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
        showAlert('Неверный формат изображения', 'error');
        return;
      }
    }

    setFieldValue(item.value, file);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' }}>
      <StyleUploadDrag
        dragActive={dragActive}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Перетащите файл сюда или
        <StyleUploadButton>
          Загрузить файл
          <input type="file" hidden accept="image/*" onChange={handleFile} disabled={disabled} />
        </StyleUploadButton>
        {touched && error && <Box sx={{ color: 'red', fontSize: '12px' }}>{error}</Box>}
      </StyleUploadDrag>
      {preview && (
        <Box
          component="img"
          src={preview}
          alt="preview"
          sx={{ width: '100%', maxHeight: '330px', objectFit: 'cover', mt: 1 }}
        />
      )}
    </Box>
  );
};
