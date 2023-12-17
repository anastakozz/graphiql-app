import { getTypeName } from '../../../../lib/utils/getTypeName.ts';
import { IScalarSection } from '../../documentation.types.ts';

export function ScalarSection({ openedType, typeObject, data }: IScalarSection) {
  return (
    <div className="docs-section-content">
      <div style={{ marginBottom: '30px' }}>
        {openedType?.name}: {openedType.type && getTypeName(openedType.type)}
      </div>
      <p style={{ marginBottom: '30px' }}>{openedType.description}</p>
      <h2>{data?.typeDetails}</h2>
      <p style={{ marginBottom: '30px' }}>{typeObject?.description}</p>
      <p>scalar {getTypeName(openedType.type, true)}</p>
    </div>
  );
}
