import { useContext } from 'react';
import userContext from '../../lib/context';
import { Language } from '../../lib/enum';

export default function LanguageSelect() {
  const { language, setLanguage } = useContext(userContext);
  return setLanguage ? (
    <div className="language-select">
      <button
        className={`language-button ${language == Language.ru ? ' language-button-active' : ''}`}
        onClick={() => setLanguage(Language.ru)}
      >
        RU
      </button>
      <button
        className={`language-button ${language == Language.en ? ' language-button-active' : ''}`}
        onClick={() => setLanguage(Language.en)}
      >
        EN
      </button>
      <button
        className={`language-button ${language == Language.es ? ' language-button-active' : ''}`}
        onClick={() => setLanguage(Language.es)}
      >
        ES
      </button>
    </div>
  ) : (
    <></>
  );
}
