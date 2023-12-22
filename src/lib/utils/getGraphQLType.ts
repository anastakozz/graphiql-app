import { IOfType } from '../../components/Documentation/documentation.types';
import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql/type';

export function getGraphQLType(obj: IOfType | undefined): string {
  if (!obj) return '';
  if (obj instanceof GraphQLScalarType) return 'GraphQLScalarType';
  if (obj instanceof GraphQLInputObjectType) return 'GraphQLInputObjectType';
  if (obj instanceof GraphQLObjectType) return 'GraphQLObjectType';
  if (obj instanceof GraphQLEnumType) return 'GraphQLEnumType';
  return getGraphQLType(obj?.ofType);
}
