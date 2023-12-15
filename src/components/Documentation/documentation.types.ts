import React from 'react';

export interface IDocumentation {
  showDocs: boolean;
}

export interface IDocsData {
  button: string;
  queries: string;
  typeDetails: string;
  arguments: string;
}

export interface IApiSchema {
  data?: {
    __schema: {
      types: Array<{
        name: string;
        fields: IFields;
      }>;
    };
  };
}

export interface IOfType {
  name: string;
  ofType?: {
    name: string;
    ofType?: IOfType;
  };
}

export interface ITypeObject {
  name: string;
  type?: {
    name: string;
    ofType: {
      name: string;
    };
  };
  description: string;
  args: Array<{
    name: string;
    type: IOfType;
  }>;
}

export type IFields = Array<ITypeObject>;

export interface IQuerySection {
  fields: IFields | undefined;
  setOpenedTypes: React.Dispatch<React.SetStateAction<Array<ITypeObject>>>;
}

export interface IDocsSection {
  fields: IFields | undefined;
  typeObject: ITypeObject;
  setOpenedTypes: React.Dispatch<React.SetStateAction<Array<ITypeObject>>>;
  mainIndex: number;
}

export interface IFieldsArray {
  name: string;
  description?: string;
  fields: IFields;
}
