import { IDocsData, IObjectProps } from '../../documentation.types.ts';
import { useContext, useEffect, useState } from 'react';
import { getTypeFields } from '../../../../lib/utils/getTypeFields.ts';
import userContext from '../../../../lib/context.ts';
import { ObjectHeader } from './ObjectSections/ObjectHeader.tsx';
import { TypeDetails } from './ObjectSections/TypeDetails.tsx';
import { ArgsDetails } from './ObjectSections/ArgsDetails.tsx';

export function ObjectSection({ openedType, setOpenedTypes, mainIndex }: IObjectProps) {
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
      <p style={{ marginBottom: '30px' }}>{openedType.description}</p>
      <TypeDetails
        openedType={openedType}
        setOpenedTypes={setOpenedTypes}
        fields={fields}
        data={data}
        mainIndex={mainIndex}
      />
      <ArgsDetails
        openedType={openedType}
        setOpenedTypes={setOpenedTypes}
        data={data}
        mainIndex={mainIndex}
      />
    </div>
  );
}
