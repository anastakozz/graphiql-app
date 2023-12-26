import { IDocumentation, IGraphQL, IOfType, ITypeObject } from './documentation.types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { buildClientSchema } from 'graphql/utilities';
import { fetchSchema } from '../../services/api.service';
import { OtherSectionsBlock } from './DocsSections/OtherSections/OtherSectionsBlock';
import { MainSectionList } from './DocsSections/MainSection/MainSectionList';
import { GraphQLFieldMap } from 'graphql/type';
import { updateApiSchema } from '../../store/apiSlice';

function Documentation({ showDocs, apiUrl }: IDocumentation) {
  const [openedTypes, setOpenedTypes] = useState<Array<ITypeObject>>([]);
  const [queries, setQueries] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [mutations, setMutations] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [subscriptions, setSubscriptions] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [typeActive, setTypeActive] = useState<IGraphQL>();
  const [typesActive, setTypesActive] = useState<Array<string>>([]);
  const schema = useAppSelector((state) => state.api.apiSchema);
  const [isSchemaLoaded, setIsSchemaLoaded] = useState(false);
  const dispatch = useAppDispatch();
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
    setIsSchemaLoaded(false);
    const parseSchema = async (apiUrl: string) => {
      let graphSchemaObject;
      if (schema) graphSchemaObject = buildClientSchema(schema.data);
      if (!schema) {
        const introspectionData = await fetchSchema(apiUrl);
        if (!introspectionData?.data) return;
        graphSchemaObject = introspectionData?.data && buildClientSchema(introspectionData.data);
        dispatch(updateApiSchema(introspectionData));
      }
      const queryType = graphSchemaObject?.getQueryType();
      const mutationType = graphSchemaObject?.getMutationType();
      const subscriptionsType = graphSchemaObject?.getSubscriptionType();
      const queries = queryType?.getFields();
      const mutations = mutationType?.getFields();
      const subscriptions = subscriptionsType?.getFields();
      setQueries(queries);
      setMutations(mutations);
      setSubscriptions(subscriptions);
      setIsSchemaLoaded(true);
    };
    parseSchema(apiUrl);
  }, [apiUrl, dispatch, schema]);

  return (
    <div style={dynamicStyles} className={`docs-section ${showDocs ? 'docs-section-open' : ''}`}>
      {isSchemaLoaded ? (
        <>
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
        </>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default Documentation;
