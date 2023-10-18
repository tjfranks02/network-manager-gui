import type { RootState } from "../../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "../../components/EditorView/Canvas/Canvas.tsx";
import ActiveElementPanel from "../../components/EditorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/EditorView/ElementSelectorPanel/ElementSelectorPanel";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../../constants/editorConstants";

import css from "./styles.module.css";
import Header from "../../components/Header/Header";
import ResizableBox from "../../components/utils/ResizableBox/ResizableBox.tsx";

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);

  const onResize = () => {
    console.log("YEEHAW")
  };

  return (
    <div className={css.container}>
      <Header />
      <div className={css.editorContainer}>
        <ElementSelectorPanel />
        <ResizableBox>
          <Canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} />
        </ResizableBox>
        <ActiveElementPanel activeElement={activeElement} />
      </div>
    </div>
  );
};

export default Dashboard;