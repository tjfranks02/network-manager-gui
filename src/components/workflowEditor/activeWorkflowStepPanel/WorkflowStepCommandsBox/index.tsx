import { useState } from "react";
import type { ChangeEvent } from "react";

import Button from "../../../buttons/Button";

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
    <div className={css.container}>
      <textarea
        className={css.textArea}
        value={commandsText}
        onChange={updateCommandsEditor}
        rows={4}
        cols={50}
      />
      <Button onClick={handleSaveClick}>Save</Button>
    </div>
  );
};

export default WorkflowStepCommandsEditor;