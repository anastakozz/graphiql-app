import { InputProps } from '../../lib/interfaces.ts';
import { useContext, useEffect, useState } from "react";
import userContext from "../../lib/context.ts";
import { setErrors, setInputLabel } from "../../lib/utils.ts";

export default function ConfirmPassword({ register, error, setValue }: InputProps) {
  const { language } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    setInputLabel({setLabelName, component: 'confirmPassword', language});
    setErrors({language, error, setCurrentError, fieldType: 'confirmPassword'});
  }, [language, error]);

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
