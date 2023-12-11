import { createContext } from 'react';
import en from '../localization/en.json';
import { LocalizationData } from './interfaces';

interface ContextProps {
  localData?: LocalizationData;
  changeLocalData?: (language: string) => void;
}

const userContext = createContext<ContextProps>({
  localData: en,
});

export default userContext;
