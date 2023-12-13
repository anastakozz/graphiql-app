import { useContext, useEffect, useState } from 'react';
import userContext from '../lib/context';
import { pageData } from '../lib/commonTypes/interfaces.ts';
import { URLInput, ApiErrorPopup, BottomConsole, JsonEditor } from '../components';

export default function MainPage() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);
  const [showDocs, setShowDocs] = useState<boolean>(false);

  useEffect(() => {
    if (localData) {
      const data = localData['mainPage'];
      setData(data);
    }
  }, [localData]);

  return (
    data && (
      <div className="main-section">
        <ApiErrorPopup />
        <div className="request-section">
          <URLInput />
          <JsonEditor />
          <BottomConsole data={data} />
        </div>
        <div className="response-section">
          <JsonEditor viewMode={true} />
        </div>
        <div className={`docs-section ${showDocs ? 'docs-section-open' : ''}`}>
          <div className="docs-section-content">
            <h2>{data.docs}</h2>
            <p>some contents here...</p>
          </div>
        </div>
        <div onClick={() => setShowDocs(!showDocs)} className="docs-badge">
          <p>{data.docs}</p>
        </div>
      </div>
    )
  );
}
