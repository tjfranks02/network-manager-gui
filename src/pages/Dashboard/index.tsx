import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

// Custom components
import Button from "../../components/buttons/Button/index.tsx";

import css from "./styles.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const onWorkflowCreate = (event: MouseEvent) => {
    event.preventDefault();
    navigate("/workflow/create");
  };

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Workflows</h1>
      <Button onClick={onWorkflowCreate}>
        Create
      </Button>
    </div>
  );
};

export default Dashboard;