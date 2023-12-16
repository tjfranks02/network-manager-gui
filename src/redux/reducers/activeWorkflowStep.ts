import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActiveWorkflowStepState {
  stepId: string | null
};

const initialState: ActiveWorkflowStepState = {
  stepId: null
};

export const activeWorkflowStepSlice = createSlice({
  name: 'activeWorkflowStep',
  initialState,
  reducers: {
    setActiveWorkflowStep: (state, action: PayloadAction<string | null>) => {
      state.stepId = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setActiveWorkflowStep } = activeWorkflowStepSlice.actions

export default activeWorkflowStepSlice.reducer;