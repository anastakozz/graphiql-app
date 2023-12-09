import { InputProps } from '../../lib/interfaces.ts';
import { useContext, useEffect, useState } from "react";
import userContext from "../../lib/context.ts";
import { setErrors, setInputLabel } from "../../lib/utils.ts";

export default function Password({ register, error, setValue }: InputProps) {
  const { language } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    setInputLabel({setLabelName, component: 'password', language});
    setErrors({language, error, setCurrentError, fieldType: 'password'});
  }, [language, error]);

  return (
    <div>
      <div>{currentError}</div>
      <label htmlFor="password">{labelName}</label>
      <input {...register('password')} type="password" id="password" onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })} />
    </div>
  );
}
