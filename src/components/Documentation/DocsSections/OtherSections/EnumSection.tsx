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
      <div style={{ marginBottom: '30px' }}>
        {openedType?.name}: {openedType.type && getTypeName(openedType.type, true)}
      </div>
      <h2>{data?.typeDetails}</h2>
      <p style={{ marginBottom: '30px' }}>{getTypeName(openedType.type, true, 'description')}</p>
      <ul>
        <li>enum {getTypeName(openedType.type, true)} &#123;</li>
        {openedType?.type?._values?.map((type) => (
          <li key={type.name}>
            <p>{type.name}</p>
            <p>{type.description}</p>
          </li>
        ))}
        <li>&#125;</li>
      </ul>
    </div>
  );
}
