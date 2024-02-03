import { IObjectProps } from '../../documentation.types';
import { useContext } from 'react';
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
  const fields = getTypeFields(openedType.type);
  const dictionary = useContext(userContext).localData?.mainPage.docs;

  return (
    <>
      <ObjectHeader openedType={openedType} />
      <p className="description">{openedType.description}</p>
      <TypeDetails
        openedType={openedType}
        setOpenedTypes={setOpenedTypes}
        fields={fields}
        data={dictionary}
        mainIndex={mainIndex}
        typesActive={typesActive}
        setTypesActive={setTypesActive}
      />
      <ArgsDetails
        openedType={openedType}
        setOpenedTypes={setOpenedTypes}
        data={dictionary}
        mainIndex={mainIndex}
        typesActive={typesActive}
        setTypesActive={setTypesActive}
      />
    </>
  );
}
