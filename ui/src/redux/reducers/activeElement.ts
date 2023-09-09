import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Element from '../../editor/elements/Element';

export interface ActiveElementState {
  element: Element | null
};

const initialState: ActiveElementState = {
  element: null
};

export const activeElementSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setActiveElement: (state, action: PayloadAction<Element | null>) => {
      state.element = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setActiveElement } = activeElementSlice.actions

export default activeElementSlice.reducer