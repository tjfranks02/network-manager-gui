import { useState, useEffect } from "react";

// Custom components
import WorkflowEditorCanvas from "../../components/workflowEditor/WorkflowEditorCanvas/index.tsx";
import ActiveWorkflowStepPanel from "../../components/workflowEditor/activeWorkflowStepPanel/ActiveWorkflowStepPanel/index.tsx";
import ElementSelectorPanel from "../../components/elementSelectorPanel/ElementSelectorPanel";
import NavBar from "../../components/NavBar/NavBar";
import ResizableContainer from "../../components/resizable/ResizableContainer/ResizableContainer.tsx";

import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

const WorkflowEditor = () => {
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    setDefaultDimensions();
  }, []);

  const setDefaultDimensions = () => {
    const viewportHeight: number = window.innerHeight;
    const navbarHeight: number = DEFAULT_NAVBAR_HEIGHT;

    setContainerHeight(viewportHeight - navbarHeight);
  };

  return (
    <div>
      <NavBar width={window.innerWidth} height={DEFAULT_NAVBAR_HEIGHT} />
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
    </div>
  );
};

export default WorkflowEditor;