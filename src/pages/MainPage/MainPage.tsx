import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context.ts';
import { pageData } from '../../lib/commonTypes/interfaces.ts';
import { ApiErrorPopup, JsonEditor, URLInput } from '../../components/index.ts';
import RequestBlock from './RequestBlock.tsx/RequestBlock.tsx';
import { lazy, Suspense } from 'react';

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
          <RequestBlock />
        </div>

        <div className="response-section">
          <JsonEditor viewMode={true} />
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
