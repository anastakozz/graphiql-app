import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { pageData } from '../../lib/commonTypes/interfaces';
import { ApiErrorPopup, JsonEditor, URLInput } from '../../components/index';
import RequestBlock from './RequestBlock.tsx/RequestBlock';
import { lazy, Suspense } from 'react';
import { useAppSelector } from "../../hooks.ts";

export default function MainPage() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const DocumentationLazy = lazy(() => import('../../components/Documentation/Documentation'));
  const [isUrlValid, setIsUrlValid] = useState(false);
  const apiUrl = useAppSelector((state) => state.api.apiUrl);

  useEffect(() => {
    apiUrl === '' ? setIsUrlValid(false) : setIsUrlValid(true);
  }, [apiUrl]);

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
        {showDocs && apiUrl !== '' && (
          <Suspense fallback={<div className="loader-wrapper">
            <div className="loader"></div>
          </div>
         }>
            <DocumentationLazy
              showDocs={showDocs}
              apiUrl={apiUrl}
            />
          </Suspense>
        )}
        <button onClick={() => setShowDocs(!showDocs)} className={isUrlValid ? "docs-badge" : "docs-badge not-hover"}>{data.button}</button>
      </div>
    )
  );
}
