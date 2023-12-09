import { InputProps } from '../../lib/interfaces';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';

export default function Password({ register, error, setValue }: InputProps) {
  const { localData } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    if (localData && Object.entries(localData).length > 0) {
      setLabelName(localData?.authorization.inputsTitle.password);
      if (error) {
        setCurrentError(localData?.authorization.errors.password[error]);
      } else setCurrentError('');
    }
  }, [localData, error]);

  return (
    <div>
      <div>{currentError}</div>
      <label htmlFor="password">{labelName}</label>
      <input
        {...register('password')}
        type="password"
        id="password"
        onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
      />
    </div>
  );
}
