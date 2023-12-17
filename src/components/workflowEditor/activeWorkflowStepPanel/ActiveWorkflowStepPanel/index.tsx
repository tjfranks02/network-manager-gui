import css from "./styles.module.css";

import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import WorkflowStepCommandsBox from "../WorkflowStepCommandsBox";

const ActiveWorkflowStepPanel = () => {
  const activeWorkflowStep = useSelector((state: RootState) => state.activeWorkflowStep.stepId);

  // if (!activeWorkflowStep) {
  //   return (
  //     <p>
  //       There is currently no active workflow step. Click on one and it will show up here!
  //     </p>
  //   )
  // }

  return (
    <div className={css.container}>
      <h3>{activeWorkflowStep}</h3>
      {activeWorkflowStep && <p>{activeWorkflowStep}</p>}
      <WorkflowStepCommandsBox />
    </div>
  );
};

export default ActiveWorkflowStepPanel;