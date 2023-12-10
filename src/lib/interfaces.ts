import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import React from 'react';
import { AboutUsType } from './types';

export interface pageData {
  [key: string]: string;
}

export interface LocalizationData {
  language: { code: string };
  header: {
    signOut: string;
    welcomePage: string;
  };
  welcomePage: pageData;
  authorization: {
    signIn: string;
    signUp: string;
    inputsTitle: pageData;
    errors: {
      email: pageData;
      password: pageData;
      confirmPassword: pageData;
    };
  };
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

export interface ITeamBlock {
  data: pageData;
  item: AboutUsType;
  index: number;
}
