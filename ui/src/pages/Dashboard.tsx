import type { RootState } from '../redux/store';
import { useSelector, useDispatch } from "react-redux";

import Canvas from '../components/Canvas';

const Dashboard = () => {
  const activeElement = useSelector((state: RootState) => state.activeElement.activeElement);
  
  return (
    <div>
      <Canvas />
      {activeElement}
    </div>
  );
};

export default Dashboard;