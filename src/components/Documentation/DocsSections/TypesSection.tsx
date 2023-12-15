import { IDocsData, IDocsSection } from '../documentation.types.ts';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../../lib/context.ts';
import { getTypeName } from '../../../lib/utils/getTypeName.ts';

export function TypesSection({ fields, typeObject, setOpenedTypes, mainIndex }: IDocsSection) {
  const [data, setData] = useState<IDocsData | null>(null);
  const { localData } = useContext(userContext);

  useEffect(() => {
    if (localData) {
      const data = localData.mainPage.docs;
      setData(data);
    }
  }, [localData]);

  if (!typeObject) return;
  return (
    <div className="docs-section-content">
      <div style={{ marginBottom: '30px' }}>
        <div>{typeObject.name} (</div>
        {typeObject.args.map((arg) => (
          <div key={arg.name}>
            {arg.name}: {getTypeName(arg.type)}
          </div>
        ))}
        <div>): {typeObject.type && getTypeName(typeObject.type)}</div>
      </div>
      <p style={{ marginBottom: '30px' }}>{typeObject.description}</p>
      <h2>{data?.typeDetails}</h2>
      <ul style={{ marginBottom: '30px' }}>
        <li>type {typeObject.type && getTypeName(typeObject.type)} &#123;</li>
        {fields &&
          fields.map((type) => (
            <li
              onClick={() => {
                setOpenedTypes((prevOpenedTypes) => {
                  const newArr = prevOpenedTypes.slice(0, mainIndex + 1);
                  return [...newArr, type];
                });
              }}
              style={{ margin: '10px 0', cursor: 'pointer' }}
              key={type.name}
            >
              {type?.type?.name
                ? `${type.name}(...): ${type?.type?.name}`
                : `${type.name}(...): [${type?.type?.ofType?.name}]`}
            </li>
          ))}
        <li>&#125;</li>
      </ul>
      <h2>{data?.arguments}</h2>
      {typeObject.args.map((arg) => (
        <div key={arg.name}>
          {arg.name}: {getTypeName(arg.type)}
        </div>
      ))}
    </div>
  );
}
