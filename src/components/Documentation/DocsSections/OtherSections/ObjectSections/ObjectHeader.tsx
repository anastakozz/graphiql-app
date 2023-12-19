import { getTypeName } from '../../../../../lib/utils/getTypeName.ts';
import { ITypeObject } from '../../../documentation.types.ts';

export function ObjectHeader({ openedType }: { openedType: ITypeObject }) {
  return (
    <div style={{ marginBottom: '30px' }}>
      {openedType.args?.length === 0 || !openedType.args ? (
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
  );
}
