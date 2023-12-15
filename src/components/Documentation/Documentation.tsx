import { IApiSchema, IDocumentation, IFieldsArray, ITypeObject } from './documentation.types.ts';
import { useAppSelector } from '../../hooks.ts';
import { TypesSection } from './DocsSections/TypesSection.tsx';
import { useEffect, useState } from 'react';
import { QuerySection } from './DocsSections/QuerySection.tsx';
import { getTypeName } from '../../lib/utils/getTypeName.ts';

export function Documentation({ showDocs }: IDocumentation) {
  const [openedTypes, setOpenedTypes] = useState<Array<ITypeObject>>([]);
  const [fieldsArray, setFieldsArray] = useState<Array<IFieldsArray | undefined>>([]);
  const apiSchema: IApiSchema = useAppSelector((state) => state.api.apiSchema);
  const types = apiSchema.data?.__schema.types;
  const queryFields = apiSchema.data?.__schema.types[0].fields;

  useEffect(() => {
    const newFieldsArray = openedTypes.map((type) => {
      return types?.find((field) => type.type && field.name === getTypeName(type.type));
    });
    setFieldsArray(newFieldsArray);
  }, [openedTypes, types]);

  useEffect(() => {
    setFieldsArray([]);
  }, [apiSchema]);
  console.log(fieldsArray);

  return (
    <div className={`docs-section ${showDocs ? 'docs-section-open' : ''}`}>
      <QuerySection fields={queryFields} setOpenedTypes={setOpenedTypes} />

      {fieldsArray.length > 0 &&
        fieldsArray.map((targetTypeObj, index) => (
          <TypesSection
            mainIndex={index}
            key={index}
            fields={targetTypeObj?.fields}
            typeObject={openedTypes[index]}
            setOpenedTypes={setOpenedTypes}
          />
        ))}
    </div>
  );
}
