import { IDocumentation, IOfType, ITypeObject } from './documentation.types';
import { useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { buildClientSchema } from 'graphql/utilities';
import { fetchSchema } from '../../services/api.service';
import { OtherSectionsBlock } from './DocsSections/OtherSections/OtherSectionsBlock.tsx';
import { MainSectionList } from './DocsSections/MainSection/MainSectionList';
import { GraphQLFieldMap } from 'graphql/type';

function Documentation({ showDocs, setIsSchemaLoaded, isSchemaLoaded }: IDocumentation) {
  const [openedTypes, setOpenedTypes] = useState<Array<ITypeObject>>([]);
  const apiUrl = useAppSelector((state) => state.api.apiUrl);
  const [queries, setQueries] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [mutations, setMutations] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();
  const [subscriptions, setSubscriptions] = useState<GraphQLFieldMap<ITypeObject, IOfType>>();

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
  }, [apiUrl]);
  if (!isSchemaLoaded) return;
  return (
    <div className={`docs-section ${showDocs ? 'docs-section-open' : ''}`}>
      <div className="docs-section-content">
        {queries && (
          <MainSectionList type={queries} setOpenedTypes={setOpenedTypes} header="queries" />
        )}
        {mutations && (
          <MainSectionList type={mutations} setOpenedTypes={setOpenedTypes} header="mutations" />
        )}
        {subscriptions && (
          <MainSectionList
            type={subscriptions}
            setOpenedTypes={setOpenedTypes}
            header="subscriptions"
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
          />
        ))}
    </div>
  );
}

export default Documentation;
