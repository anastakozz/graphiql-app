import { createContext } from 'react';
import en from '../localization/en.json';
import { LocalizationData } from './commonTypes/interfaces';

interface ContextProps {
  localData?: LocalizationData | null;
  changeLocalData?: (language: string) => void;
}

const userContext = createContext<ContextProps>({
  localData: en,
});

export default userContext;
