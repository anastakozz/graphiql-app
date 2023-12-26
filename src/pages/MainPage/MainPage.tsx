import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { URLInput } from '../../components/index';
import RequestBlock from './RequestBlock.tsx/RequestBlock';
import { lazy, Suspense } from 'react';
import { useAppSelector } from '../../hooks';
import ApiErrorPopup from '../../components/ApiErrorPopup/ApiErrorPopup.tsx';
import ResponseBlock from './ResponseBlock.tsx/ResponseBlock.tsx';

export default function MainPage() {
  const dictionary = useContext(userContext).localData?.mainPage;
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const url = useAppSelector((state) => state.api.apiUrl);
  const DocumentationLazy = lazy(() => import('../../components/Documentation/Documentation'));
  const [isUrlValid, setIsUrlValid] = useState(false);
  console.log(dictionary);
  useEffect(() => {
    url === '' ? setIsUrlValid(false) : setIsUrlValid(true);
  }, [url]);

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
        {showDocs && isUrlValid && (
          <Suspense
            fallback={
              <div className="loader-wrapper">
                <div className="loader"></div>
              </div>
            }
          >
            <DocumentationLazy showDocs={showDocs} apiUrl={url} />
          </Suspense>
        )}
        <button
          onClick={() => isUrlValid && setShowDocs(!showDocs)}
          className={isUrlValid ? 'docs-badge' : 'docs-badge not-hover'}
        >
          {dictionary.docs.button}
        </button>
      </div>
    )
  );
}
