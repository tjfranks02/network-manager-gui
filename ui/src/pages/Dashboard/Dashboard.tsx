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

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);

  /**
   * Just gonna hardcode all these values for now. Surely there's a more generic way to do this
   * though that doesn't rely on our exact layout.
   */
  const [elementSelectorPanelDimensions, setElementSelectorPanelDimensions] = useState<Dimensions>({
      width: 200,
      height: 800
    }
  );
  const [canvasDimensions, setCanvasDimensions] = useState<Dimensions>({
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT
  });
  const [activeElementPanelDimensions, setActiveElementPanelDimensions] = useState<Dimensions>({
      width: 200,
      height: 800
  });

  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    setDefaultDimensions();
  }, []);

  const setDefaultDimensions = () => {
    const viewportHeight: number = window.innerHeight;
    const viewportWidth: number = window.innerWidth;
    const navbarHeight: number = DEFAULT_NAVBAR_HEIGHT;

    // Canvas dimensions
    setCanvasDimensions({
      height: viewportHeight - navbarHeight,
      width: viewportWidth * 0.8
    });

    // Element selector panel dimensions
    setElementSelectorPanelDimensions({
      height: viewportHeight - navbarHeight,
      width: viewportWidth * 0.1
    });

    setActiveElementPanelDimensions({
      height: viewportHeight - navbarHeight,
      width: viewportWidth * 0.1
    });

    setContainerHeight(viewportHeight - navbarHeight);
  };

  return (
    <div>
      <NavBar width={window.innerWidth} height={DEFAULT_CANVAS_HEIGHT} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 5fr 1fr",
        gridTemplateRows: containerHeight - 3.75,
        outline: "1px solid blue",
      }}>
        <ResizableBox>
          <ElementSelectorPanel />
        </ResizableBox>
        <ResizableBox>
          <Canvas />
        </ResizableBox>
        <ResizableBox>
          <ActiveElementPanel activeElement={activeElement} />
        </ResizableBox>      
      </div>
    </div>
  );
};

export default Dashboard;