import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup
    .string()
    .required('required')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'notValid'),
  password: yup
    .string()
    .required('required')
    .matches(/^(?=.*[а-яa-z])/, 'mustHaveLowerCase')
    .matches(/(?=.*[А-ЯA-Z])/, 'mustHaveUpperCase')
    .matches(/(?=.*\d)/, 'mustHaveNumber')
    .matches(/(?=.*[@$!();-=№#"%*?&])/, 'mustHaveSpecial')
    .matches(/^.{6,}$/, 'mustHave6Characters'),
});

const confirmPasswordSchema = yup.object({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'mustMatch')
    .required('required'),
});

export const combinedSchema = validationSchema.concat(confirmPasswordSchema);
