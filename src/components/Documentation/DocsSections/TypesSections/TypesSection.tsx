import { IDocsData, IDocsSection } from '../../documentation.types.ts';
import { useContext, useEffect, useState } from 'react';
import userContext from '../../../../lib/context.ts';
import { getTypeName } from '../../../../lib/utils/getTypeName.ts';
import { ScalarSection } from './ScalarSection.tsx';

export function TypesSection({
  targetTypeObject,
  openedType,
  setOpenedTypes,
  mainIndex,
}: IDocsSection) {
  const [data, setData] = useState<IDocsData | null>(null);
  const { localData } = useContext(userContext);
  const fields = targetTypeObject?.fields;

  useEffect(() => {
    if (localData) {
      const data = localData.mainPage.docs;
      setData(data);
    }
  }, [localData]);

  if (!openedType) return;
  return (
    <>
      {fields ? (
        <div className="docs-section-content">
          <div style={{ marginBottom: '30px' }}>
            {openedType.args.length === 0 ? (
              <>
                {openedType.name}: {openedType.type && getTypeName(openedType.type)}
              </>
            ) : (
              <>
                <div>{openedType.name} (</div>
                {openedType.args.map((arg) => (
                  <div key={arg.name}>
                    {arg.name}: {getTypeName(arg.type)}
                  </div>
                ))}
                <div>): {openedType.type && getTypeName(openedType.type)}</div>
              </>
            )}
          </div>
          <p style={{ marginBottom: '30px' }}>{openedType.description}</p>
          <h2>{data?.typeDetails}</h2>
          <p style={{ marginBottom: '30px' }}>{targetTypeObject.description}</p>
          <ul style={{ marginBottom: '30px' }}>
            <li>type {openedType.type && getTypeName(openedType.type, true)} &#123;</li>
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
                  {type.args.length === 0 ? (
                    <>{`${type.name}: ${getTypeName(type.type)}`}</>
                  ) : (
                    <>{`${type.name}(...): ${getTypeName(type.type)}`}</>
                  )}
                </li>
              ))}
            <li>&#125;</li>
          </ul>
          {openedType.args.length > 0 && (
            <>
              <h2>{data?.arguments}</h2>
              {openedType.args.map((arg) => (
                <div
                  style={{ cursor: 'pointer' }}
                  key={arg.name}
                  onClick={() => {
                    setOpenedTypes((prevOpenedTypes) => {
                      const newArr = prevOpenedTypes.slice(0, mainIndex + 1);
                      return [...newArr, arg];
                    });
                  }}
                >
                  {arg.name}: {getTypeName(arg.type)}
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <ScalarSection openedType={openedType} typeObject={targetTypeObject} data={data} />
      )}
    </>
  );
}
