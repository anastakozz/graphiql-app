import { IDocsSection } from '../../documentation.types.ts';
import { ScalarSection } from './ScalarSection.tsx';
import { getGraphQLType } from '../../../../lib/utils/getGraphQLType.ts';
import { EnumSection } from './EnumSection.tsx';
import { ObjectSection } from './ObjectSection.tsx';

export function OtherSectionsBlock({
  openedType,
  setOpenedTypes,
  mainIndex,
  typesActive,
  setTypesActive,
}: IDocsSection) {
  if (!openedType.type) return;
  const graphqlType = getGraphQLType(openedType.type);

  return (
    <>
      {!['GraphQLScalarType', 'GraphQLEnumType'].includes(graphqlType) && (
        <ObjectSection
          openedType={openedType}
          setOpenedTypes={setOpenedTypes}
          mainIndex={mainIndex}
          typesActive={typesActive}
          setTypesActive={setTypesActive}
        />
      )}
      {graphqlType === 'GraphQLScalarType' && <ScalarSection openedType={openedType} />}
      {graphqlType === 'GraphQLEnumType' && <EnumSection openedType={openedType} />}
    </>
  );
}
