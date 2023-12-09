import { Email, Password } from '../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../lib/validationSchema.ts';
import { InputData } from '../lib/interfaces.ts';

export default function SignInPage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<InputData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<InputData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>Sign in form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <Email register={register} error={errors.email?.message} setValue={setValue} />
        <Password register={register} error={errors.password?.message} setValue={setValue} />
        <button type="submit" disabled={!isValid || isDirty}>
          Sign in
        </button>
      </form>
    </>
  );
}
