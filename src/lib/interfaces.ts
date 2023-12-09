import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import React from 'react';

export interface LocalizationData {
  [key: string]: string;
}

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

export interface ISetErrors {
  language: string;
  error: string | undefined;
  setCurrentError: React.Dispatch<React.SetStateAction<string>>;
  fieldType: string;
}

export interface ISetInputLabels {
  setLabelName: React.Dispatch<React.SetStateAction<string>>;
  component: string;
  language: string;
}
