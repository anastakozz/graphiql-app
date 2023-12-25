import { JsonEditor } from '../../../components';
import { useAppSelector } from '../../../hooks';

export default function ResponseBlock() {
  const response = useAppSelector((state) => state.editor.jsonResponse);
  const url = useAppSelector((state) => state.api.apiUrl);

  return (
    <div className="output-wrapper">
      {response.length !== 0 && url.length !== 0 && (
        <JsonEditor readOnly={true} value={response} language="json" className="json-output" />
      )}
    </div>
  );
}
