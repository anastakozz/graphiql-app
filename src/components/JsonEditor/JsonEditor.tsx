import { useState } from 'react';
import { PlayIcon } from '../../assets/icons/play-icon';
import { CodeIcon } from '../../assets/icons/code-icon';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { makeRequest } from '../../services/api.service';
import { updateEditorResponse } from '../../store/jsonSlice';
import { updateApiError } from '../../store/apiSlice';

type Props = {
  viewMode?: boolean;
};

export default function JsonEditor({ viewMode = false }: Props) {
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.api.apiUrl);
  const response = useAppSelector((state) => state.editor.jsonResponse);
  const [value, setValue] = useState('');

  const sendRequest = async () => {
    const res = await makeRequest(url, value);
    if (res instanceof Error) {
      dispatch(updateApiError(res.message));
    } else {
      dispatch(updateEditorResponse(res));
    }
  };

  const prettify = () => {
    console.log('prettify code in editor');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  if (viewMode) {
    return <textarea value={response} readOnly name="response" className="json-output" />;
  }

  return (
    <>
      <textarea value={value} name="request" className="json-input" onChange={handleChange} />
      <div className="action-button run-button" onClick={sendRequest}>
        <PlayIcon />
      </div>
      <div className="action-button prettyfy-button" onClick={prettify}>
        <CodeIcon />
      </div>
    </>
  );
}
