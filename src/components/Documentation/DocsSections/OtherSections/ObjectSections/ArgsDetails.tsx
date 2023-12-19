import { getTypeName } from '../../../../../lib/utils/getTypeName';
import { IArgsProps } from '../../../documentation.types';

export function ArgsDetails({ openedType, setOpenedTypes, mainIndex, data }: IArgsProps) {
  return (
    <>
      {openedType.args && openedType.args.length > 0 && (
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
              {arg.name}: {getTypeName(arg.type)}{' '}
            </div>
          ))}
        </>
      )}
    </>
  );
}
