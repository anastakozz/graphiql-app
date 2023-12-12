import { Button, Email, Password } from '../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, auth, userContext } from '../lib';
import { InputData, pageData } from '../lib/commonTypes/interfaces';
import { useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);

  useEffect(() => {
    if (localData) {
      const data = localData['signInPage'];
      setData(data);
    }
  }, [localData]);

  const navigate = useNavigate();

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
      if (e instanceof Error && 'code' in e && e.code === 'auth/invalid-credential') {
        alert('Invalid login or password!');
      }
      console.error(e);
    }
  };

  return (
    data && (
      <div className="container main-inner">
        <h1 className="main-title title-spacer text-center">{data.signInTitle}</h1>
        <div className="sign-container">
          <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <Email register={register} error={errors.email?.message} setValue={setValue} />
            <Password register={register} error={errors.password?.message} setValue={setValue} />
            <Button type="submit" disabled={!isValid || isDirty} className="button-top-spacer ">
              {localData && localData.authorization.signIn}
            </Button>
          </form>
        </div>
        <Link to="/sign-up" className="link-to-registration">
          <p>Don&apos;t have account yet?</p>
        </Link>
      </div>
    )
  );
}
