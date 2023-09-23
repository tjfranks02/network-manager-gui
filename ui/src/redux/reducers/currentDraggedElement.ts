import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrentDraggedElementState {
  element: string | null
};

const initialState: CurrentDraggedElementState = {
  element: null
};

export const currentDraggedElement = createSlice({
  name: 'currentDraggedElement',
  initialState,
  reducers: {
    setCurrentDraggedElement: (state, action: PayloadAction<string | null>) => {
      state.element = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentDraggedElement } = currentDraggedElement.actions

export default currentDraggedElement.reducer