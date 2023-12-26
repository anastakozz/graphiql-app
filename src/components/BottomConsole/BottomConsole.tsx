import { useContext, useState } from 'react';
import Button from '../Button/Button';
import { userContext } from '../../lib';
import JsonEditor from '../JsonEditor/JsonEditor';
import OpenIcon from '../../assets/icons/open-icon';

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
  const dictionary = useContext(userContext).localData?.mainPage;

  enum tabs {
    headers,
    variables,
  }

  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs.headers);

  function handleVariables() {
    setOpen(true);
    setSelectedTab(tabs.variables);
  }

  function handleHeaders() {
    setOpen(true);
    setSelectedTab(tabs.headers);
  }

  return (
    dictionary && (
      <div className={`bottom-console ${open ? 'bottom-console-open' : ''}`}>
        <div className="bottom-console-header">
          <div>
            <Button
              variant="button-link"
              onClick={handleVariables}
              className={`${selectedTab === tabs.variables ? 'button-link-active' : ''}`}
            >
              {dictionary.variables}
            </Button>
            <Button
              variant="button-link"
              onClick={handleHeaders}
              className={`${selectedTab === tabs.headers ? 'button-link-active' : ''}`}
            >
              {dictionary.headers}
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`expand-button ${open ? ' expand-open' : ''}`}
          >
            <OpenIcon />
          </button>
        </div>

        <div className="bottom-console-inner">
          {selectedTab === tabs.variables && (
            <JsonEditor
              value={variables}
              language="json"
              className="vars-input"
              onChange={(value) => setVariables(value)}
            />
          )}
          {selectedTab === tabs.headers && (
            <JsonEditor
              value={headers}
              language="json"
              onChange={(value) => setHeaders(value)}
              className="headers-input"
            />
          )}
        </div>
      </div>
    )
  );
}
