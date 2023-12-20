import { useContext, useEffect, useState } from 'react';
import { pageData } from '../../lib/commonTypes/interfaces';
import Button from '../Button/Button';
import { userContext } from '../../lib';
import CodeMirror from '@uiw/react-codemirror';
import { settingsCodemirror } from '../../lib/constants';
import { materialLightInit } from '@uiw/codemirror-themes-all';
import { jsonLanguage } from '@codemirror/lang-json';

interface BottomConsoleProps {
  variables: string;
  headers: string;
  setVariables: React.Dispatch<React.SetStateAction<string>>;
  setHeaders: React.Dispatch<React.SetStateAction<string>>;
}

export default function BottomConsole({
  variables,
  setVariables,
  headers,
  setHeaders,
}: BottomConsoleProps) {
  const { localData } = useContext(userContext);

  const [data, setData] = useState<pageData>();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    if (localData) {
      setData(localData.mainPage);
    }
  }, [localData]);

  function handleVariables() {
    setOpen(true);
    setSelectedTab(1);
  }

  function handleHeaders() {
    setOpen(true);
    setSelectedTab(2);
  }
  return (
    data && (
      <div className={`bottom-console ${open ? 'bottom-console-open' : ''}`}>
        <div className="bottom-console__header">
          <Button
            variant="button-link"
            onClick={handleVariables}
            className={`${selectedTab == 1 ? 'button-link_active' : ''}`}
          >
            {data.variables}
          </Button>
          <Button
            variant="button-link"
            onClick={handleHeaders}
            className={`${selectedTab == 2 ? 'button-link_active' : ''}`}
          >
            {data.headers}
          </Button>
          <div className="spacer"></div>
          <div
            onClick={() => setOpen(!open)}
            className={`expand-button ${open ? ' expand-open' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        </div>
        <div className="bottom-console__inner">
          {selectedTab == 1 && (
            <CodeMirror
              theme={materialLightInit({
                settings: settingsCodemirror,
              })}
              value={variables}
              onChange={(value) => setVariables(value)}
              className="vars-input"
              extensions={[jsonLanguage]}
            />
          )}
          {selectedTab == 2 && (
            <CodeMirror
              theme={materialLightInit({
                settings: settingsCodemirror,
              })}
              value={headers}
              onChange={(value) => setHeaders(value)}
              className="headers-input"
              extensions={[jsonLanguage]}
            />
          )}
        </div>
      </div>
    )
  );
}
