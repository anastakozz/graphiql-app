import { InputProps } from "../../lib/interfaces.ts";
import { ChangeEvent } from "react";

export default function Password({register, error, setValue}: InputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue('password', e.target.value, { shouldValidate: true });
  }
  return (
    <div>
      <div>{error}</div>
      <label htmlFor="password">Password: </label>
      <input {...register('password')} type="password" id="password" onChange={handleChange}/>
    </div>
  )
}
