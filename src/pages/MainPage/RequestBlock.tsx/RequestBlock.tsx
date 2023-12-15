import { useContext, useState } from 'react';
import { CodeIcon } from '../../../assets/icons/code-icon';
import { PlayIcon } from '../../../assets/icons/play-icon';
import { BottomConsole, JsonEditor } from '../../../components';
import { userContext } from '../../../lib';
import { useAppDispatch } from '../../../hooks';
import { introspectApi, makeRequest } from '../../../services/api.service';
import { updateApiError } from '../../../store/apiSlice';
import { updateEditorResponse } from '../../../store/jsonSlice';


export default function RequestBlock() {
  const { localData } = useContext(userContext);

  const dispatch = useAppDispatch();
  //   const url = useAppSelector((state) => state.api.apiUrl);
  const url = 'https://rickandmortyapi.com/graphql';

  const [value, setValue] = useState(`query ($filter: FilterCharacter) {
    characters(filter: $filter){info{count}}}`);
  const [variables, setVariables] = useState('{"filter":  {"name": "ho"} }');
  const [headers, setHeaders] = useState('');

  const sendRequest = async () => {
    const data = await introspectApi(url);
    if (data instanceof Error) {
      dispatch(updateApiError(localData && localData.apiResponse.invalidUrl));
    } else {
      const res = await makeRequest(url, value, variables);
      dispatch(updateEditorResponse(JSON.stringify(res)));
    }
  };

  const prettify = () => {
    console.log('prettify code in editor');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <JsonEditor value={value} onChange={handleChange} />
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
