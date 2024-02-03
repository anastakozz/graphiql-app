import { getTypeName } from '../../../../../lib/utils/getTypeName';
import { ITypeObject } from '../../../documentation.types';

export function ObjectHeader({ openedType }: { openedType: ITypeObject }) {
  return (
    <div className="header-name">
      <div className="scroll-x">
        {openedType.args?.length === 0 || !openedType.args ? (
          <>
            <span data-testid="objectTypeName" className="red-color">
              {openedType.name}
            </span>
            :&#160;
            <span className="green-color">{openedType.type && getTypeName(openedType.type)}</span>
          </>
        ) : (
          <>
            <div className="mb10 scroll-x">
              <span className="red-color"> {openedType.name}</span> (
            </div>
            {openedType.args.map((arg) => (
              <div key={arg.name} className="types-item">
                <span className="base-color">{arg.name}</span>:
                <span className="green-color"> {getTypeName(arg.type)}</span>
              </div>
            ))}
            <div className="mt10 scroll-x">
              ):
              <span data-testid="objectTypeType" className="green-color">
                {' '}
                {openedType.type && getTypeName(openedType.type)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
