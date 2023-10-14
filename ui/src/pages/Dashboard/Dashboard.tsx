import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Canvas from "../../components/EditorView/Canvas/Canvas";
import ActiveElementPanel from "../../components/EditorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/EditorView/ElementSelectorPanel/ElementSelectorPanel";

import css from "./styles.module.css";
import Header from "../../components/Header/Header";

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);

  return (
    <div className={css.container}>
      <Header />
      <div className={css.editorContainer}>
        <ElementSelectorPanel />
        <Canvas />
        <ActiveElementPanel activeElement={activeElement} />
      </div>
    </div>
  );
};

export default Dashboard;