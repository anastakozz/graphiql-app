import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { AboutUsType } from './types';

export interface pageData {
  [key: string]: string;
}

export interface IMainPage {
  variables: string;
  headers: string;
  docs: {
    button: string;
    queries: string;
    typeDetails: string;
    arguments: string;
    mutations: string;
    subscriptions: string;
  };
}

export interface LocalizationData {
  language: { code: string };
  header: {
    signOut: string;
    welcomePage: string;
  };
  welcomePage: pageData;
  mainPage: IMainPage;
  notFoundPage: pageData;
  errorPage: pageData;
  signInPage: pageData;
  signUpPage: pageData;
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
  apiResponse: pageData;
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

export interface ITeamBlock {
  data: pageData;
  item: AboutUsType;
  index: number;
}
