import { UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface InputData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface InputProps {
  register: UseFormRegister<InputData>;
  error: string | undefined;
  setValue: UseFormSetValue<InputData>;
}
