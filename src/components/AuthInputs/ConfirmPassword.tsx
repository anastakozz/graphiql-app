import { InputProps } from '../../lib/commonTypes/interfaces';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { HidePassword } from './HidePassword.tsx';
import { ShowPassword } from './ShowPassword.tsx';

export default function ConfirmPassword({ register, error, setValue }: InputProps) {
  const { localData } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        <div className="flex-container">
          <input
            className="input password"
            {...register('confirmPassword')}
            type={isPasswordVisible ? 'text' : 'password'}
            id="confirmPassword"
            onChange={(e) => setValue('confirmPassword', e.target.value, { shouldValidate: true })}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className={
              isPasswordVisible ? 'password-visibility-btn hide' : 'password-visibility-btn'
            }
          >
            {isPasswordVisible ? <HidePassword /> : <ShowPassword />}
          </button>
        </div>
      </div>
      <div className="error-message" role="error-message">
        {currentError ? '⚠' : ''} {currentError}
      </div>
    </div>
  );
}
