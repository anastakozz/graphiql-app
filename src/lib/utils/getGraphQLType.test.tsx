import { getGraphQLType } from './getGraphQLType.ts';
import {
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLEnumType,
} from 'graphql';
import { IOfType } from '../../components/Documentation/documentation.types.ts';

describe('getGraphQLType', () => {
  it('returns an empty string for undefined input', () => {
    const result = getGraphQLType(undefined);
    expect(result).toBe('');
  });

  it('returns "GraphQLScalarType" for GraphQLScalarType input', () => {
    const scalarType = new GraphQLScalarType({ name: 'MyScalarType' }) as IOfType;
    const result = getGraphQLType(scalarType);
    expect(result).toBe('GraphQLScalarType');
  });

  it('returns "GraphQLInputObjectType" for GraphQLInputObjectType input', () => {
    const inputObjectType = new GraphQLInputObjectType({
      name: 'MyInputObjectType',
      description: 'description',
      fields: {},
    });
    const result = getGraphQLType(inputObjectType as unknown as IOfType);
    expect(result).toBe('GraphQLInputObjectType');
  });

  it('returns "GraphQLObjectType" for GraphQLObjectType input', () => {
    const objectType = new GraphQLObjectType({
      name: 'MyObjectType',
      fields: {},
    });
    const result = getGraphQLType(objectType as unknown as IOfType);
    expect(result).toBe('GraphQLObjectType');
  });

  it('returns "GraphQLEnumType" for GraphQLEnumType input', () => {
    const enumType = new GraphQLEnumType({
      name: 'MyEnumType',
      values: {},
    });
    const result = getGraphQLType(enumType as unknown as IOfType);
    expect(result).toBe('GraphQLEnumType');
  });

  it('recursively gets the type for a nested object', () => {
    const nestedObjectType = new GraphQLObjectType({
      name: 'NestedObjectType',
      fields: {
        nestedField: { type: new GraphQLObjectType({ name: 'NestedType', fields: {} }) },
      },
    });
    const result = getGraphQLType(nestedObjectType as unknown as IOfType);
    expect(result).toBe('GraphQLObjectType');
  });
});
