import { InputProps } from '../../lib/interfaces';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';

export default function Email({ register, error, setValue }: InputProps) {
  const { localData } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    if (localData && Object.entries(localData).length > 0) {
      setLabelName(localData.authorization.inputsTitle.email);
      error ? setCurrentError(localData.authorization.errors.email[error]) : setCurrentError('');
    }
  }, [localData, error]);

  return (
    <div>
      <div>{currentError}</div>
      <label htmlFor="email">{labelName}</label>
      <input
        {...register('email')}
        type="email"
        id="email"
        onChange={(e) => setValue('email', e.target.value, { shouldValidate: true })}
      />
    </div>
  );
}