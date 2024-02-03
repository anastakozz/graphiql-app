import { IOfType } from '../../components/Documentation/documentation.types.ts';
import { Maybe } from 'graphql/jsutils/Maybe';
import { GraphQLList, GraphQLNonNull } from 'graphql/type';

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

  if (obj instanceof GraphQLList) {
    return `[${getTypeName(obj.ofType)}]`;
  } else if (obj instanceof GraphQLNonNull) {
    return `${getTypeName(obj.ofType)}!`;
  }
  return obj[typeName] || '';
}
