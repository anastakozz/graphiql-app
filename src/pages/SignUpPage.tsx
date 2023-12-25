import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { InputData } from '../lib/commonTypes/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Email, ErrorPopUp, Password } from '../components';
import ConfirmPassword from '../components/AuthInputs/ConfirmPassword';
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, userContext, combinedSchema } from '../lib';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const dictionary = useContext(userContext).localData?.signUpPage;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleError = () => setError('');

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
        dictionary && setError(dictionary.error);
      }
    }
  };

  return (
    dictionary && (
      <div className="container main-inner">
        <h1 className="main-title title-spacer text-center">{dictionary.signUpTitle}</h1>
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
              {dictionary.signUpTitle}
            </Button>
          </form>
        </div>
        <Link to="/sign-in" className="account-link">
          <p>{dictionary.account}</p>
        </Link>
        {error.length !== 0 && <ErrorPopUp onClick={handleError} error={error} />}
      </div>
    )
  );
}
