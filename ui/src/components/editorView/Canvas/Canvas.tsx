import { useRef, MouseEvent, WheelEvent, DragEvent, useEffect, useState } from "react";
import Point from "../../../editor/utils/Point";
import EditorController from "../../../editor/controller/EditorController";
import EditorView from "../../../editor/view/EditorView";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import css from "./styles.module.css";

const setNewMousePos = (newMousePos: Point): void => {
  EditorView.viewState.oldMousePos = EditorView.viewState.mousePos;
  EditorView.viewState.mousePos = newMousePos;
}

/**
 * Props to pass in to the canvas element
 */
type CanvasProps = {
  width: number,
  height: number
};

/**
 * The network editor canvas. This is where the user can draw and interact with the network.
 */
const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const currDraggedElem = useSelector((state: RootState) => state.currentDraggedElement.element);

  const [canvasDimensions, setCanvasDimensions] = useState<any>({ width: 0, height: 0 });
  
  useEffect(() => {
    EditorController.draw(getContext());
  }, []);

  useEffect(() => {
    let canvas: HTMLCanvasElement | null = canvasRef.current;

    if (canvas) {
      setCanvasDimensions({
        width: canvas.offsetWidth,
        height: canvas.offsetHeight
      });
    }
  }, []);

  const getContext = (): CanvasRenderingContext2D => {
    return canvasRef.current!.getContext("2d")!;
  };

  const mapClientCoordsToMouse = (event: MouseEvent<HTMLCanvasElement>): Point => {
    const bounds = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;
    return new Point(mouseX, mouseY);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>): void => {
    clearCanvas();

    let mousePos = mapClientCoordsToMouse(event);
    setNewMousePos(mousePos);

    EditorController.handleMouseMove(getContext());
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>): void => {
    let mousePos = mapClientCoordsToMouse(event);
    setNewMousePos(mousePos);

    clearCanvas();

    if (event.altKey && event.button === 0 || event.button === 1) { // Middle mouse (alt+left on trackpad)
      EditorController.handleMiddleMouseClick(getContext());
    } else if (event.button === 0) { // Left click
      EditorController.handleLeftClick(getContext());
    } else if (event.button === 2) { // Right click
      EditorController.handleRightClick((getContext()));
    }
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>): void => {
    let mousePos = mapClientCoordsToMouse(event);
    setNewMousePos(mousePos);

    switch (event.button) {
      case 0: // Left mouse up
        EditorController.handleLeftMouseUp(getContext());
        break;
      case 1: // Middle mouse up
        EditorController.handleMiddleMouseUp(getContext());
        break;
      default:
        break;
    }
  };

  const onDraggedElementDrop = (event: DragEvent<HTMLCanvasElement>) => {
    EditorController.createElement(currDraggedElem);
  };

  const clearCanvas = (): void => {
    let ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.beginPath();
  };

  const handleDragOver = (event: DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    let mousePos = mapClientCoordsToMouse(event);
    setNewMousePos(mousePos);
  };

  const handleMouseWheelMove = (event: WheelEvent<HTMLCanvasElement>): void => {
    clearCanvas();
    EditorController.handleMouseWheelScroll(getContext(), event.deltaY);
  };

  return (
    <div style={{ backgroundColor: "brown", height: 100 }} ref={canvasWrapperRef}>
      <canvas 
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%"
        }}
        className={css.canvas}
        ref={canvasRef} 
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => onDraggedElementDrop(e)}
        onWheel={(e) => handleMouseWheelMove(e)}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

export default Canvas;