import { getTypeName } from '../../../../lib/utils/getTypeName';
import { IScalarSection } from '../../documentation.types';
import { useContext } from 'react';
import userContext from '../../../../lib/context';

export function ScalarSection({ openedType }: IScalarSection) {
  const dictionary = useContext(userContext).localData?.mainPage.docs;
  return (
    <>
      <div className="header-name">
        <span role="headerName" className="red-color">
          {openedType?.name}
        </span>
        :
        <span className="green-color">
          {' '}
          {openedType.type && getTypeName(openedType.type, true)}
        </span>
      </div>
      <h2>{dictionary?.typeDetails}</h2>
      <p className="description">{getTypeName(openedType.type, true, 'description')}</p>
      <p className="base-color">
        scalar <span className="green-color">{getTypeName(openedType.type, true)}</span>
      </p>
    </>
  );
}
