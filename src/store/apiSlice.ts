import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISchema } from "../components/Documentation/documentation.types.ts";

interface apiProps {
  apiUrl: string;
  apiSchema: ISchema | null;
  apiError: string | null;
}

const initialState: apiProps = {
  apiUrl: '',
  apiSchema: null,
  apiError: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    updateApiUrl(state, action: PayloadAction<string>) {
      state.apiUrl = action.payload;
    },
    updateApiSchema(state, action: PayloadAction<ISchema>) {
      state.apiSchema = action.payload;
    },
    updateApiError(state, action: PayloadAction<string | null | undefined>) {
      if (action.payload !== undefined) {
        state.apiError = action.payload;
      } else {
        state.apiError = 'Localization Error';
      }
    },
  },
});

export const { updateApiUrl, updateApiSchema, updateApiError } = apiSlice.actions;

export default apiSlice.reducer;
