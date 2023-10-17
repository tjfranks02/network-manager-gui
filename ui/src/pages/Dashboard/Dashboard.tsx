import type { RootState } from "../../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "../../components/editorView/Canvas/Canvas.tsx";
import ActiveElementPanel from "../../components/editorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/editorView/ElementSelectorPanel/ElementSelectorPanel";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../../constants/editorConstants";

import css from "./styles.module.css";
import Header from "../../components/Header/Header";
import ResizableBox from "../../components/utils/ResizableBox/ResizableBox.tsx";

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);

  return (
    <div className={css.container}>
      <Header />
      <div className={css.editorContainer}>
        <ElementSelectorPanel />
        <div className={css.middleColumn}>
          <ResizableBox>
            <Canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} />
          </ResizableBox>
          <div>
            Bottom box! not sure what this will do yet but i feel like it should be here
          </div>
        </div>
        <ActiveElementPanel activeElement={activeElement} />
      </div>
    </div>
  );
};

export default Dashboard;