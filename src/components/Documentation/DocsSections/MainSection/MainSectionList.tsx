import { useContext, useEffect, useState } from 'react';
import { IDocsData, IMainSection } from '../../documentation.types';
import userContext from '../../../../lib/context';
import { getTypeName } from '../../../../lib/utils/getTypeName';

export function MainSectionList({
  type,
  setOpenedTypes,
  header,
  typeActive,
  setTypeActive,
}: IMainSection) {
  const [docsData, setDocsData] = useState<IDocsData | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);
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
              className="list-item"
              onClick={() => {
                setOpenedTypes([type]);
                setActiveItem(index === activeItem ? null : index);
                setTypeActive(type);
              }}
              style={{
                backgroundColor:
                  index === activeItem && typeActive === type ? '#f4edff' : undefined,
              }}
              key={index}
            >
              {type.name}
              <span className="black-color">(...): </span>
              <span className="green-color">{getTypeName(type.type)}</span>
            </li>
          ))}
      </ul>
    </>
  );
}
