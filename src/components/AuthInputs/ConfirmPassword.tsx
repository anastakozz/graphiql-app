import { InputProps } from '../../lib/commonTypes/interfaces';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';

export default function ConfirmPassword({ register, error, setValue }: InputProps) {
  const { localData } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    if (localData && Object.entries(localData).length > 0) {
      setLabelName(localData?.authorization.inputsTitle.confirmPassword);
      error
        ? setCurrentError(localData.authorization.errors.confirmPassword[error])
        : setCurrentError('');
    }
  }, [localData, error]);

  return (
    <div className="input-field">
      <div className="input-row">
        <label htmlFor="confirmPassword" className="label">
          {labelName}
        </label>
        <input
          className="input"
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          onChange={(e) => setValue('confirmPassword', e.target.value, { shouldValidate: true })}
        />
      </div>
      <div className="error-message" role="error-message">
        {currentError ? '⚠' : ''} {currentError}
      </div>
    </div>
  );
}
