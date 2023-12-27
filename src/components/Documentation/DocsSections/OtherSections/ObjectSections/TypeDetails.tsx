import { getTypeName } from '../../../../../lib/utils/getTypeName.ts';
import { ITypeDetailsProps, ITypeObject } from '../../../documentation.types.ts';

export function TypeDetails({
  openedType,
  data,
  fields,
  mainIndex,
  setOpenedTypes,
  typesActive,
  setTypesActive,
}: ITypeDetailsProps) {
  return (
    <>
      <h2 role="header">{data?.typeDetails}</h2>
      <p className="description">{getTypeName(openedType.type, true, 'description')}</p>
      <ul className="types-list">
        <li className="mb10">
          <span className="base-color">type </span>
          <span className="red-color">{openedType.type && getTypeName(openedType.type, true)}</span>
          &#123;
        </li>
        {fields &&
          Object.values(fields).map((type) => (
            <div key={type.name}>
              {type.deprecationReason && (
                <li className="deprecated">#Deprecated: {type.deprecationReason}</li>
              )}
              <li
                className={`list-item types-item ${
                  type.name === typesActive[mainIndex] && 'active'
                }`}
                onClick={() => {
                  setOpenedTypes((prevOpenedTypes): ITypeObject[] => {
                    const newArr = prevOpenedTypes.slice(0, mainIndex + 1);
                    return [...newArr, type];
                  });

                  setTypesActive((prevTypesActive): string[] => {
                    const newTypeActive = prevTypesActive.slice(0, mainIndex);
                    return [...newTypeActive, type.name];
                  });
                }}
                key={type.name}
              >
                {type.args?.length === 0 && type.args ? (
                  <>
                    <span className="base-color">{type.name}</span>:
                    <span className="green-color"> {getTypeName(type.type)}</span>
                  </>
                ) : (
                  <>
                    <span className="base-color">{type.name}</span>(...):
                    <span className="green-color"> {getTypeName(type.type, true)}</span>
                  </>
                )}
              </li>
            </div>
          ))}
        <li role="closeBracket" className="mt10">
          &#125;
        </li>
      </ul>
    </>
  );
}
