import { Dispatch, SetStateAction, createContext } from 'react';
import { Language } from './enum';

interface ContextProps {
  isUserLoggedIn: boolean;
  setIsUSerLoggedIn?: Dispatch<SetStateAction<boolean>>;
  language: string;
  setLanguage?: Dispatch<SetStateAction<Language>>;
}

const userContext = createContext<ContextProps>({
  isUserLoggedIn: false,
  language: Language.en,
});

export default userContext;
