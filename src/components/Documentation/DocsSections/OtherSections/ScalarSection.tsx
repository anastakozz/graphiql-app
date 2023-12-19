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
      <div style={{ marginBottom: '30px' }}>
        {openedType?.name}: {openedType.type && getTypeName(openedType.type, true)}
      </div>
      <h2>{data?.typeDetails}</h2>
      <p style={{ marginBottom: '30px' }}>{getTypeName(openedType.type, true, 'description')}</p>
      <p>scalar {getTypeName(openedType.type, true)}</p>
    </div>
  );
}
