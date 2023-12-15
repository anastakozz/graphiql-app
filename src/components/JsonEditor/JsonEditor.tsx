import { useAppSelector } from '../../hooks';

type Props = {
  viewMode: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function JsonEditor({ viewMode = false, value, onChange }: Partial<Props>) {
  const response = useAppSelector((state) => state.editor.jsonResponse);

  if (viewMode) {
    return <textarea value={response} readOnly name="response" className="json-output" />;
  }

  return <textarea value={value} name="request" className="json-input" onChange={onChange} />;
}
