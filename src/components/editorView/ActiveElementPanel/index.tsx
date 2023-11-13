import EditableTextField from "../../inputs/EditableTextField";
import css from "./styles.module.css";

const ActiveElementPanel = ({ activeElement }: { activeElement: string }) => {
  return (
    <div className={css.container}>
      <h3>{activeElement ? activeElement.substring(0, 5) : null}</h3>
      {activeElement ? <p>This is the active element</p> : <p>No active element</p>}
      <EditableTextField>Editable text field</EditableTextField>
    </div>
  );
};

/**
 * What needs to happen when we drag a new element into the editor?
 * 1. We need to detect which type of element it is
 * 2. We need
 */

export default ActiveElementPanel;