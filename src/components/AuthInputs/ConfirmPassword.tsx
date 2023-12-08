import { InputProps } from "../../lib/interfaces.ts";
import { ChangeEvent } from "react";

export default function ConfirmPassword({register, error, setValue}: InputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue('confirmPassword', e.target.value, { shouldValidate: true });
  }
  return (
    <div>
      <div>{error}</div>
      <label htmlFor="password">Confirm password: </label>
      <input {...register('confirmPassword')} type="password" id="confirmPassword" onChange={handleChange}/>
    </div>
  )
}
