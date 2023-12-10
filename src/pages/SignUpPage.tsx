import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { InputData } from '../lib/interfaces.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { combinedSchema } from '../lib/validationSchema';
import { Email, Password } from '../components';
import ConfirmPassword from '../components/AuthInputs/ConfirmPassword';
import { useContext } from 'react';
import userContext from '../lib/context';

export default function SignUpPage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(combinedSchema) as Resolver<InputData> | undefined,
  });
  const { localData } = useContext(userContext);

  const onSubmit: SubmitHandler<InputData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <Email register={register} error={errors.email?.message} setValue={setValue} />
        <Password register={register} error={errors.password?.message} setValue={setValue} />
        <ConfirmPassword
          register={register}
          error={errors.confirmPassword?.message}
          setValue={setValue}
        />
        <button type="submit" disabled={!isValid || isDirty}>
          {localData && localData.authorization.signUp}
        </button>
      </form>
    </>
  );
}
