import type { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Canvas from "../../components/EditorView/Canvas/Canvas.tsx";
import ActiveElementPanel from "../../components/EditorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/EditorView/ElementSelectorPanel/ElementSelectorPanel";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../../constants/editorConstants";
import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

import css from "./styles.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ResizableBox from "../../components/utils/resizable/ResizableBox/ResizableBox.tsx";
import { Dimensions } from "../../types.ts";
import ResizableGrid from "../../components/utils/resizable/ResizableGrid/ResizableGrid.tsx";

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
      <ResizableGrid height={containerHeight}>
        <ResizableBox>
          <ElementSelectorPanel />
        </ResizableBox>
        <ResizableBox>
          <Canvas />
        </ResizableBox>
        <ResizableBox>
          <ActiveElementPanel activeElement={activeElement} />
        </ResizableBox>     
      </ResizableGrid>
    </div>
  );
};

export default Dashboard;