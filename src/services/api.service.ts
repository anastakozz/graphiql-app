// const apiUrl = 'https://rickandmortyapi.com/graphql';

import { getIntrospectionQuery } from 'graphql';

export const makeRequest = async (
  apiUrl: string,
  query: string,
  variables?: string,
  customHeaders?: string
) => {
  try {
    const parsedVariables = variables ? JSON.parse(variables) : {};
    const requestBody = {
      query,
      variables: parsedVariables || {},
    };

    const parsedCustomHeaders = customHeaders ? JSON.parse(customHeaders) : {};

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        ...parsedCustomHeaders,
      },
      body: JSON.stringify(requestBody),
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

export const fetchSchema = async (urlApi: string) => {
  if (!urlApi) return;
  const response = await fetch(urlApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  });

  return await response.json();
};
