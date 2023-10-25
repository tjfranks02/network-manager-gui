import type { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Canvas from "../../components/editorView/Canvas/Canvas.tsx";
import ActiveElementPanel from "../../components/editorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/editorView/ElementSelectorPanel/ElementSelectorPanel";
import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

import NavBar from "../../components/NavBar/NavBar";
import ResizableBox from "../../components/utils/resizable/ResizableBox/ResizableBox.tsx";
import ResizableContainer from 
  "../../components/utils/resizable/ResizableContainer/ResizableContainer.tsx";

import css from "./styles.module.css";

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
      <div style={{ width: window.innerWidth, height: containerHeight, backgroundColor: "lightblue" }}>
        <ResizableContainer direction="column">
          <ResizableBox>
            <ElementSelectorPanel />
          </ResizableBox>
          {/* <ResizableBox>
            <ResizableContainer direction="row"> */}
              <ResizableBox>
                <Canvas />
              </ResizableBox>
            {/* </ResizableContainer>
          </ResizableBox> */}
          <ResizableBox>
            <ActiveElementPanel activeElement={activeElement} />
          </ResizableBox>     
        </ResizableContainer>
      </div>
    </div>
  );
};

export default Dashboard;