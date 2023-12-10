import css from "./styles.module.css";

const ActiveWorkflowStep = () => {
  return (
    <div className={css.container}>
      <h3>Active Workflow Step</h3>
      <p>This is the active workflow step in the currently displayed workflow</p>
    </div>
  );
};

export default ActiveWorkflowStep;