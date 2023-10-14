import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux/reducers/counter";

import Canvas from "../components/EditorView/Canvas/Canvas";

const Dashboard = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Canvas />
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      {count}
    </div>
  );
};

export default Dashboard;