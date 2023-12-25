import { useContext, useState } from 'react';
import { IMainSection } from '../../documentation.types';
import userContext from '../../../../lib/context';
import { getTypeName } from '../../../../lib/utils/getTypeName';

export function MainSectionList({
  type,
  setOpenedTypes,
  header,
  typeActive,
  setTypeActive,
}: IMainSection) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const dictionary = useContext(userContext).localData?.mainPage.docs;

  return (
    <>
      <h2>{dictionary && dictionary[header]}</h2>
      <ul>
        {type &&
          Object.values(type).map((type, index) => (
            <li
              className={`list-item ${index === activeItem && typeActive === type && 'active'}`}
              onClick={() => {
                setOpenedTypes([type]);
                setActiveItem(index === activeItem ? null : index);
                setTypeActive(type);
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
