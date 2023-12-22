import { IDocumentation, IGraphQL, IOfType, ITypeObject } from './documentation.types';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { buildClientSchema } from 'graphql/utilities';
import { fetchSchema } from '../../services/api.service';
import { OtherSectionsBlock } from './DocsSections/OtherSections/OtherSectionsBlock';
import { MainSectionList } from './DocsSections/MainSection/MainSectionList';
import { GraphQLFieldMap } from 'graphql/type';

function Documentation({ showDocs, setIsSchemaLoaded, isSchemaLoaded }: IDocumentation) {
  const [openedTypes, setOpenedTypes] = useState<Array<ITypeObject>>([]);
  const apiUrl = useAppSelector((state) => state.api.apiUrl);
  const [queries, setQueries] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [mutations, setMutations] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [subscriptions, setSubscriptions] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [typeActive, setTypeActive] = useState<IGraphQL>();
  const [typesActive, setTypesActive] = useState<Array<string>>([]);
  const documentationWidth = (openedTypes.length + 1) * 350;

  function getWidth() {
    if (!showDocs) return '0';
    if (documentationWidth < screenWidth) return `${documentationWidth}px`;
    return '100vw';
  }

  const dynamicStyles = {
    width: getWidth(),
    top: documentationWidth >= screenWidth ? 0 : undefined,
    right: 0,
    bottom: documentationWidth >= screenWidth ? 0 : undefined,
    left: documentationWidth >= screenWidth ? 0 : undefined,
  };

  useEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setScreenWidth(window.innerWidth));
    };
  }, []);

  useEffect(() => {
    setOpenedTypes([]);
    const parseSchema = async (apiUrl: string) => {
      setIsSchemaLoaded(false);
      const introspectionData = await fetchSchema(apiUrl);
      if (!introspectionData?.data) return;
      const schema = introspectionData?.data && buildClientSchema(introspectionData.data);
      const queryType = schema.getQueryType();
      const mutationType = schema.getMutationType();
      const subscriptionsType = schema.getSubscriptionType();
      const queries = queryType?.getFields();
      const mutations = mutationType?.getFields();
      const subscriptions = subscriptionsType?.getFields();
      setQueries(queries);
      setMutations(mutations);
      setSubscriptions(subscriptions);
      setIsSchemaLoaded(true);
    };
    parseSchema(apiUrl);
  }, [apiUrl, setIsSchemaLoaded]);
  if (!isSchemaLoaded) return;

  return (
    <div style={dynamicStyles} className={`docs-section ${showDocs ? 'docs-section-open' : ''}`}>
      <div className="docs-section-content">
        {queries && (
          <MainSectionList
            type={queries}
            setOpenedTypes={setOpenedTypes}
            header="queries"
            typeActive={typeActive}
            setTypeActive={setTypeActive}
          />
        )}
        {mutations && (
          <MainSectionList
            type={mutations}
            setOpenedTypes={setOpenedTypes}
            header="mutations"
            typeActive={typeActive}
            setTypeActive={setTypeActive}
          />
        )}
        {subscriptions && (
          <MainSectionList
            type={subscriptions}
            setOpenedTypes={setOpenedTypes}
            header="subscriptions"
            typeActive={typeActive}
            setTypeActive={setTypeActive}
          />
        )}
      </div>

      {openedTypes.length > 0 &&
        openedTypes.map((type, index) => (
          <OtherSectionsBlock
            mainIndex={index}
            key={index}
            openedType={type}
            setOpenedTypes={setOpenedTypes}
            typesActive={typesActive}
            setTypesActive={setTypesActive}
          />
        ))}
    </div>
  );
}

export default Documentation;
