import { useContext, useState } from 'react';
import { CodeIcon } from '../../../assets/icons/code-icon';
import { PlayIcon } from '../../../assets/icons/play-icon';
import { BottomConsole, JsonEditor } from '../../../components';
import { userContext } from '../../../lib';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { introspectApi, makeRequest } from '../../../services/api.service';
import { updateApiError } from '../../../store/apiSlice';
import { updateEditorResponse } from '../../../store/jsonSlice';
import { prettifyString } from '../../../lib/utils/prettify';

export default function RequestBlock() {
  const { localData } = useContext(userContext);

  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.api.apiUrl);

  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');

  const prettify = () => {
    const prettyQuery = prettifyString(query);
    setQuery(prettyQuery);

    const prettyVariables = prettifyString(variables);
    setVariables(prettyVariables);

    const prettyHeaders = prettifyString(headers);
    setHeaders(prettyHeaders);
  };

  const sendRequest = async () => {
    const data = await introspectApi(url);
    if (data instanceof Error) {
      dispatch(updateApiError(localData && localData.apiResponse.invalidUrl));
    } else {
      const response = await makeRequest(url, query, variables, headers);
      const prettyResponse = prettifyString(JSON.stringify(response));
      dispatch(updateEditorResponse(prettyResponse));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <JsonEditor value={query} onChange={handleChange} />
      <div className="action-button run-button" onClick={sendRequest}>
        <PlayIcon />
      </div>
      <div className="action-button prettyfy-button" onClick={prettify}>
        <CodeIcon />
      </div>
      <BottomConsole
        headers={headers}
        variables={variables}
        setHeaders={setHeaders}
        setVariables={setVariables}
      />
    </>
  );
}
