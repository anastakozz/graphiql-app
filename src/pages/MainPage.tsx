import { useContext, useEffect, useState } from 'react';
import userContext from '../lib/context';
import { pageData } from '../lib/commonTypes/interfaces.ts';
import { PlayIcon } from '../assets/icons/play-icon';
import { CodeIcon } from '../assets/icons/code-icon';
import { URLInput, ApiErrorPopup, BottomConsole } from '../components';

const inputMock = `{
  test: {
    firstKey: 'test value',
    second: 'one more'
  }
}`;

const responseMock = `{
  someResponse: {
    firstKey: 'test value',
    second: 'one more'
  }
}`;

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
          <textarea value={inputMock} name="request" className="json-input"></textarea>
          <BottomConsole data={data} />
          <div className="action-button run-button">
            <PlayIcon />
          </div>
          <div className="action-button prettyfy-button">
            <CodeIcon />
          </div>
        </div>
        <div className="response-section">
          <textarea value={responseMock} name="response" className="json-output" />
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
