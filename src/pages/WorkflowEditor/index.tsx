import type { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Custom components
import WorkflowEditorCanvas from "../../components/workflowEditor/WorkflowEditorCanvas/index.tsx";
import ActiveElementPanel from "../../components/editorView/ActiveElementPanel";
import ElementSelectorPanel from "../../components/elementSelectorPanel/ElementSelectorPanel";
import NavBar from "../../components/NavBar/NavBar";
import ResizableContainer from "../../components/resizable/ResizableContainer/ResizableContainer.tsx";

import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

const WorkflowEditor = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);

  /**
   * Just gonna hardcode all these values for now. Surely there's a more generic way to do this
   * though that doesn't rely on our exact layout.
   */
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
          <ActiveElementPanel activeElement={activeElement} /> 
        </ResizableContainer>
      </div>
    </div>
  );
};

export default WorkflowEditor;