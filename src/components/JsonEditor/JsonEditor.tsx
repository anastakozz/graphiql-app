import { useAppSelector } from '../../hooks';
import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { materialLightInit } from '@uiw/codemirror-themes-all';
import { settingsCodemirror } from '../../lib/constants';
import { graphql } from 'cm6-graphql';

type Props = {
  viewMode: boolean;
  value: string;
  onChange: (value: string) => void;
};

export default function JsonEditor({ viewMode = false, value, onChange }: Partial<Props>) {
  const response = useAppSelector((state) => state.editor.jsonResponse);

  if (viewMode) {
    return (
      <CodeMirror
        className="json-output"
        theme={materialLightInit({
          settings: settingsCodemirror,
        })}
        readOnly={true}
        value={response}
        extensions={[jsonLanguage]}
      />
    );
  }

  return (
    <CodeMirror
      theme={materialLightInit({
        settings: settingsCodemirror,
      })}
      value={value}
      readOnly={false}
      className="json-input"
      onChange={(value) => onChange && onChange(value)}
      extensions={[graphql()]}
    />
  );
}
