import css from "./styles.module.css";

import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import WorkflowStepCommandsBox from "../WorkflowStepCommandsBox";

const ActiveWorkflowStepPanel = () => {
  const activeWorkflowStep = useSelector((state: RootState) => state.activeWorkflowStep.stepId);

  return (
    <div className={css.container}>
      <h3>{activeWorkflowStep}</h3>
      {activeWorkflowStep && <p>{activeWorkflowStep}</p>}
      <WorkflowStepCommandsBox />
    </div>
  );
};

export default ActiveWorkflowStepPanel;