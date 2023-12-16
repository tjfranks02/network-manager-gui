import css from "./styles.module.css";

import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const ActiveWorkflowStep = () => {
  const activeWorkflowStep = useSelector((state: RootState) => state.activeWorkflowStep.stepId);

  

  return (
    <div className={css.container}>
      <h3>Active Workflow Step</h3>
      {!activeWorkflowStep && <p>
        There is currently no active workflow step. Click on one and it will show up here!
      </p>}
      {activeWorkflowStep && <p>{activeWorkflowStep}</p>}
    </div>
  );
};

export default ActiveWorkflowStep;