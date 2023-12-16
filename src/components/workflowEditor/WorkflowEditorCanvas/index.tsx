import { 
  useRef,
  useState,
  MouseEvent, 
  WheelEvent, 
  DragEvent, 
  useEffect
} from "react";
import { mapClientCoordsToMouse } from "../../../utils/canvasUtils.ts";
import Point from "../../../editor/utils/Point";
import Workflow from "../editor/workflowElements/Workflow.ts";
import useResizableDimensions from "../../hooks/useResizableDimensions";

import store from "../../../redux/store";
import { setActiveWorkflowStep } from "../../../redux/reducers/activeWorkflowStep";

import css from "./styles.module.css";
import Action from "../editor/workflowElements/Action.ts";

// const setNewMousePos = (newMousePos: Point): void => {
//   EditorView.viewState.oldMousePos = EditorView.viewState.mousePos;
//   EditorView.viewState.mousePos = newMousePos;
// };

const step1 = new Action("Step 1", "Descriptioon", new Point(100, 150), 50, 50);

const sampleWorkflow = new Workflow("Sample Workflow", "Description");
sampleWorkflow.addStep(step1);

/**
 * The network editor canvas. This is where the user can draw and interact with the network.
 */
const WorkflowEditorCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, wrapperHeight] = useResizableDimensions(wrapperRef);
  const [mousePos, setMousePos] = useState<Point>(new Point(0, 0));

  useEffect(() => {
    clearCanvas();
    sampleWorkflow.draw(getContext());
  }, [wrapperWidth, wrapperHeight]);

  const getContext = (): CanvasRenderingContext2D => {
    return canvasRef.current!.getContext("2d")!;
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>): void => {
    let mousePos = mapClientCoordsToMouse(event);
    setMousePos(mousePos);
  };

  const handleMouseDown = (_: MouseEvent<HTMLCanvasElement>): void => {
    let elemUnderMouse = sampleWorkflow.elementUnderMouse(mousePos);

    store.dispatch(setActiveWorkflowStep(elemUnderMouse ? elemUnderMouse.name : null));

    console.log(elemUnderMouse);
  };

  const handleMouseUp = (_: MouseEvent<HTMLCanvasElement>): void => {
  };

  const onDraggedElementDrop = (_: DragEvent<HTMLCanvasElement>) => {
  };

  const clearCanvas = (): void => {
    let ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.beginPath();
  };

  const handleDragOver = (_: DragEvent<HTMLCanvasElement>) => {
  };

  const handleMouseWheelMove = (_: WheelEvent<HTMLCanvasElement>): void => {
  };

  return (
    <div 
      style={{ 
        width: "100%", 
        height: "100%",
        padding: 1,
        backgroundColor: "white",
        overflow: "hidden"
      }} 
      ref={wrapperRef}
    >
      <canvas
        className={css.canvas}
        ref={canvasRef} 
        width={wrapperWidth}
        height={wrapperHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onDragStart={() => false}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => onDraggedElementDrop(e)}
        onWheel={(e) => handleMouseWheelMove(e)}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

export default WorkflowEditorCanvas;