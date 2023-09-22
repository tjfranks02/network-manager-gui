import type { RootState } from '../../redux/store';
import { useSelector } from "react-redux";

import Canvas from '../../components/editorView/Canvas/Canvas';
import ActiveElementPanel from '../../components/editorView/ActiveElementPanel/ActiveElementPanel';

import css from './styles.module.css';

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);
  
  return (
    <div>
      <Canvas />
      <ActiveElementPanel />
      {activeElement ? activeElement.id : null}
    </div>
  );
};

export default Dashboard;