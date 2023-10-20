import type { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Canvas from "../../components/EditorView/Canvas/Canvas.tsx";
import ActiveElementPanel from "../../components/EditorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/EditorView/ElementSelectorPanel/ElementSelectorPanel";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../../constants/editorConstants";
import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

import css from "./styles.module.css";
import Header from "../../components/Header/Header";
import ResizableFlexBox from "../../components/utils/resizable/ResizableFlexBox/ResizableFlexBox.tsx";
import { Dimensions } from "../../types.ts";
import ResizableFlexItem from "../../components/utils/resizable/ResizableFlexItem/ResizableFlexItem.tsx";

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
    <div style={{
      display: "grid",
      outline: "1px solid blue"
    }}>
      {/* <ResizableFlexBox>
        <ResizableFlexItem flexGrow={1}>
          <div style={{ backgroundColor: "pink" }}>HELLO</div>
          <ElementSelectorPanel />
        </ResizableFlexItem>
        <ResizableFlexItem flexGrow={1}>
          <div style={{ backgroundColor: "purple" }}>Hello</div>
        </ResizableFlexItem>
        <ResizableFlexItem flexGrow={1}>
          Hello3
        </ResizableFlexItem>
      </ResizableFlexBox> */}
      <div style={{ backgroundColor: "blue"}}>Div 1</div>
      <div style={{ backgroundColor: "pink"}}>Div 2</div>
      <div style={{ backgroundColor: "red"}}>Div 3</div>
      <div style={{ backgroundColor: "lightblue"}}>Div 4</div>
      <div style={{ backgroundColor: "brown"}}>Div 5</div>
      <div style={{ backgroundColor: "yellow"}}>Div 6</div>
    </div>
  );
};

export default Dashboard;