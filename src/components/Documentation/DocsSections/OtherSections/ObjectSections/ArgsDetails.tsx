import { getTypeName } from '../../../../../lib/utils/getTypeName';
import { IArgsProps } from '../../../documentation.types';

export function ArgsDetails({
  openedType,
  setOpenedTypes,
  mainIndex,
  data,
  typesActive,
  setTypesActive,
}: IArgsProps) {
  return (
    <>
      {openedType.args && openedType.args.length > 0 && (
        <>
          <h2>{data?.arguments}</h2>
          {openedType.args.map((arg) => (
            <div
              className="list-item"
              key={arg.name}
              onClick={() => {
                setOpenedTypes((prevOpenedTypes) => {
                  const newArr = prevOpenedTypes.slice(0, mainIndex + 1);
                  return [...newArr, arg];
                });
                setTypesActive((prevTypesActive): string[] => {
                  const newTypeActive = prevTypesActive.slice(0, mainIndex);
                  return [...newTypeActive, arg.name];
                });
              }}
              style={{
                backgroundColor: arg.name === typesActive[mainIndex] ? '#f4edff' : undefined,
              }}
            >
              <span className="base-color">{arg.name}</span>:
              <span className="green-color"> {getTypeName(arg.type)}</span>
            </div>
          ))}
        </>
      )}
    </>
  );
}
