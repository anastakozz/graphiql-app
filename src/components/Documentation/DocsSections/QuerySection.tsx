import { IDocsData, IQuerySection } from '../documentation.types.ts';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../../lib/context.ts';
import { getTypeName } from '../../../lib/utils/getTypeName.ts';

export function QuerySection({ fields, setOpenedTypes }: IQuerySection) {
  const [docsData, setDocsData] = useState<IDocsData | null>(null);
  const { localData } = useContext(userContext);

  useEffect(() => {
    if (localData) {
      const data = localData.mainPage.docs;
      setDocsData(data);
    }
  }, [localData]);
  return (
    <div className="docs-section-content">
      <h2>{docsData?.queries}</h2>
      <ul>
        {fields &&
          fields.map((type, index) => (
            <li
              onClick={() => {
                setOpenedTypes([type]);
              }}
              style={{ margin: '10px 0', cursor: 'pointer' }}
              key={index}
            >
              {type.args.length === 0 ? (
                <>{`${type.name}: ${getTypeName(type.type)}`}</>
              ) : (
                <>{`${type.name}(...): ${getTypeName(type.type)}`}</>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
