import { useContext } from 'react';
import userContext from '../../lib/context';
import { Language } from '../../lib';

export default function LanguageSelect() {
  const { localData, changeLocalData } = useContext(userContext);
  const languages = Object.values(Language);
  return (
    !!changeLocalData && (
      <div className="language-select">
        {languages.map((item) => {
          return (
            <>
              <button
                className={`language-button ${
                  localData && localData.language.code == item ? ' language-button-active' : ''
                }`}
                onClick={() => changeLocalData(Language[item])}
              >
                {item.toUpperCase()}
              </button>
            </>
          );
        })}
      </div>
    )
  );
}
