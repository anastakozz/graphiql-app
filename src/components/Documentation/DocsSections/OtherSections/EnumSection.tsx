import { IDocsData, IScalarSection } from '../../documentation.types';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../../../lib/context';
import { getTypeName } from '../../../../lib/utils/getTypeName';

export function EnumSection({ openedType }: IScalarSection) {
  const [data, setData] = useState<IDocsData | null>(null);
  const { localData } = useContext(userContext);

  useEffect(() => {
    if (localData) {
      const data = localData.mainPage.docs;
      setData(data);
    }
  }, [localData]);

  return (
    <div className="docs-section-content">
      <div className="header-name">
        <span className="red-color">{openedType?.name}</span>:
        <span className="green-color">{openedType.type && getTypeName(openedType.type, true)}</span>
      </div>
      <h2>{data?.typeDetails}</h2>
      <p className="description">{getTypeName(openedType.type, true, 'description')}</p>
      <ul>
        <li className="mb10">
          <span className="base-color">enum </span>
          <span className="green-color">{getTypeName(openedType.type, true)}</span> &#123;
        </li>
        {openedType?.type?._values?.map((type) => (
          <li key={type.name}>
            <p className="red-color types-item">{type.name}</p>
            <p className="description types-item">{type.description}</p>
          </li>
        ))}
        <li className="mt10">&#125;</li>
      </ul>
    </div>
  );
}
