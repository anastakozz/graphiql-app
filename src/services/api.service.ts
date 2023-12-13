// const apiUrl = 'https://rickandmortyapi.com/graphql';

export const makeRequest = async (apiUrl: string, query: string) => {
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const introspectApi = async (apiUrl: string) => {
  const introspectionQuery = `query IntrospectionQuery {
      __schema {
        types {
          name
        }
        queryType {
          name
        }
        mutationType {
          name
        }
        subscriptionType {
          name
        }
        directives {
          name
        }
      }
    }`;

  try {
    const res = await makeRequest(apiUrl, introspectionQuery);
    return res;
  } catch (error) {
    return error;
  }
};
