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

// schemas
export const validationLogin = Yup.object({
  username: usernameOrEmailSchema,
  password: passwordSchema,
});

export const validationRegist = Yup.object({
  username: username,
  email: email,
  password: passwordSchema,
});
