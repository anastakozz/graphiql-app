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
      console.log('response received by state');
    },
  },
});

export const { updateEditorResponse } = editorSlice.actions;

export default editorSlice.reducer;
