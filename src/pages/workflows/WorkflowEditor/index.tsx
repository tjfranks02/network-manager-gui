import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Custom components
import WorkflowEditorCanvas from "../../../components/workflowEditor/WorkflowEditorCanvas/index.tsx";
import ActiveWorkflowStepPanel from "../../../components/workflowEditor/activeWorkflowStepPanel/ActiveWorkflowStepPanel/index.tsx";
import ElementSelectorPanel from "../../../components/elementSelectorPanel/ElementSelectorPanel/index.tsx";
import ResizableContainer from "../../../components/resizable/ResizableContainer/ResizableContainer.tsx";

import { DEFAULT_NAVBAR_HEIGHT } from "../../../constants/dashboardConstants.ts";

// API code
import { getWorkflow } from "../../../api/workflows.ts";

const WorkflowEditor = () => {
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const params: any = useParams();

  const fetchWorkflow = async (workflowId: string) => {
    try {
      let response = await getWorkflow(workflowId);
      console.log(response);
    } catch (e) {
      // Should redirect to internal server error screen
    }
  };

  useEffect(() => {
    setDefaultDimensions();
    fetchWorkflow(params.workflowId);
  }, []);

  const setDefaultDimensions = () => {
    const viewportHeight: number = window.innerHeight;
    const navbarHeight: number = DEFAULT_NAVBAR_HEIGHT;

    setContainerHeight(viewportHeight - navbarHeight);
  };

  return (
    <div 
      style={{ 
        width: window.innerWidth, 
        height: containerHeight, 
        backgroundColor: "white",
      }}
    >
      <ResizableContainer direction="column">
        <ElementSelectorPanel />
        <ResizableContainer direction="row">
          <WorkflowEditorCanvas />
        </ResizableContainer>
        <ActiveWorkflowStepPanel />
      </ResizableContainer>
    </div>
  );
};

export default WorkflowEditor;