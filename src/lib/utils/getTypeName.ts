import { IOfType } from '../../components/Documentation/documentation.types.ts';

export function getTypeName(obj: IOfType | undefined): string {
  return obj?.name ? obj?.name : getTypeName(obj?.ofType);
  // if (obj.name) {
  //   return obj.name;
  // } else {
  //   const typeName = getTypeName(obj.ofType);
  //   return typeName.startsWith('[') && typeName.endsWith(']!') ? typeName : `[${typeName}]!`;
  // }
}
