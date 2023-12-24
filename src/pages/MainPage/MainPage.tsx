import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { pageData } from '../../lib/commonTypes/interfaces';
import { ApiErrorPopup, JsonEditor, URLInput } from '../../components/index';
import RequestBlock from './RequestBlock.tsx/RequestBlock';
import { lazy, Suspense } from 'react';
import { useAppSelector } from "../../hooks";

export default function MainPage() {
  const { localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const response = useAppSelector((state) => state.editor.jsonResponse);
  const url = useAppSelector((state) => state.api.apiUrl);
  const DocumentationLazy = lazy(() => import('../../components/Documentation/Documentation'));
  const [isUrlValid, setIsUrlValid] = useState(false);

  useEffect(() => {
    url === '' ? setIsUrlValid(false) : setIsUrlValid(true);
  }, [url]);

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
        {showDocs && isUrlValid && (
          <Suspense fallback={<div className="loader-wrapper">
            <div className="loader"></div>
          </div>
         }>
            <DocumentationLazy
              showDocs={showDocs}
              apiUrl={url}
            />
          </Suspense>
        )}
        <button onClick={() => isUrlValid && setShowDocs(!showDocs)} className={isUrlValid ? "docs-badge" : "docs-badge not-hover"}>{data.button}</button>
      </div>
    )
  );
}
