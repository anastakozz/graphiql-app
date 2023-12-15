import { IDocsData, IQuerySection } from '../documentation.types.ts';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../../lib/context.ts';

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
              {type?.type?.name
                ? `${type.name}(...): ${type?.type?.name}`
                : `${type.name}(...): [${type?.type?.ofType?.name}]`}
            </li>
          ))}
      </ul>
    </div>
  );
}
