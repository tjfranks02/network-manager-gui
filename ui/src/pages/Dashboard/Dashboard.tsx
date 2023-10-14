import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Canvas from "../../components/EditorView/Canvas/Canvas";
import ActiveElementPanel from "../../components/EditorView/ActiveElementPanel/ActiveElementPanel";
import ElementSelectorPanel from "../../components/EditorView/ElementSelectorPanel/ElementSelectorPanel";

import css from './styles.module.css';

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);

  return (
    <div className={css.container}>
      <ElementSelectorPanel />
      <Canvas />
      <ActiveElementPanel activeElement={activeElement} />
    </div>
  );
};

export default Dashboard;