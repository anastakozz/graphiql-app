import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface editorProps {
  jsonResponse: string;
}

const initialState: editorProps = {
  jsonResponse: '',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateEditorResponse(state, action: PayloadAction<string>) {
      state.jsonResponse = action.payload;
    },
  },
});

export const { updateEditorResponse } = editorSlice.actions;

export default editorSlice.reducer;
