import { getTypeName } from '../../../../lib/utils/getTypeName';
import { IDocsData, IScalarSection } from '../../documentation.types';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../../../lib/context';

export function ScalarSection({ openedType }: IScalarSection) {
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
        <span className="green-color"> {openedType.type && getTypeName(openedType.type, true)}</span>
      </div>
      <h2>{data?.typeDetails}</h2>
      <p className="description">{getTypeName(openedType.type, true, 'description')}</p>
      <p className="base-color">
        scalar <span className="green-color">{getTypeName(openedType.type, true)}</span>
      </p>
    </div>
  );
}
