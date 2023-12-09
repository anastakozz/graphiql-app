import { InputProps } from '../../lib/interfaces.ts';
import { useContext, useEffect, useState } from "react";
import userContext from "../../lib/context.ts";
import { setErrors, setInputLabel } from "../../lib/utils.ts";

export default function Email({ register, error, setValue }: InputProps) {
  const { language } = useContext(userContext);
  const [labelName, setLabelName] = useState('');
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    setInputLabel({setLabelName, component: 'email', language});
    setErrors({language, error, setCurrentError, fieldType: 'email'});
  }, [language, error]);

  return (
    <div>
      <div>{currentError}</div>
      <label htmlFor="email">{labelName}</label>
      <input {...register('email')} type="email" id="email" onChange={(e) => setValue('email', e.target.value, { shouldValidate: true })}  />
    </div>
  );
}
