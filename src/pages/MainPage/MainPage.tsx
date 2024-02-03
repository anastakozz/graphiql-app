import { useContext, useEffect, useState } from 'react';
import userContext from '../../lib/context';
import { URLInput } from '../../components/index';
import RequestBlock from './RequestBlock.tsx/RequestBlock';
import { lazy, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ApiErrorPopup from '../../components/ApiErrorPopup/ApiErrorPopup';
import ResponseBlock from './ResponseBlock.tsx/ResponseBlock';
import { Loader } from '../../components/Loader/Loader';
import { updateApiUrl } from '../../store/apiSlice';

export default function MainPage() {
  const dictionary = useContext(userContext).localData?.mainPage;
  const [showDocs, setShowDocs] = useState<boolean>(false);
  const url = useAppSelector((state) => state.api.apiUrl);
  const dispatch = useAppDispatch();
  const [isUrlChanged, setIsUrlChanged] = useState(false);
  const DocumentationLazy = lazy(() => import('../../components/Documentation/Documentation'));
  const [isUrlValid, setIsUrlValid] = useState(false);

  useEffect(() => {
    setIsUrlValid(url !== '');
    setIsUrlChanged(true);
  }, [url]);

  useEffect(() => {
    return () => {
      dispatch(updateApiUrl(''));
    };
  }, [dispatch]);

  return (
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
              <Loader />
            </div>
          }
        >
          <DocumentationLazy
            showDocs={showDocs}
            apiUrl={url}
            isUrlChanged={isUrlChanged}
            setIsUrlChanged={setIsUrlChanged}
          />
        </Suspense>
      )}
      <button
        onClick={() => isUrlValid && setShowDocs(!showDocs)}
        className={isUrlValid ? 'docs-badge' : 'docs-badge not-hover'}
      >
        {dictionary && dictionary.docs.button}
      </button>
    </div>
  );
}
