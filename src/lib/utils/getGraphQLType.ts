import { IOfType } from '../../components/Documentation/documentation.types';

export function getGraphQLType(obj: IOfType | undefined): string {
  if (!obj) return '';
  const objType = obj.constructor.name;

  if (['GraphQLScalarType', 'GraphQLInputObjectType'].includes(objType)) return objType;
  return ['GraphQLObjectType', 'GraphQLEnumType'].includes(objType)
    ? objType
    : getGraphQLType(obj.ofType);
}
