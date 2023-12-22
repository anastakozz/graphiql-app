import { IDocsData, IObjectProps } from '../../documentation.types';
import { useContext, useEffect, useState } from 'react';
import { getTypeFields } from '../../../../lib/utils/getTypeFields';
import userContext from '../../../../lib/context';
import { ObjectHeader } from './ObjectSections/ObjectHeader';
import { TypeDetails } from './ObjectSections/TypeDetails';
import { ArgsDetails } from './ObjectSections/ArgsDetails';

export function ObjectSection({
  openedType,
  setOpenedTypes,
  mainIndex,
  typesActive,
  setTypesActive,
}: IObjectProps) {
  const [data, setData] = useState<IDocsData | null>(null);
  const fields = getTypeFields(openedType.type);
  const { localData } = useContext(userContext);

  useEffect(() => {
    if (localData) {
      const data: IDocsData = localData.mainPage.docs;
      setData(data);
    }
  }, [localData]);

  return (
    <div className="docs-section-content">
      <ObjectHeader openedType={openedType} />
      <p className="description">{openedType.description}</p>
      <TypeDetails
        openedType={openedType}
        setOpenedTypes={setOpenedTypes}
        fields={fields}
        data={data}
        mainIndex={mainIndex}
        typesActive={typesActive}
        setTypesActive={setTypesActive}
      />
      <ArgsDetails
        openedType={openedType}
        setOpenedTypes={setOpenedTypes}
        data={data}
        mainIndex={mainIndex}
        typesActive={typesActive}
        setTypesActive={setTypesActive}
      />
    </div>
  );
}
