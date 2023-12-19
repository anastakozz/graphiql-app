import { getTypeName } from '../../../../../lib/utils/getTypeName.ts';
import { ITypeDetailsProps, ITypeObject } from '../../../documentation.types.ts';

export function TypeDetails({
  openedType,
  data,
  fields,
  mainIndex,
  setOpenedTypes,
}: ITypeDetailsProps) {
  return (
    <>
      <h2>{data?.typeDetails}</h2>
      <p style={{ marginBottom: '30px' }}>{getTypeName(openedType.type, true, 'description')}</p>
      <ul style={{ marginBottom: '30px' }}>
        <li>type {openedType.type && getTypeName(openedType.type, true)} &#123;</li>
        {fields &&
          Object.values(fields).map((type) => (
            <div key={type.name}>
              {type.deprecationReason && (
                <li style={{ fontStyle: 'italic' }}>#Deprecated: {type.deprecationReason}</li>
              )}
              <li
                onClick={() => {
                  setOpenedTypes((prevOpenedTypes): ITypeObject[] => {
                    const newArr = prevOpenedTypes.slice(0, mainIndex + 1);
                    return [...newArr, type];
                  });
                }}
                style={{ margin: '10px 0', cursor: 'pointer' }}
                key={type.name}
              >
                {type.args?.length === 0 && type.args ? (
                  <>{`${type.name}: ${getTypeName(type.type)}`}</>
                ) : (
                  <>{`${type.name}(...): ${getTypeName(type.type, true)}`}</>
                )}
              </li>
            </div>
          ))}
        <li>&#125;</li>
      </ul>
    </>
  );
}
