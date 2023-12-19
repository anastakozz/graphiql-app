import React from 'react';

export interface IDocumentation {
  showDocs: boolean;
  isSchemaLoaded: boolean;
  setIsSchemaLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDocsData {
  button: string;
  queries?: string;
  mutations?: string;
  subscriptions?: string;
  typeDetails: string;
  arguments: string;
}

export interface IOfType {
  name: string;
  description: string;
  _fields?: IOfType;
  _values?: IOfType[];
  ofType?: {
    name: string;
    description: string;
    ofType?: IOfType;
  };
}

export interface ITypeObject {
  name: string;
  type?: IOfType;
  description: string;
  args: Array<ITypeObject>;
}

export interface IObjectProps {
  openedType: ITypeObject;
  setOpenedTypes: React.Dispatch<React.SetStateAction<ITypeObject[]>>;
  mainIndex: number;
}

export interface IDocsSection {
  openedType: ITypeObject;
  setOpenedTypes: React.Dispatch<React.SetStateAction<Array<ITypeObject>>>;
  mainIndex: number;
}

export interface IScalarSection {
  openedType: ITypeObject;
}

export interface IGraphQL {
  name?: string;
  description?: string;
  _fields?: IOfType;
  ofType?: {
    name: string;
    description: string;
    ofType?: IOfType;
  };
}

export interface IMainSection {
  type: IGraphQL;
  setOpenedTypes: React.Dispatch<React.SetStateAction<Array<ITypeObject>>>;
  header: 'queries' | 'mutations' | 'subscriptions';
}

export interface IArgsProps {
  openedType: ITypeObject;
  setOpenedTypes: React.Dispatch<React.SetStateAction<ITypeObject[]>>;
  mainIndex: number;
  data: IDocsData | null;
}

export interface ITypeDetailsProps {
  openedType: ITypeObject;
  setOpenedTypes: React.Dispatch<React.SetStateAction<ITypeObject[]>>;
  mainIndex: number;
  data: IDocsData | null;
  fields: IOfType | string;
}
