import axios from "./axiosInstance";

import type { Workflow } from "../types";

/**
 * Response types
 */
type SaveWorkflowStepResponse = {
  msg: string
};

export type CreateWorkflowResponse = {
  id: string
};

export const createWorkflow = async (workflow: Workflow) => {
  let url: string = import.meta.env.VITE_NM_API_URL + "/workflows/create";

  let response = await axios.post(url, workflow);
  return response.data as CreateWorkflowResponse;
};

export const saveWorkflowStep = async (commands: string) => {
  let url: string = import.meta.env.VITE_NM_API_URL + "/workflows/saveWorkflowStep";
  return (await axios.post(url, { commands })).data as SaveWorkflowStepResponse;
};

export const getWorkflow = async (workflowId: string) => {
  let url: string = import.meta.env.VITE_NM_API_URL + "/workflows/" + workflowId;
  let response = await axios.get(url);

  return response.data as Workflow;
};