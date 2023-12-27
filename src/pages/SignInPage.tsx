import { Button, Email, ErrorPopUp, Password } from '../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, auth, userContext } from '../lib';
import { InputData } from '../lib/commonTypes/interfaces';
import { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const dictionary = useContext(userContext).localData?.signInPage;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleError = () => setError('');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<InputData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<InputData> = async (submitData) => {
    try {
      await signInWithEmailAndPassword(auth, submitData.email, submitData.password);
      navigate('/main');
    } catch (e) {
      if (e instanceof Error && 'code' in e && e.code === 'auth/invalid-credential') {
        dictionary && setError(dictionary.error);
      }
    }
  };

  return (
    dictionary && (
      <div className="container main-inner" role="sign-in-page">
        <h1 className="main-title title-spacer text-center">{dictionary.signInTitle}</h1>
        <div className="sign-container">
          <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <Email register={register} error={errors.email?.message} setValue={setValue} />
            <Password register={register} error={errors.password?.message} setValue={setValue} />
            <Button type="submit" disabled={!isValid || isDirty} className="button-top-spacer">
              {dictionary.signInTitle}
            </Button>
          </form>
        </div>
        <Link to="/sign-up" className="account-link">
          <p>{dictionary.account}</p>
        </Link>
        {error.length !== 0 && <ErrorPopUp onClick={handleError} error={error} />}
      </div>
    )
  );
}
