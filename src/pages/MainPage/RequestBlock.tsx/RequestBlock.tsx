import { useContext, useState } from 'react';
import { BottomConsole, JsonEditor, PlayButton, PrettifyButton } from '../../../components';
import { userContext } from '../../../lib';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { makeRequest } from '../../../services/api.service';
import { updateApiError } from '../../../store/apiSlice';
import { updateEditorResponse } from '../../../store/jsonSlice';
import { prettifyString } from '../../../lib/utils/prettifyString';

export default function RequestBlock() {
  const { localData } = useContext(userContext);

  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.api.apiUrl);

  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');

  const prettify = () => {
    try {
      const prettyQuery = prettifyString(query, true);
      setQuery(prettyQuery);
    } catch {
      dispatch(updateApiError(localData?.apiResponse.syntaxError));
    }

    try {
      const prettyVariables = prettifyString(variables);
      setVariables(prettyVariables);
    } catch {
      dispatch(updateApiError(localData?.apiResponse.syntaxError));
    }

    try {
      const prettyHeaders = prettifyString(headers);
      setHeaders(prettyHeaders);
    } catch {
      dispatch(updateApiError(localData?.apiResponse.syntaxError));
    }
  };

  const sendRequest = async () => {
    const response = await makeRequest(url, query, variables, headers);
    if (response instanceof Error) {
      dispatch(
        updateApiError(
          `${localData?.apiResponse.syntaxError} ${response.name}: ${response.message}`
        )
      );
    } else {
      const prettyResponse = prettifyString(JSON.stringify(response));
      dispatch(updateEditorResponse(prettyResponse));
    }
  };

  const handleChange = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <JsonEditor value={query} onChange={handleChange} language="graphql" className="json-input" />
      <PlayButton onClick={sendRequest} disabled={url.length === 0} />
      <PrettifyButton onClick={prettify} />
      <BottomConsole
        headers={headers}
        variables={variables}
        setHeaders={setHeaders}
        setVariables={setVariables}
      />
    </>
  );
}
