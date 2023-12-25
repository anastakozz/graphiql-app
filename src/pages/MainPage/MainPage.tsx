import { useContext, useState } from 'react';
import userContext from '../../lib/context.ts';
import { URLInput } from '../../components/index.ts';
import RequestBlock from './RequestBlock.tsx/RequestBlock.tsx';
import ApiErrorPopup from '../../components/ApiErrorPopup/ApiErrorPopup.tsx';
import ResponseBlock from './ResponseBlock.tsx/ResponseBlock.tsx';

export default function MainPage() {
  const dictionary = useContext(userContext).localData?.mainPage;
  const [showDocs, setShowDocs] = useState<boolean>(false);

  return (
    dictionary && (
      <div className="main-section">
        <ApiErrorPopup />
        <div className="request-section">
          <URLInput />
          <RequestBlock />
        </div>
        <div className="response-section">
          <ResponseBlock />
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
