import CodeMirror from '@uiw/react-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { materialLightInit } from '@uiw/codemirror-themes-all';
import { settingsCodemirror } from '../../lib/constants';
import { graphqlLanguage } from 'cm6-graphql';

const languages = {
  json: jsonLanguage,
  graphql: graphqlLanguage,
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
      onChange={(value) => onChange && onChange(value)}
      extensions={[languages[language]]}
    />
  );
}
