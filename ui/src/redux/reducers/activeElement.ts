import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActiveElementState {
  element: string | null
};

const initialState: ActiveElementState = {
  element: null
};

export const activeElementSlice = createSlice({
  name: 'activeElement',
  initialState,
  reducers: {
    setActiveElement: (state, action: PayloadAction<string | null>) => {
      state.element = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setActiveElement } = activeElementSlice.actions

export default activeElementSlice.reducer