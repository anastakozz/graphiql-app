import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { InputData, pageData } from '../lib/commonTypes/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Email, Password } from '../components';
import ConfirmPassword from '../components/AuthInputs/ConfirmPassword';
import { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, userContext, combinedSchema } from '../lib';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);

  useEffect(() => {
    if (localData) {
      const data = localData['signUpPage'];
      setData(data);
    }
  }, [localData]);
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

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/main');
    } catch (e) {
      if (e instanceof Error && 'code' in e && e.code === 'auth/email-already-in-use') {
        alert('email already in use!');
      }
      console.error(e);
    }
  };

  return (
    data && (
      <div className="container main-inner">
        <h1 className="main-title title-spacer text-center">{data.signUpTitle}</h1>
        <div className="sign-container">
          <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <Email register={register} error={errors.email?.message} setValue={setValue} />
            <Password register={register} error={errors.password?.message} setValue={setValue} />
            <ConfirmPassword
              register={register}
              error={errors.confirmPassword?.message}
              setValue={setValue}
            />
            <Button type="submit" disabled={!isValid || isDirty} className="button-top-spacer">
              {localData && localData.authorization.signUp}
            </Button>
          </form>
        </div>
      </div>
    )
  );
}
