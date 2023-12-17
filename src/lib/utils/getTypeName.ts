import { IOfType } from '../../components/Documentation/documentation.types.ts';

export function getTypeName(obj: IOfType | undefined, isJustName = false): string {
  if (!obj) {
    return '';
  }
  if (isJustName) {
    return obj.name ? obj.name : getTypeName(obj.ofType, true);
  }
  if (['SCALAR', 'OBJECT', 'INPUT_OBJECT'].includes(obj.kind)) {
    return obj.name || '';
  } else if (obj.kind === 'LIST') {
    return `[${getTypeName(obj.ofType)}]`;
  } else if (obj.kind === 'NON_NULL') {
    return `${getTypeName(obj.ofType)}!`;
  }

  return '';
}
