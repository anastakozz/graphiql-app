import { useContext, useEffect, useState } from 'react';
import userContext from '../lib/context';
import { pageData } from '../lib/commonTypes/interfaces.ts';
import { PlayIcon } from '../assets/icons/play-icon';
import { CodeIcon } from '../assets/icons/code-icon';
import { URLInput, ApiErrorPopup, BottomConsole } from '../components';
import { lazy, Suspense } from 'react';

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
  const DocumentationLazy = lazy(() => import('../components/Documentation/Documentation'));
  const [isSchemaLoaded, setIsSchemaLoaded] = useState(false);

  useEffect(() => {
    if (localData) {
      const data = localData.mainPage.docs;
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
        <Suspense>
          <DocumentationLazy
            showDocs={showDocs}
            isSchemaLoaded={isSchemaLoaded}
            setIsSchemaLoaded={setIsSchemaLoaded}
          />
        </Suspense>
        <div onClick={() => isSchemaLoaded && setShowDocs(!showDocs)} className="docs-badge">
          <p>{data.button}</p>
        </div>
      </div>
    )
  );
}
