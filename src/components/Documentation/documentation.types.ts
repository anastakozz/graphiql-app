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
  kind: string;
  ofType?: {
    name: string;
    kind: string;
    ofType?: IOfType;
  };
}

export interface ITypeObject {
  name: string;
  kind: string;
  type?: IOfType;
  description: string;
  args: Array<ITypeObject>;
}

export type IFields = Array<ITypeObject>;

export interface IQuerySection {
  fields: IFields | undefined;
  setOpenedTypes: React.Dispatch<React.SetStateAction<Array<ITypeObject>>>;
}

export interface IDocsSection {
  targetTypeObject: IFieldsArray | undefined;
  openedType: ITypeObject;
  setOpenedTypes: React.Dispatch<React.SetStateAction<Array<ITypeObject>>>;
  mainIndex: number;
}

export interface IFieldsArray {
  name: string;
  description?: string;
  fields: IFields;
}

export interface IScalarSection {
  openedType: ITypeObject;
  typeObject: IFieldsArray | undefined;
  data: IDocsData | null;
}
