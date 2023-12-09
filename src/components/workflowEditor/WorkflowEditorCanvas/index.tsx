import { 
  useRef, 
  MouseEvent, 
  WheelEvent, 
  DragEvent, 
  useEffect
} from "react";
import Point from "../../../editor/utils/Point";
import Workflow from "../editor/workflowElements/Workflow.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useResizableDimensions from "../../hooks/useResizableDimensions";

import css from "./styles.module.css";

// const setNewMousePos = (newMousePos: Point): void => {
//   EditorView.viewState.oldMousePos = EditorView.viewState.mousePos;
//   EditorView.viewState.mousePos = newMousePos;
// };

/**
 * The network editor canvas. This is where the user can draw and interact with the network.
 */
const WorkflowEditorCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currDraggedElem = useSelector((state: RootState) => state.currentDraggedElement.element);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, wrapperHeight] = useResizableDimensions(wrapperRef);

  useEffect(() => {
  }, [wrapperWidth, wrapperHeight]);

  const getContext = (): CanvasRenderingContext2D => {
    return canvasRef.current!.getContext("2d")!;
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>): void => {
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>): void => {
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>): void => {
  };

  const onDraggedElementDrop = (_: DragEvent<HTMLCanvasElement>) => {
  };

  const clearCanvas = (): void => {
    let ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.beginPath();
  };

  const handleDragOver = (event: DragEvent<HTMLCanvasElement>) => {
  };

  const handleMouseWheelMove = (event: WheelEvent<HTMLCanvasElement>): void => {
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