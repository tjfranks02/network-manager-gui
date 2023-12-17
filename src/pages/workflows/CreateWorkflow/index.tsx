import TextInput from "../../../components/inputs/TextInput";
import { useState } from "react";
import type { FormEvent } from "react";

import css from "./styles.module.css";
import Button from "../../../components/buttons/Button";

const CreateWorkflow = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onFormSubmit = (event: FormEvent | MouseEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className={css.container}>
      <h1>Create Workflow</h1>
      <form 
        className={css.form}
        onSubmit={onFormSubmit}
      >
        <TextInput 
          title="Name" 
          text={name} 
          onTextChange={setName}
        />
        <TextInput 
          title="Description" 
          text={description} 
          onTextChange={setDescription}
        />
        <Button onClick={onFormSubmit}>Create</Button>
      </form>
    </div>
  );
};

export default CreateWorkflow;