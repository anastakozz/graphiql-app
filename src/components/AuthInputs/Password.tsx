import { InputProps } from '../../lib/commonTypes/interfaces';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';

export default function Password({ register, error, setValue }: InputProps) {
  const { localData } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    if (localData && Object.entries(localData).length > 0) {
      setLabelName(localData?.authorization.inputsTitle.password);
      error ? setCurrentError(localData.authorization.errors.password[error]) : setCurrentError('');
    }
  }, [localData, error]);

  return (
    <div className="input-field">
      <div className="error-message">
        {currentError ? '⚠' : ''} {currentError}
      </div>
      <div className="input-row">
        <label htmlFor="password" className="label">
          {labelName}
        </label>
        <input
          className="input"
          {...register('password')}
          type="password"
          id="password"
          onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
        />
      </div>
    </div>
  );
}
