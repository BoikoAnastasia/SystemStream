import * as Yup from 'yup';

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Zа-яА-Я0-9_.-]{6,}$/;

    return emailRegex.test(value) || usernameRegex.test(value);
  });
// schemas
export const validationLogin = Yup.object({
  username: usernameOrEmailSchema,
  password: passwordSchema,
});
export const validationRegist = Yup.object({
  username: usernameOrEmailSchema,
  password: passwordSchema,
});
