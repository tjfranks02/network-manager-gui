import TextInput from "../../../components/inputs/TextInput";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import css from "./styles.module.css";
import Button from "../../../components/buttons/Button";

// API code
import { CreateWorkflowResponse, createWorkflow } from "../../../api/workflows";

const ERROR_MESSAGES: any = {
  401: "Unauthorized",
  409: "A workflow with that name already exists",
  422: "Workflow missing required fields",
  500: "An internal server error occured",
  0: "An unknown error occured"
};

const CreateWorkflow = () => {
  const [name, setName] = useState<string>("");
  const [workflowCreateError, setWorkflowCreateError] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  const handleWorkflowCreateError = (e: any) => {
    let status: number = e.response ? e.response.status : null;
    setWorkflowCreateError(ERROR_MESSAGES[status]);
  };

  const onFormSubmit = async (event: FormEvent | MouseEvent) => {
    event.preventDefault();
    
    try {
      let { id }: CreateWorkflowResponse = await createWorkflow({ name, description });
      navigate("/workflow/" + id);
    } catch (e) {
      handleWorkflowCreateError(e);
    }
  };

  return (
    <div className={css.container}>
      <h1>Create Workflow</h1>
      <span className={css.errorMsg}>{workflowCreateError}</span>
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