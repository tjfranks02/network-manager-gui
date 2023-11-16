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

export default ActiveElementPanel;