import { InputProps } from '../../lib/interfaces';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';

export default function ConfirmPassword({ register, error, setValue }: InputProps) {
  const { localData } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    if (localData && Object.entries(localData).length > 0) {
      setLabelName(localData?.authorization.inputsTitle.confirmPassword);
      if (error) {
        setCurrentError(localData?.authorization.errors.confirmPassword[error]);
      } else setCurrentError('');
    }
  }, [localData, error]);

  return (
    <div>
      <div>{currentError}</div>
      <label htmlFor="confirmPassword">{labelName}</label>
      <input
        {...register('confirmPassword')}
        type="password"
        id="confirmPassword"
        onChange={(e) => setValue('confirmPassword', e.target.value, { shouldValidate: true })}
      />
    </div>
  );
}
