import { InputProps } from '../../lib/commonTypes/interfaces';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { HidePassword } from './HidePassword.tsx';
import { ShowPassword } from './ShowPassword.tsx';

export default function Password({ register, error, setValue }: InputProps) {
  const { localData } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (localData && Object.entries(localData).length > 0) {
      setLabelName(localData?.authorization.inputsTitle.password);
      error ? setCurrentError(localData.authorization.errors.password[error]) : setCurrentError('');
    }
  }, [localData, error]);

  return (
    <div className="input-field">
      <div className="input-row">
        <label htmlFor="password" className="label">
          {labelName}
        </label>
        <div className="flex-container">
          <input
            className="input password"
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
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
