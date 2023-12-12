import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface apiProps {
  apiUrl: string;
  apiSchema: object;
  apiError: string | null;
}

const initialState: apiProps = {
  apiUrl: '',
  apiSchema: {},
  apiError: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    updateApiUrl(state, action: PayloadAction<string>) {
      state.apiUrl = action.payload;
    },
    updateApiSchema(state, action: PayloadAction<object>) {
      state.apiSchema = action.payload;
    },
    updateApiError(state, action: PayloadAction<string | null>) {
      state.apiError = action.payload;
    },
  },
});

export const { updateApiUrl, updateApiSchema, updateApiError } = apiSlice.actions;

export default apiSlice.reducer;
