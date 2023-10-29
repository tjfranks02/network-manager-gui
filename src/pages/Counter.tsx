import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux/reducers/counter";
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from "../constants/editorConstants";

import Canvas from "../components/EditorView/Canvas/Canvas";

const Dashboard = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} />
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