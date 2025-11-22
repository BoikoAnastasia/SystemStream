import * as Yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^[a-zA-Zа-яА-Я0-9_.-]{6,}$/;

// validate
export const passwordSchema = Yup.string()
  .required('Введите пароль')
  .min(6, 'Минимум 6 символов')
  .matches(/[A-Za-zА-Яа-я]/, 'Пароль должен содержать хотя бы одну букву')
  .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру');

export const notEmptyStringSchema = Yup.string().required('Введите пароль');

export const usernameOrEmailSchema = Yup.string()
  .required('Введите логин или email')
  .test('username-or-email', 'Введите корректный email или логин (минимум 6 символа, без пробелов)', (value) => {
    if (!value) return false;
    return emailRegex.test(value) || usernameRegex.test(value);
  });

export const username = Yup.string().required('Введите логин').min(6, 'минимум 6 символов');

export const email = Yup.string()
  .required('Введите email')
  .test('email', 'Введите корректный email', (value) => {
    if (!value) return false;
    return emailRegex.test(value);
  });

const fileImage = Yup.mixed<File>()
  .nullable()
  .notRequired()
  .test('fileFormat', 'Неверный формат изображения', (value) => {
    if (!value) return true;
    const type = (value as File).type.toLowerCase();
    return type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png' || type === 'image/gif';
  })
  .test('fileSize', 'Файл слишком большой (макс. 5MB)', (value) => {
    if (!value) return true;
    return (value as File).size <= 5000000;
  });

// schemas
export const validationLogin = Yup.object({
  loginOrEmail: usernameOrEmailSchema,
  password: notEmptyStringSchema,
});

export const validationRegist = Yup.object({
  username: username,
  email: email,
  password: passwordSchema,
});

export const validationChangeProfile = Yup.object({
  email: Yup.string()
    .nullable()
    .notRequired()
    .test('email', 'Введите корректный email', (value) => {
      if (!value) return true;
      return emailRegex.test(value);
    }),
  password: Yup.string()
    .nullable()
    .notRequired()
    .test('password', 'Минимум 6 символов, должна быть хотя бы одна буква и цифра', (value) => {
      if (!value) return true;
      return value.length >= 6 && /[A-Za-zА-Яа-я]/.test(value) && /\d/.test(value);
    }),
  profileDescription: Yup.string().max(500, 'Описание не может быть больше 500 символов').nullable().notRequired(),
  profileImage: fileImage,
  backgroundImage: fileImage,
});
