export const mockData = {
  arguments: 'Arguments',
  button: 'Button name',
  typeDetails: 'details',
};

export const mockType = {
  name: 'Type1',
  description: '',
  ofType: {
    name: 'String',
    description: 'Some description',
  },
};

export const openedTypeMock = {
  name: 'type',
  description: 'description',
  deprecationReason: 'reason',
  type: mockType,
  args: [
    {
      name: 'name',
      type: {
        name: 'name',
        description: 'description',
      },
      description: 'description',
      args: null,
    },
  ],
};

export const mockFields = {
  _fields: openedTypeMock,
  name: '',
  description: '',
};
