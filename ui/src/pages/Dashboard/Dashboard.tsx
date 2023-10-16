import type { RootState } from "../../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "../../components/editorView/Canvas/Canvas.tsx";
import ActiveElementPanel from "../../components/editorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/editorView/ElementSelectorPanel/ElementSelectorPanel";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../../constants/editorConstants";

import css from "./styles.module.css";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);

  return (
    <div className={css.container}>
      <Header />
      <div className={css.editorContainer}>
        <ElementSelectorPanel />
        <Canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} />
        <ActiveElementPanel activeElement={activeElement} />
      </div>
    </div>
  );
};

export default Dashboard;