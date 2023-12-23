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
    updateApiError(state, action: PayloadAction<string | null | undefined>) {
      if (action.payload !== undefined) {
        state.apiError = action.payload;
      } else {
        state.apiError = 'Localization Error';
      }
    },
  },
});

export const { updateApiUrl, updateApiError } = apiSlice.actions;

export default apiSlice.reducer;
