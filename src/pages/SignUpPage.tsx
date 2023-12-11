import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { InputData } from '../lib/interfaces.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Password } from '../components';
import ConfirmPassword from '../components/AuthInputs/ConfirmPassword';
import { useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, userContext, combinedSchema } from '../lib';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
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

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/main');
    } catch (e) {
      console.error(e);
    }
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
