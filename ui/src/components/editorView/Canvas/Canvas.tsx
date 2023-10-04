import { useRef, MouseEvent, WheelEvent, DragEvent, useEffect } from 'react';
import Point from "../../../editor/utils/Point";
import EditorController from "../../../editor/controller/EditorController";
import EditorView from "../../../editor/view/EditorView";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '../../../editor/editorConstants';

import css from "./styles.module.css";

const setNewMousePos = (newMousePos: Point): void => {
  EditorView.viewState.oldMousePos = EditorView.viewState.mousePos;
  EditorView.viewState.mousePos = newMousePos;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currDraggedElem = useSelector((state: RootState) => state.currentDraggedElement.element);

  useEffect(() => {
    EditorController.draw(getContext());
  }, []);

  const getContext = (): CanvasRenderingContext2D => {
    return canvasRef.current!.getContext('2d')!;
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
    EditorController.handleMouseDown(getContext());
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>): void => {
    let mousePos = mapClientCoordsToMouse(event);
    setNewMousePos(mousePos);

    EditorController.handleMouseUp(getContext());
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
    EditorController.handleMouseWheelScroll(event.deltaY);
  };
  
  return (
    <canvas 
      className={css.canvas}
      ref={canvasRef} 
      width={DEFAULT_CANVAS_WIDTH}
      height={DEFAULT_CANVAS_HEIGHT}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => onDraggedElementDrop(e)}
      onWheel={(e) => handleMouseWheelMove(e)}
    />
  );
}

export default Canvas;