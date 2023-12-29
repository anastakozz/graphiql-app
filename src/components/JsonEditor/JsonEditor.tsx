import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { materialLightInit } from '@uiw/codemirror-themes-all';
import { settingsCodemirror } from '../../lib/constants';
import { graphql } from 'cm6-graphql';

const languages = {
  json: langs.json(),
  graphql: graphql(),
};

type Props = {
  language: keyof typeof languages;
  value: string;
  className: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

export default function JsonEditor({
  readOnly = false,
  value,
  onChange,
  language,
  className,
}: Props) {
  return (
    <CodeMirror
      theme={materialLightInit({
        settings: settingsCodemirror,
      })}
      value={value}
      readOnly={readOnly}
      className={className}
      onChange={(value: string) => onChange && onChange(value)}
      extensions={[languages[language]]}
      basicSetup={{
        defaultKeymap: false,
        autocompletion: false,
      }}
    />
  );
}
