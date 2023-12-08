import { InputProps } from "../../lib/interfaces.ts";
import { ChangeEvent } from 'react';

export default function Email({register, error, setValue}: InputProps ) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue('email', e.target.value, { shouldValidate: true });
  }
  return (
    <div>
      <div>{error}</div>
      <label htmlFor="email">E-mail: </label>
      <input {...register('email')} type="email" id="email" onChange={handleChange}/>
    </div>
  )
}
