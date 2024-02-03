import { IOfType } from '../../components/Documentation/documentation.types.ts';

export function getTypeFields(obj: IOfType | undefined): string | IOfType {
  if (!obj) return '';
  return obj._fields ? obj._fields : getTypeFields(obj.ofType);
}
