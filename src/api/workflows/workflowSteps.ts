import axios from "../axiosInstance";

/**
 * Response types
 */
type SaveWorkflowStepResponse = {
  msg: string
};

export const saveWorkflowStep = async (commands: string) => {
  let url: string = import.meta.env.VITE_NM_API_URL + "/workflows/saveWorkflowStep";
  return (await axios.post(url, { commands })).data as SaveWorkflowStepResponse;
};