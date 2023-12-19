import { useContext, useEffect, useState } from 'react';
import { IDocsData, IMainSection } from '../../documentation.types';
import userContext from '../../../../lib/context';
import { getTypeName } from '../../../../lib/utils/getTypeName';

export function MainSectionList({ type, setOpenedTypes, header }: IMainSection) {
  const [docsData, setDocsData] = useState<IDocsData | null>(null);
  const { localData } = useContext(userContext);

  useEffect(() => {
    if (localData) {
      const data = localData.mainPage.docs;
      setDocsData(data);
    }
  }, [localData]);

  return (
    <>
      <h2>{docsData && docsData[header]}</h2>
      <ul>
        {type &&
          Object.values(type).map((type, index) => (
            <li
              onClick={() => {
                setOpenedTypes([type]);
              }}
              style={{ margin: '10px 0', cursor: 'pointer' }}
              key={index}
            >
              {`${type.name}(...): ${getTypeName(type.type)}`}
            </li>
          ))}
      </ul>
    </>
  );
}
