import type { RootState } from '../redux/store';
import { useSelector } from "react-redux";

import Canvas from '../components/Canvas';

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.element);
  
  return (
    <div>
      <Canvas />
      {activeElement ? activeElement.id : null}
    </div>
  );
};

export default Dashboard;