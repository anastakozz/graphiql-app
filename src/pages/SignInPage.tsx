import { Email, Password } from '../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, auth, userContext } from '../lib';
import { InputData } from '../lib/interfaces';
import { useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const navigate = useNavigate();
  const { localData } = useContext(userContext);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<InputData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/main');
    } catch (e) {
      if (e instanceof Error && 'code' in e) {
        console.error(e.code);
        alert('Invalid login or password!');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <Email register={register} error={errors.email?.message} setValue={setValue} />
        <Password register={register} error={errors.password?.message} setValue={setValue} />
        <button type="submit" disabled={!isValid || isDirty}>
          {localData && localData.authorization.signIn}
        </button>
      </form>
    </>
  );
}
