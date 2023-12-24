import { useContext, useEffect, useState } from 'react';
import { IMainPage } from '../../lib/commonTypes/interfaces';
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
  const { localData } = useContext(userContext);

  const [data, setData] = useState<IMainPage>();
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
          <div>
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
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`expand-button ${open ? ' expand-open' : ''}`}
          >
            <OpenIcon />
          </button>
        </div>

        <div className="bottom-console__inner">
          {selectedTab == 1 && (
            <JsonEditor
              value={variables}
              language="json"
              className="vars-input"
              onChange={(value) => setVariables(value)}
            />
          )}
          {selectedTab == 2 && (
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
