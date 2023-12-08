import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup
    .string()
    .required()
    .email('email is not valid')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'email is not valid'
    ),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[а-яa-z])/,
      'password must contains at least one lowercase letter'
    )
    .matches(
      /(?=.*[А-ЯA-Z])/,
      'password must contains at least one uppercase letter'
    )
    .matches(/(?=.*\d)/, 'password must contains at least one number')
    .matches(
      /(?=.*[@$!();-=№#"%*?&])/,
      'password must contains at least one special character'
    ),
})

const confirmPasswordSchema = yup.object({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'passwords must match')
    .required('confirm password is required'),
})

export const combinedSchema = validationSchema.concat(confirmPasswordSchema);
