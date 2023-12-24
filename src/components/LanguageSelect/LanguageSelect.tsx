import { useContext } from 'react';
import userContext from '../../lib/context';
import { Language } from '../../lib';

export default function LanguageSelect() {
  const { localData, changeLocalData } = useContext(userContext);
  return changeLocalData ? (
    <div className="language-select" data-testid="language-select">
      <button
        className={`language-button ${
          localData && localData.language.code == 'ru' ? ' language-button-active' : ''
        }`}
        onClick={() => changeLocalData(Language.ru)}
      >
        RU
      </button>
      <button
        className={`language-button ${
          localData && localData.language.code == 'en' ? ' language-button-active' : ''
        }`}
        onClick={() => changeLocalData(Language.en)}
      >
        EN
      </button>
      <button
        className={`language-button ${
          localData && localData.language.code == 'es' ? ' language-button-active' : ''
        }`}
        onClick={() => changeLocalData(Language.es)}
      >
        ES
      </button>
    </div>
  ) : (
    <></>
  );
}
