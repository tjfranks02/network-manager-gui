import { useState } from "react";
import type { ChangeEvent } from "react";
import css from "./styles.module.css";

const WorkflowStepCommandsEditor = () => {
  const [commandsText, setCommandsText] = useState("");

  const updateCommandsEditor = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setCommandsText(event.target.value);
  };

  const handleSaveClick = () => {
    
  };

  return (
    <div>
      <textarea
        className={css.container}
        value={commandsText}
        onChange={updateCommandsEditor}
        rows={4}
        cols={50}
      />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default WorkflowStepCommandsEditor;