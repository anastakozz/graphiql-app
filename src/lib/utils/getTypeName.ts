import { IOfType } from '../../components/Documentation/documentation.types.ts';
import { Maybe } from 'graphql/jsutils/Maybe';

export function getTypeName(
  obj: IOfType | undefined,
  isJustName = false,
  typeName: 'name' | 'description' = 'name'
): Maybe<string> {
  if (!obj) {
    return '';
  }

  if (isJustName) {
    return obj[typeName] ? obj[typeName] : getTypeName(obj.ofType, isJustName, typeName);
  }

  const objType = obj?.constructor.name;

  if (objType === 'GraphQLList') {
    return `[${getTypeName(obj.ofType)}]`;
  } else if (objType === 'GraphQLNonNull') {
    return `${getTypeName(obj.ofType)}!`;
  }
  return obj[typeName] || '';
}
