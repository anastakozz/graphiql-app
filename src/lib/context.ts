import { Dispatch, SetStateAction, createContext } from 'react';
import en from '../localization/en.json';
import { LocalizationData } from './interface';

interface ContextProps {
  isUserLoggedIn: boolean;
  setIsUSerLoggedIn?: Dispatch<SetStateAction<boolean>>;
  localData?: LocalizationData;
  changeLocalData?: (language: string) => void;
}

const userContext = createContext<ContextProps>({
  isUserLoggedIn: false,
  localData: en,
});

export default userContext;
