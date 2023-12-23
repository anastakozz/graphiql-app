import { useContext, useState } from 'react';
import userContext from '../../lib/context.ts';
import { ApiErrorPopup, JsonEditor, URLInput } from '../../components/index.ts';
import RequestBlock from './RequestBlock.tsx/RequestBlock.tsx';
import { useAppSelector } from '../../hooks.ts';

export default function MainPage() {
  const dictionary = useContext(userContext).localData?.mainPage;
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const response = useAppSelector((state) => state.editor.jsonResponse);
  const url = useAppSelector((state) => state.api.apiUrl);

  return (
    dictionary && (
      <div className="main-section">
        <ApiErrorPopup />
        <div className="request-section">
          <URLInput />
          <RequestBlock />
        </div>
        <div className="response-section">
          <div className="output-wrapper">
            {response.length !== 0 && url.length !== 0 && (
              <JsonEditor
                readOnly={true}
                value={response}
                language="json"
                className="json-output"
              />
            )}
          </div>
        </div>

        <div className={`docs-section ${showDocs ? 'docs-section-open' : ''}`}>
          <div className="docs-section-content">
            <h2>{dictionary.docs}</h2>
            <p>some contents here...</p>
          </div>
        </div>
        <div onClick={() => setShowDocs(!showDocs)} className="docs-badge">
          <p>{dictionary.docs}</p>
        </div>
      </div>
    )
  );
}
