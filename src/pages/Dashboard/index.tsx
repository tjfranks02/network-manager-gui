import type { RootState } from "../../redux/store.ts";
import { useState, useEffect } from "react";
import type { DragEvent } from "react";
import { useSelector } from "react-redux";

// Custom components
import Canvas from "../../components/editorView/Canvas/Canvas.tsx";
import ActiveElementPanel from "../../components/editorView/ActiveElementPanel/index.tsx";
import ElementSelectorPanel from "../../components/elementSelectorPanel/ElementSelectorPanel/index.tsx";
import EditorToolbar from "../../components/editorView/editorToolbar/EditorToolbar/index.tsx";
import NavBar from "../../components/NavBar/NavBar.tsx";
import ResizableContainer from "../../components/resizable/ResizableContainer/ResizableContainer.tsx";

import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants.ts";

const Dashboard = () => {
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
            <div style={{ overflow: "hidden"}}>
              <EditorToolbar />
              <Canvas />
            </div>
            <div
              style={{ backgroundColor: "white", width: "100%", userSelect: "none" }}
              onDragStart={(e: DragEvent) => e.preventDefault()}
              draggable={false}
            >
              This is a div! That's pretty much it.
            </div>
          </ResizableContainer> 
          <ActiveElementPanel activeElement={activeElement} /> 
        </ResizableContainer>
      </div>
    </div>
  );
};

export default Dashboard;